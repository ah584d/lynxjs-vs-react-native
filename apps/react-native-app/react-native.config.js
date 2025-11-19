module.exports = {
  dependencies: {
    'expo-modules-core': {
      platforms: {
        android: {
          sourceDir: '../node_modules/expo-modules-core/android',
          packageImportPath: 'import expo.modules.ExpoModulesPackage;',
        },
      },
    },
  },
};
