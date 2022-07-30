import { LogBox } from "react-native";

if (__DEV__) {
  const ignoreWarns = [
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    'Require cycle: node_modules/whatwg-fetch/dist/fetch.umd.js -> node_modules/react-native/Libraries/Network/fetch.js -> node_modules/whatwg-fetch/dist/fetch.umd.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/react-native/Libraries/Network/fetch.js',
    "RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks"
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}