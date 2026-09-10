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
