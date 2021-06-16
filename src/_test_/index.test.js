const babel = require('babel-core');
const plugin = require('../');

var example = `
const a = 1;
console.log(a);
debugger;
if (DEBUG) {
  console.log(2222)
}
console.log(7);
console.info(8);
`;

it('works', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

it('works', () => {
  const {code} = babel.transform(example, {plugins: [[plugin, { noDebugger: true }]]});
  expect(code).toMatchSnapshot();
});