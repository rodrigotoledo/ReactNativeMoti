module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [['module:react-native-dotenv']],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
