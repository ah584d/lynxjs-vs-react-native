# Development Notes

(??)## Android Dependency Upgrade (apps/lynxjs-app/android)

### Key blocker

`compileSdk`/`targetSdk` are pinned to **34** because **Lynx SDK 3.4.1** ships native
`.so` libraries (`liblynx.so`, `liblynx_v8_bridge.so`, `liblynxtrace.so`) that are **not
16KB-page aligned**. This caps every AndroidX library at its last SDK‑34‑compatible
release. The Lynx SDK — not Gradle — is the real upgrade gate.

Documented in [gradle.properties](apps/lynxjs-app/android/gradle.properties) and
[app/build.gradle.kts](apps/lynxjs-app/android/app/build.gradle.kts).

### Upgraded (stays within compileSdk 34)

Applied in [gradle/libs.versions.toml](apps/lynxjs-app/android/gradle/libs.versions.toml):

| Dependency                           | Before | After  |
| ------------------------------------ | ------ | ------ |
| androidx.core:core-ktx               | 1.10.1 | 1.13.1 |
| androidx.appcompat                   | 1.6.1  | 1.7.1  |
| com.google.android.material          | 1.10.0 | 1.12.0 |
| androidx.test.ext:junit              | 1.1.5  | 1.2.1  |
| androidx.test.espresso:espresso-core | 3.5.1  | 3.6.1  |

Validated with `./gradlew :app:assembleDebug` → BUILD SUCCESSFUL.

### Intentionally left as-is

- **Gradle 8.13 / AGP 8.13.0 / Kotlin 2.0.21** — already current and mutually matched;
  bumping Gradle/AGP alone adds risk with no real benefit. (Optional, low value:
  Gradle 8.14.3 + AGP 8.14.x.)
- **core 1.15+, material 1.13+, appcompat 1.8+** — all require `compileSdk 35`, blocked
  by the Lynx 16KB alignment issue.

### To unlock bigger upgrades (compileSdk 35, AGP 9.x / Gradle 9.x)

1. Upgrade Lynx SDK to a release that fixes 16KB alignment.
2. Raise `compileSdk`/`targetSdk` to 35.
3. Then bump core → 1.17+, material → 1.13+, appcompat → 1.7.1 (or 1.8 if raising
   minSdk to 23).

### Current build facts

- Gradle wrapper: 8.13; AGP: 8.13.0; Kotlin: 2.0.21
- JDK: 21 (daemon JVM pinned via `gradle/gradle-daemon-jvm.properties`)
- minSdk: 29; Java/Kotlin target: 11; abiFilters: `arm64-v8a`, `armeabi-v7a`
- Lynx SDK: `org.lynxsdk.lynx:* 3.4.1` (hardcoded in `app/build.gradle.kts`)

# Simulators

iphone 16 pro - rn
iphone 16 plus - lx

## Debug Lynxjs

- checkout https://github.com/lynx-family/lynx-devtool
- for RN run app in iPhone 16 Pro and for LX run iPhone 16 plus

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
- lynx js main thread to improve performance

- lx search
- OK - lx curtain animation
- OK - update to expo SDK 55
- add instructions for android simulator network connection
- upgrade gradle to 9.0.0
- update lx 3.7 and gradle
- support svg in lx
- move to pnpm back
- support AI in lynx per agent
- OK almost - extract lx header in separate component and hide fps with toggle button lx + rn

# Issues

apps/react-native-app/android/app/build/generated/autolinking/src/main/java/com/facebook/react/PackageList.java:14: error: cannot find symbol
import expo.core.ExpoModulesPackage;

- https://github.com/expo/eas-cli/issues/2789

Execution failed for task ':app:createBundleReleaseJsAndAssets'.

> A problem occurred starting process 'command '/ynxjs-vs-react-native/movies-rn/node_modules/react-native/sdks/hermesc/osx-bin/hermesc''

- run the commands: `mkdir -p node_modules/react-native/sdks/hermesc && ln -sf ../../../hermes-compiler/hermesc/* node_modules/react-native/sdks/hermesc/` [this is the postinstall so you can run npm ci as well]
  and then run again: `npm run android:build_release_apk`
