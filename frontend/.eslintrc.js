module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  "settings": {
      "react": {
          "version": "detect"
      }
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "object-curly-spacing": ["warn", "always"],
    "array-bracket-spacing": ["warn", "always"],
    "indent": ["warn", 2],
    "max-len": "off",
    "react/prop-types": "off"
  },
};
