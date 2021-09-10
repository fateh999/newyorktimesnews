import React, {Fragment, ReactNode} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';
import {SafeAreaViewProps} from 'react-native-safe-area-context';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';

interface WrapperProps extends SafeAreaViewProps {
  backgroundColor: string;
}

const Wrapper = styled.View<WrapperProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

interface SafeWrapperProps extends SafeAreaViewProps {
  backgroundColor: string;
}

const SafeWrapper = styled.SafeAreaView<SafeWrapperProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

interface StatusBarIOSProps extends SafeAreaViewProps {
  statusBarBackgroundColor: string;
}

const StatusBarIOS = styled.SafeAreaView<StatusBarIOSProps>`
  flex: 0;
  background-color: ${({statusBarBackgroundColor}) => statusBarBackgroundColor};
`;

export type ContainerProps = {
  children?: ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
};

function Container(props: ContainerProps) {
  const theme = useThemeValue();
  const {
    children,
    backgroundColor = theme.colors.surface,
    statusBarBackgroundColor = theme.colors.primary,
    statusBarStyle = 'light-content',
  } = props;

  return (
    <Fragment>
      {Platform.OS === 'ios' ? (
        <Fragment>
          <StatusBar barStyle={statusBarStyle} />
          <StatusBarIOS statusBarBackgroundColor={statusBarBackgroundColor} />
          <SafeWrapper backgroundColor={backgroundColor}>
            {children}
          </SafeWrapper>
        </Fragment>
      ) : (
        <Fragment>
          <StatusBar
            barStyle={statusBarStyle}
            backgroundColor={statusBarBackgroundColor}
          />
          <Wrapper backgroundColor={backgroundColor} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Container;
