import { Dimensions } from 'react-native';
import { multipleValue } from '../contants';

const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

export type CompoundPosition =
  | 'left|top'
  | 'left|bottom'
  | 'right|top'
  | 'right|bottom';

type Position = 'left' | 'top' | 'right' | 'bottom';

type UseInitialPositionParams = {
  width: number;
  height: number;
  position: CompoundPosition;
};

type UseInitialPosition = {
  limits: InitialStateType;
  vertical: number;
  horizontal: number;
};

type InitialStateType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const useInitialPosition = ({
  width,
  height,
  position,
}: UseInitialPositionParams): UseInitialPosition => {
  const initialState: InitialStateType = {
    left: widthScreen - (widthScreen - 2),
    top: heightScreen - (heightScreen - 2),
    right: widthScreen - width * multipleValue.width,
    bottom: heightScreen - height * multipleValue.height,
  };

  const positionDimension = position
    .split('|')
    .reduce((prevValue, currentValue) => {
      const value = currentValue.trim() as Position;
      const validateKeyDimensions =
        value === 'top' || value === 'bottom' ? 'vertical' : 'horizontal';

      return {
        ...prevValue,
        [validateKeyDimensions]: initialState[value],
      };
    }, {}) as { vertical: number; horizontal: number };

  return { limits: initialState, ...positionDimension };
};
export default useInitialPosition;
