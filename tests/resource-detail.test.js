const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
const start = source.indexOf('function openResourceDetail(');
const end = source.indexOf('\nfunction showResourceUpload(', start);

test('a resource with an attached file opens its detail and download link', () => {
  const element = (tag) => ({ tag, children: [], append(...children) { this.children.push(...children); }, replaceChildren(...children) { this.children = children; }, setAttribute() {}, addEventListener() {} });
  const panel = element('section');
  const context = vm.createContext({
    document: { createElement: element },
    resourceDetailPanel: panel,
    currentUser: null,
    currentInterfaceLanguage: () => 'Korean',
    setForumSurface: (surface) => { context.surface = surface; },
  });
  vm.runInContext(source.slice(start, end), context);
  context.openResourceDetail({ title: '체스 첫걸음', author: 'Minjong', date: '10월 9일', type: 'PDF', files: [{ name: '학습지.pdf', url: '/file.pdf' }] });
  assert.equal(context.surface, 'detail');
  const download = panel.children[2].children[0].children[1].children[0].children[2];
  assert.equal(download.href, '/file.pdf');
  assert.equal(download.textContent, '↓ 받기');
});
