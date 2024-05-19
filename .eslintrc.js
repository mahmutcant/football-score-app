module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 0,
    'react/self-closing-comp': 'off',
    "skipBlankLines": true,
    "object-shorthand": ["error", "always", { "avoidQuotes": false }]
  },
};
