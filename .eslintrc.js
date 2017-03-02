module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "indent": [
            0,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "strict": [
            2,
            "never"
        ],
        "no-trailing-spaces": 0,

        "object-shorthand": 0,
        "padded-blocks": 0,
        "no-use-before-define": 0,
        "comma-dangle": 0,
        "arrow-spacing": 0,
        "no-param-reassign": 0,
        "arrow-body-style": 0,
        "eol-last": 0,
        "max-len": 0,
        "quote-props": 0,
        "object-curly-spacing": 0,
        "spaced-comment": 0,
        "consistent-return": 0,
        "func-names": 0,
        "no-case-declarations": 0,
        "radix": 0,
        "no-underscore-dangle": 0
    }
};
