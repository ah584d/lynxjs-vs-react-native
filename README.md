# lynxjs-vs-react-native

Comparing a new mobile framework with a stable mobile framework - all about js

## Debug Lynxjs

- checkout https://github.com/lynx-family/lynx-devtool

# Utils

## copy apk for debug in android device

adb devices

#Mono-repo:

- add a specific package to a specific project:
  pnpm add expo-modules-core --filter ./apps/react-native-app

#RN:
✅ install on ios simulator: npm run ios
✅ clean android build:
    - cd android
    - ./gradlew clean --info
✅ install apk on device:
adb -s R7ARC1EZJBP install ./android/app/build/outputs/apk/debug/app-debug.apk
adb -s R7ARC1EZJBP install ./android/app/build/outputs/apk/release/app-release.apk
signed: adb -s R7ARC1EZJBP install ./android/app/release/app-release.apk

#Lynx:
pnpm run build:android
adb -s R7ARC1EZJBP install ./android/app/build/outputs/apk/release/app-release-unsigned.apk
android build signed apk password key0/123456
adb -s R7ARC1EZJBP install ./android/app/debug/app-debug.apk
adb -s R7ARC1EZJBP install ./android/app/release/app-release.apk

## Open android from terminal in order to make node available [for react native android compilation]

- open -a /Applications/Android\ Studio.app

## Tutorial to build android application with lynxjs

[https://www.youtube.com/watch?v=JkImJR-m7NM]

## Debug with lynx-devtool

[https://github.com/lynx-family/lynx-devtool]

## Generate app logo (Android + iOS)

[https://easyappicon.com]

## RN splash screen generator

[https://utilitytoolshub.com/splash-screen-generator/?utm_source=chatgpt.com]

## To do

- OK - zustand
- OK - add animation in lynx
- picture gallery both
- check off line mode lynx
- OK - add back more data in lynx
- OK - RN resetList();// maybe move this function into fetchCleanList and delete function resetListAndGetMovies and use fetchCleanList directly
- OK - add log both in rn and lynx and check that on changing genre or year the internal list is reset
- OK - reduce background stress
- OK - remove title lynx js
- android change icon

# Issues

apps/react-native-app/android/app/build/generated/autolinking/src/main/java/com/facebook/react/PackageList.java:14: error: cannot find symbol
import expo.core.ExpoModulesPackage;

- https://github.com/expo/eas-cli/issues/2789

# backlog

- calculate last 4 years instead of displaying hard coded list
- unify colors code
- dark mode
- lynx js swipe down to refresh
- lynx js main thread
