module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  "parser": "@babel/eslint-parser",
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "overrides": [
    {
      "rules": {
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "react/display-name": "off",
        "no-undef": "off",
      },
      "files": ["*.js"],
    }]
}
