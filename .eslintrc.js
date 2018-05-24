module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "jquery": true
    },
    "extends": ["eslint:recommended", "plugin:vue/recommended"],

    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
