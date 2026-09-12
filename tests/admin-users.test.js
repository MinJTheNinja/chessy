const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {spawn} = require('node:child_process');
const {once} = require('node:events');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const c=vm.createContext({});
for(const name of ['adminSearchText','adminUserSearchText','paginateAdminUsers']) {
 const rest=source.slice(source.indexOf('function '+name+'('));
 const end=rest.slice(1).search(/^function |^async function /m);
 vm.runInContext(rest.slice(0,end+1),c);
}
test('all users are reachable, search includes older users, and pages clamp after filtering',()=>{
 const users=Array.from({length:65},(_,i)=>({id:'u'+i,displayName:'User '+i,email:'person'+i+'@example.test',role:'player',warnings:[]}));
 const visited=[];
 for(let page=1;page<=4;page++)visited.push(...c.paginateAdminUsers(users,'',page).items.map(u=>u.id));
 assert.equal(visited.length,65);assert.equal(new Set(visited).size,65);
 const found=c.paginateAdminUsers(users,'person64@',4);
 assert.equal(found.items[0].id,'u64');assert.equal(found.page,1);
 const empty=c.paginateAdminUsers(users,'missing',4);
 assert.equal(empty.start,0);assert.equal(empty.end,0);assert.equal(empty.pages,1);
 assert.equal(c.paginateAdminUsers(users,'',999).page,4);
});
test('staff API returns every account beyond 30 and denies non-staff', {timeout:60000},async(t)=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'admin-users-test-'));
 const child=spawn(process.execPath,['server.js'],{cwd:path.join(__dirname,'..'),windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,PORT:'0',NODE_ENV:'test',DATABASE_URL:'',STAFF_EMAILS:'admin@example.test',EASYMATE_DATA_DIR:dir,LOCAL_DATA_DIR:dir,UPSTASH_REDIS_REST_URL:'',UPSTASH_REDIS_REST_TOKEN:''}});
 t.after(async()=>{if(child.exitCode===null){const exit=once(child,'exit');child.kill();await exit;}fs.rmSync(dir,{recursive:true,force:true});});
 let output='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>output+=b);
 const start=Date.now();while(!/localhost:(\d+)/.test(output)){if(child.exitCode!==null||Date.now()-start>15000)throw Error(output);await new Promise(r=>setTimeout(r,50));}
 const base='http://127.0.0.1:'+output.match(/localhost:(\d+)/)[1];
 async function signup(email){const r=await fetch(base+'/api/auth/signup',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password:'test-only-password',displayName:email.split('@')[0]}),signal:AbortSignal.timeout(15000)});assert.equal(r.status,200);const data=await r.json();return {id:data.user.id,cookie:r.headers.get('set-cookie').split(';')[0]};}
 const admin=await signup('admin@example.test');const expected=[admin.id];let ordinary;
 for(let i=0;i<64;i++){ordinary=await signup('person'+i+'@example.test');expected.push(ordinary.id);}
 const response=await fetch(base+'/api/admin/overview',{headers:{cookie:admin.cookie}});assert.equal(response.status,200);
 const data=await response.json();assert.equal(data.stats.users,65);assert.equal(data.users.length,65);assert.deepEqual(data.users.map(u=>u.id).sort(),expected.sort());assert.ok(data.users.every(u=>!('passwordHash' in u)));
 assert.equal((await fetch(base+'/api/admin/overview',{headers:{cookie:ordinary.cookie}})).status,403);
});
