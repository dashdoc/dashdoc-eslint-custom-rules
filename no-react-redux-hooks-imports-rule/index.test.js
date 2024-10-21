import {RuleTester} from "eslint";

import noReactReduxHooksImportsRule from "./index";

const ruleTester = new RuleTester({
    languageOptions: {ecmaVersion: 2015},
});

ruleTester.run("no-react-redux-hooks-imports-rule", noReactReduxHooksImportsRule, {
    valid: [
        {
            code: "import {useSelector} from 'app/redux/hooks';",
        },
        {
            code: "import {useDispatch, useSelector} from 'app/redux/hooks';",
        },
        {
            code: "import {useSelector, useDispatch} from 'app/redux/hooks';",
        },
    ],
    invalid: [
        {
            code: "import {useSelector} from 'react-redux';",
            output: "import {useSelector} from 'app/redux/hooks';",
            errors: [{messageId: "noReactReduxImport"}],
        },
        {
            code: "import {useDispatch} from 'react-redux';",
            output: "import {useDispatch} from 'app/redux/hooks';",
            errors: [{messageId: "noReactReduxImport"}],
        },
        {
            code: "import {useSelector, useDispatch} from 'react-redux';",
            output: "import {useSelector, useDispatch} from 'app/redux/hooks';",
            errors: [{messageId: "noReactReduxImport"}],
        },
        {
            code: "import {useDispatch, useSelector} from 'react-redux';",
            output: "import {useDispatch, useSelector} from 'app/redux/hooks';",
            errors: [{messageId: "noReactReduxImport"}],
        },
    ],
});

// eslint-disable-next-line no-console
console.log("All 'no-react-redux-hooks-imports-rule' tests passed!");
