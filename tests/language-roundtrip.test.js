const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
function fn(name) {
  const rest = source.slice(source.indexOf('function ' + name + '('));
  const end = rest.slice(1).search(/^function |^async function /m);
  return rest.slice(0, end + 1);
}
function context() {
  const c = vm.createContext({ languageSelect: {value:'Korean'} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/i18n/en-supplement.js'), 'utf8'), c);
  vm.runInContext(source.slice(source.indexOf('const koreanText ='), source.indexOf('let applyingLanguage =')), c);
  for (const name of ['currentInterfaceLanguage','translateCopy','originalCopy','localizedValue','translateTextNode','translateAttribute']) vm.runInContext(fn(name),c);
  return c;
}
test('Korean-first text survives repeated language round trips', () => {
  const c=context();
  const node={textContent:'  받은 배지  '};
  for(let i=0;i<3;i++) {
    c.translateTextNode(node);
    assert.equal(node.textContent,'  받은 배지  ');
    c.languageSelect.value='English'; c.translateTextNode(node);
    assert.equal(node.textContent,'  Badges Earned  ');
    c.languageSelect.value='Korean'; c.translateTextNode(node);
    assert.equal(node.textContent,'  받은 배지  ');
  }
});

test('new public copy and Poeun narration translate in both directions', () => {
  const c=context();
  const ko='정몽주는 죽어 백골이 되어도 임을 향한 마음은 변치 않는다는 답가로 응했다고 전해집니다. 당신은 판 위에서 지킬 계획을 떠올립니다.';
  c.languageSelect.value='English';
  assert.match(vm.runInContext(`translateCopy(${JSON.stringify(ko)})`,c), /Jeong Mong-ju/);
  assert.equal(vm.runInContext(`translateCopy('EasyMate 팀원들')`,c),'The EasyMate team');
  c.languageSelect.value='Korean';
  assert.equal(vm.runInContext(`translateCopy('The EasyMate team')`,c),'EasyMate 팀원들');
});

test('every Korean text or accessibility label in the main page has an English entry', () => {
  const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  const body=html.slice(html.indexOf('<body'));
  const text=[...body.matchAll(/>([^<>]*[가-힣][^<>]*)</g)].map(match=>match[1].trim());
  const attributes=[...body.matchAll(/(?:aria-label|placeholder|title)="([^"]*[가-힣][^"]*)"/g)].map(match=>match[1]);
  const c=context();
  c.languageSelect.value='English';
  const missing=[...new Set([...text,...attributes])].filter(value=>value&&!vm.runInContext(`translateCopy(${JSON.stringify(value.replace(/&amp;/g,'&'))})`,c).match(/^[^가-힣]*$/));
  assert.deepEqual(missing,[]);
});
test('dynamic text changes are never replaced by stale translations', () => {
  const c=context(); const node={textContent:'Login'};
  c.translateTextNode(node); assert.equal(node.textContent,'로그인');
  node.textContent='Play'; c.languageSelect.value='English'; c.translateTextNode(node);
  assert.equal(node.textContent,'Play');
  c.languageSelect.value='Korean'; c.translateTextNode(node); assert.equal(node.textContent,'플레이');
});
test('attributes round trip and retain externally changed copy', () => {
  const c=context(); const element={value:'받은 배지',getAttribute(){return this.value},setAttribute(k,v){this.value=v}};
  c.translateAttribute(element,'title');
  c.languageSelect.value='English'; c.translateAttribute(element,'title'); assert.equal(element.value,'Badges Earned');
  c.languageSelect.value='Korean'; c.translateAttribute(element,'title'); assert.equal(element.value,'받은 배지');
  element.value='Login'; c.languageSelect.value='English'; c.translateAttribute(element,'title'); assert.equal(element.value,'Login');
});
