
import markdownlint from 'markdownlint';
import enhancedProperNames from 'markdownlint-rule-enhanced-proper-names/src/enhanced-proper-names.js';
import titleCaseStyle from 'markdownlint-rule-title-case-style';
import { load } from 'js-yaml';

// title-case-style only matches ignored words exactly, so also ignore plurals of acronyms (e.g. "URIs")
const acronymPlural = /^[A-Z]{2,}s,?$/;
const titleCaseStyleWithAcronymPlurals = {
    ...titleCaseStyle,
    function: (params, onError) => {
        const ignore = [...(params.config?.ignore ?? [])];
        const originalIncludes = ignore.includes.bind(ignore);
        ignore.includes = (word) => originalIncludes(word) || acronymPlural.test(word);
        titleCaseStyle.function({ ...params, config: { ...params.config, ignore } }, onError);
    },
};

export default {
    ignores: ['**/node_modules/**'],
    customRules: [
        enhancedProperNames,
        titleCaseStyleWithAcronymPlurals,
    ],
    config: markdownlint.readConfigSync('./.markdownlint.yml', [ load ]),
};
