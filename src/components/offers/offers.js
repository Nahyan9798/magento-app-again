import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Image,
  ScrollView, View, StyleSheet, TouchableOpacity, RefreshControl,StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialHeaderButtons, Button, Text, Item } from '../common';
import { NAVIGATION_HOME_PRODUCT_PATH, NAVIGATION_STORE_PATH} from '../../navigation/routes';
import { NAVIGATION_CONTACT_PATH,NAVIGATION_AUTH_STACK_PATH } from '../../navigation/routes';
import { NAVIGATION_ACCOUNT_PATH } from '../../navigation/routes';
import { ThemeContext, theme } from '../../theme';
import NavigationService from '../../navigation/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome5';

class OfferScreen extends Component {
    static contextType = ThemeContext;
  
    static navigationOptions = ({ navigation }) => ({
      
  
      headerTitle: (<Text  type="heading" bold style={{marginLeft:theme.dimens.WINDOW_WIDTH*0.25, color:theme.colors.primaryDark,width:theme.dimens.WINDOW_WIDTH*0.7,}}>OFFERS</Text>),
      headerBackTitle: ' ',
      headerLeft: ( <TouchableOpacity>
        <Icon.Button name="barcode" backgroundColor="00FFFFFF" color={theme.colors.primaryDark}> 
        <Text style={{ color:theme.colors.primaryDark}}> 
        Scan 
        </Text>
        </Icon.Button>
        
        </TouchableOpacity>
        // <MaterialHeaderButtons>
        //   <Item title="menu" iconName="menu" onPress={navigation.getParam('toggleDrawer')} />
        // </MaterialHeaderButtons>
      ),
      headerRight: ( 
        <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION_AUTH_STACK_PATH)}>
        <Icon name="user-alt" size={20} style={{alignSelf:"flex-start", marginRight:10,color:theme.colors.primaryDark}}> </Icon>
     </TouchableOpacity>
     
      ),
    });

    render() {
        const theme = this.context;
    
        if (this.props.errorMessage) {
          return (
            <View style={styles.errorContainer}>
              <Text>{this.props.errorMessage}</Text>
            </View>
          );
        }
    
        return ( <>
          {/* <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#8B0000" translucent = {true}/> */}
          <ScrollView
            style={styles.container(theme)}
            refreshControl={(
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
              />
              )}
          >
            
          <Image resizeMode="cover" 
        style={styles.shopimage}
         source={require('../../assets/shopimage1.jpeg')}/>
        <Image resizeMode="cover" 
          style={styles.canvas}
            source={require('../../assets/exclusiveoffer.jpeg')}/>
    
           
         <Text type="heading" bold style={{color:'black',fontSize: 25, alignSelf:'center', paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.9, }}>
             Brand Redemptions
           </Text>
           <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
             Whats New at Total Tools
           </Text>
    
           <View style={{
             flex:6,
             flexDirection: "row",
           justifyContent: 'space-around',
           alignItems: 'flex-start',
           paddingHorizontal:2 ,
               
                }}>
           <Icon name="comment-alt" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
           
           <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
           TOOLS NEWS & INFORMATION
    
           </Text>
           <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}}></Icon>
    
           </View>
           </ScrollView>
      </>
    );
  }
}

  const styles = StyleSheet.create({
    container: theme => ({
    
      flex: 1,
      backgroundColor: theme.colors.background,
    }),
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    canvas: {
      flex:1,
      position:'relative',
      alignSelf: 'center',
      resizeMode: 'contain',
      width: theme.dimens.WINDOW_WIDTH,
      height: theme.dimens.WINDOW_HEIGHT * 0.2,
      margin:0,
      padding : 0,
    },
    shopimage: {
      flex:1,
      position:'relative',
      alignSelf: 'center',
      resizeMode: 'contain',
      width: theme.dimens.WINDOW_WIDTH,
      height: theme.dimens.WINDOW_HEIGHT* 0.7,
      margin:0,
      padding : 0,
    },
  
  
  });

  export default OfferScreen;