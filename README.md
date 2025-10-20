# lynxjs-vs-react-native
Comparing a new mobile framework with a stable mobile framework - all about js

## Debug Lynxjs
- checkout https://github.com/lynx-family/lynx-devtool

# Utils
## copy apk for debug in android device
adb -s R7ARC1EZJBP install ./rn/android/app/build/outputs/apk/debug/app-debug.apk

adb -s R7ARC1EZJBP install ./rn/android/app/build/outputs/apk/release/app-release.apk
## open android from terminal in order to make node available [for react native android compilation]

- open -a /Applications/Android\ Studio.app

## Tutorial to build android application with lynxjs
[https://www.youtube.com/watch?v=JkImJR-m7NM]

## Debug with lynx-devtool
[https://github.com/lynx-family/lynx-devtool]


## To do
- OK - zustand
- add animation in lynx
- picture gallery both
- check off line mode lynx
- add back more data in lynx
-  RN resetList();// maybe move this function into fetchCleanList and delete function resetListAndGetMovies and use fetchCleanList directly
- add log both in rn and lynx and check that on changing genre or year the internal list is reset
-


