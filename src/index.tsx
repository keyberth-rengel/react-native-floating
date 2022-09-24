import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, BORDER_RADIUS } from './contants';
import useInitialPosition from './hooks/useInitialPosition';
import type { CompoundPosition } from './hooks/useInitialPosition';

type FloatingParams = {
  item?: React.FC;
  width?: number;
  height?: number;
  position?: CompoundPosition;
};

export const Floating: React.FC<FloatingParams> = ({
  item,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  position = 'left|top',
}) => {
  const { vertical, horizontal } = useInitialPosition({
    width,
    height,
    position,
  });

  const translateX = useSharedValue<number>(horizontal);
  const translateY = useSharedValue<number>(vertical);

  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event: { translationX: number; translationY: number }) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            position: 'absolute',
            height: DEFAULT_HEIGHT,
            width: DEFAULT_WIDTH,
            borderRadius: BORDER_RADIUS,
            aspectRatio: 1,
            backgroundColor: 'blue',
            opacity: 0.8,
          },
          rStyle,
        ]}
      >
        {item}
      </Animated.View>
    </GestureDetector>
  );
};

export const FloatingHandleRootView: React.FC = ({ children }) => {
  const fStyle = {
    flex: 1,
  };
  return (
    <GestureHandlerRootView style={fStyle}>{children}</GestureHandlerRootView>
  );
};
