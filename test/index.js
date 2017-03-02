const fs = require('fs');
const test = require('tape');
const postcss = require('postcss');
const plugin = require('..');

function filename(name) {
    return `test/${name}.css`;
}
function read(name) {
    return fs.readFileSync(name, 'utf8');
}

function compareFixtures(t, name, msg, opts, postcssOpts) {
    postcssOpts = postcssOpts || {};
    postcssOpts.from = filename(`fixtures/${name}`);
    opts = opts || {};
    const actual = postcss().use(plugin(opts)).process(read(postcssOpts.from), postcssOpts).css;
    const expected = read(filename(`fixtures/${name}.expected`));
    fs.writeFile(filename(`fixtures/${name}.actual`), actual);
    t.equal(actual, expected, msg);
}

test('shorthand', (t) => {
    compareFixtures(t, 'shorthand', 'should process shorthanded properties');
    t.end();
});
