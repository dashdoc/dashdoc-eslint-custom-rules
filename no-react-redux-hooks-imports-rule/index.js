// context:
// https://www.notion.so/dashdoc/Enforce-the-use-of-typed-useSelector-useDispatch-hooks-879129b29ff048a58591dc588a2c567b

// Our custom hooks source
const importSource = "app/redux/hooks";
// The encapsulated hooks
const hooks = ["useSelector", "useDispatch"];

export default {
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow importing useSelector and useDispatch from react-redux in favor of our own, typed hooks.",
            recommended: true,
        },
        messages: {
            noReactReduxImport:
                'Import useSelector and useDispatch hooks from "app/redux/hooks" instead of "react-redux".',
        },
        fixable: "code",
        schema: [],
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                if (node.source.value === "react-redux") {
                    const specifiersToFix = node.specifiers.filter(
                        (specifier) =>
                            specifier.imported && hooks.includes(specifier.imported.name)
                    );

                    if (specifiersToFix.length > 0) {
                        context.report({
                            node,
                            messageId: "noReactReduxImport",
                            fix(fixer) {
                                const newImport = `import {${specifiersToFix
                                    .map((s) => s.imported.name)
                                    .join(", ")}} from '${importSource}';`;
                                return fixer.replaceText(node, newImport);
                            },
                        });
                    }
                }
            },
        };
    },
};
