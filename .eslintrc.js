module.exports = {
    "env": {
        "browser": false,
        "node": true,        
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        'comma-dangle': ['error', 'always-multiline'],
    },
};
