import { test } from 'node:test';
import assert from 'node:assert/strict';
import markdownlint from 'markdownlint';
import config from '../.markdownlint-cli2.mjs';

const titleCaseErrors = (heading) => {
    const result = markdownlint.sync({
        strings: { doc: `# Title\n\n## ${heading}\n` },
        config: config.config,
        customRules: config.customRules,
    });
    return result.doc.filter((error) => error.ruleNames.includes('title-case-style'));
};

for (const heading of [
    'Lorem ipsum URIs blah',
    'Using APIs',
    'Writing RFCs',
    'Foo ABCs, bar',
    'Using GitHub',
]) {
    test(`allows "${heading}"`, () => {
        assert.deepEqual(titleCaseErrors(heading), []);
    });
}

for (const heading of [
    'Foo Uris',
    'Foo Bars',
    'Bad Case here',
]) {
    test(`rejects "${heading}"`, () => {
        assert.equal(titleCaseErrors(heading).length, 1);
    });
}
