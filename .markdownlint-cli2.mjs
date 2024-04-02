
import markdownlint from 'markdownlint';
import enhancedProperNames from 'markdownlint-rule-enhanced-proper-names/src/enhanced-proper-names.js';
import titleCaseStyle from 'markdownlint-rule-title-case-style';
import { load } from 'js-yaml';

export default {
    ignores: ['**/node_modules/**'],
    customRules: [
        enhancedProperNames,
        titleCaseStyle,
    ],
    config: markdownlint.readConfigSync('./.markdownlint.yml', [ load ]),
};
