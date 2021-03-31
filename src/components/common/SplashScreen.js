import React, { useContext } from 'react';
import { View, Image, ViewPropTypes, } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext, theme } from '../../theme';
const SplashScreen = () => {
    const theme = useContext(ThemeContext);
    return (
      <View style={styles.splashStyle}>
       <Image resizeMode="cover" 
    style={{width:theme.dimens.WINDOW_WIDTH*0.9, height:200, resizeMode:'contain', alignSelf: 'center'
    }}
     source={require('../../assets/download-(2).jpeg')}/>
      </View>
    );
  };
  
  const styles = {
    splashStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,

    },
  };
  export { SplashScreen };