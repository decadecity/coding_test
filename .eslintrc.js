module.exports = {
    "plugins": [
        "react"
    ],
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["warn", "single"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always-multiline"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "warn",
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
    },
    "env": {
        "browser": true,
        "node": true
    }
};
