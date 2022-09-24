# react-native-floating

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

Library to generate picture-in-picture of any component within your applications, it will only be delimited by root

## Getting Started <a name = "getting_started"></a>

These instructions will help you set up your project correctly.

### Prerequisites

What things you need to install the software and how to install them.

#### Using npm:

```
npm install react-native-screens@3.17.0 react-native-safe-area-context@4.3.3 react-native-reanimated@2.3.1 react-native-gesture-handler@2.2.0
```

#### Or using yarn

```
yarn add react-native-screens@3.17.0 react-native-safe-area-context@4.3.3 react-native-reanimated@2.3.1 react-native-gesture-handler@2.2.0
```

### Installing

A step by step series of examples that tell you how to get a development env running.
```
npm install react-native-floating
```

Or yarn

```
yarn add react-native-floating
```

### Android installation
<details>
  <summary>Android details</summary>

#### **android/build.gradle**

```build.gradle
buildscript {
    ext {
        ...
        // replace 29 to 30
        compileSdkVersion = 30
        ...
    }
    ...
}
```

#### **android/app/src/main/java[Your Packages]/MainApplication.java**

add these two line to the top:

```java
import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
```

Add the `ReactNativeHost`

```java
private final ReactNativeHost mReactNativeHost =
  new ReactNativeHost(this) {
    ...

    //add this function
    @Override
    protected JSIModulePackage getJSIModulePackage() {
    return new ReanimatedJSIModulePackage();
    }
};
```
</details>

### IOS installation
<details>
  <summary>IOS details</summary>

Mac Intel

```bash
cd ios/ && pod install && cd ..
```

Mac M1

```bash
cd ios/ && arch -x86_64 pod install && cd ..
```
</details>



## Usage <a name = "usage"></a>

Add this line to the top:
```
import {FloatingHandleRootView, Floating} from "react-native-floating";
```

This is the container that delimits the scope of the floating-component
```
<FloatingHandleRootView>{children}</FloatingHandleRootView>
```

This is the floating-component
```
<Floating />
```


Import into the root of your project
```js
import React from 'react';

import Navigation from './src/navigation';
import {FloatingHandleRootView, Floating} from 'react-native-floating';

const App = () => {
  return (
    <FloatingHandleRootView>
      <Navigation />
      <Floating />
    </FloatingHandleRootView>
  );
};
```

#### bufferConfig
Adjust the buffer settings. This prop takes an object with one or more of the properties listed below.

 Property           | Type                                                | Description
--------------------|-----------------------------------------------------|-------------------------------------------------------------------
 width              | number                                              | The default setting for the float component width is 200.
 height             | number                                              | The default setting for the float component height is 130.
 position           | 'left-top' 'left-bottom' 'right-top' 'right-bottom' | The setting determines for the position of the left-top float component.
 item | React.Element                                       | It has no elements by default just a container to wrap its element.

