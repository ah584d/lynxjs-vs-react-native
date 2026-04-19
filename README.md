# lynxjs-vs-react-native

Comparing a new mobile framework with a stable mobile framework - all about js

## Debug Lynxjs

- checkout https://github.com/lynx-family/lynx-devtool

# Utils

## copy apk for debug in android device

adb devices
adb reverse tcp:8081 tcp:8081

# RN:

✅ install on ios simulator: npm run ios
✅ clean android build: `npm run android:clean_build`
✅ build release APK (non signed): `npm run android:build_release_apk`
✅ install apk on device:
disable in android phone security option "automatic blocking" / חסימה אוטומטית
adb devices

unsigned: adb -s R7ARC1EZJBP install ./android/app/build/outputs/apk/debug/app-debug.apk
unsigned: adb -s R7ARC1EZJBP install ./android/app/build/outputs/apk/release/app-release.apk
signed. : adb -s R7ARC1EZJBP install ./android/app/release/app-release.apk

# Lynx:

pnpm run build:android
adb devices

unsigned: adb -s R7ARC1EZJBP install ./android/app/build/outputs/apk/release/app-release-unsigned.apk
signed. : adb -s R7ARC1EZJBP install ./android/app/debug/app-debug.apk
signed. : adb -s R7ARC1EZJBP install ./android/app/release/app-release.apk

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

## libs

- from root folder:
- if you want to modify one of the libs package.json run 'npm run ci' from root it will reinstall only the libs dependencies
- npm login
- open camera app and click on link and follow steps
- npm run build:libs. ===> YOU MUST COMPILE BEFORE PUBLISHING NEW PACKAGE
- cd ./libs/constants
- publish with increment version if necessary: `npm run publish-increment`

## To do / backlog

- OK - zustand
- OK - add animation in lynx
- picture gallery both
- check off line mode lynx
- OK - add back more data in lynx
- OK - RN resetList();// maybe move this function into fetchCleanList and delete function resetListAndGetMovies and use fetchCleanList directly
- OK - add log both in rn and lynx and check that on changing genre or year the internal list is reset
- OK - reduce background stress
- OK - remove title lynx js
- OK - android change icon
- move rn to apps back since we don't use anymore mono repo
- ===> dark mode
- lynx js swipe down to refresh
- lynx js main thread

- lx search
- OK - lx curtain animation
- OK - update to expo SDK 55
- add instructions for android simulator network connection
- upgrade gradle to 9.0.0
- update lx 3.7 and gradle
- support svg in lx

# Issues

apps/react-native-app/android/app/build/generated/autolinking/src/main/java/com/facebook/react/PackageList.java:14: error: cannot find symbol
import expo.core.ExpoModulesPackage;

- https://github.com/expo/eas-cli/issues/2789

Execution failed for task ':app:createBundleReleaseJsAndAssets'.

> A problem occurred starting process 'command '/ynxjs-vs-react-native/movies-rn/node_modules/react-native/sdks/hermesc/osx-bin/hermesc''

- run the commands: `mkdir -p node_modules/react-native/sdks/hermesc && ln -sf ../../../hermes-compiler/hermesc/* node_modules/react-native/sdks/hermesc/` [this is the postinstall so you can run npm ci as well]
  and then run again: `npm run android:build_release_apk`
