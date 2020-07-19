import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Image,
  ScrollView, View, StyleSheet, TouchableOpacity, RefreshControl,StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MaterialHeaderButtons, Button, Text, Item } from '../common';
import { NAVIGATION_HOME_PRODUCT_PATH, NAVIGATION_STORE_PATH, NAVIGATION_AUTH_LOADING_SWITCH, NAVIGATION_ACCOUNT_STACK_PATH} from '../../navigation/routes';
import { NAVIGATION_CONTACT_PATH,NAVIGATION_AUTH_STACK_PATH,NAVIGATION_LOGIN_PATH } from '../../navigation/routes';
import { NAVIGATION_ACCOUNT_PATH } from '../../navigation/routes';
import { getHomeData, setCurrentProduct } from '../../actions';
import HomeSlider from './HomeSlider';
import CurrencyPicker from './CurrencyPicker';
import FeaturedProducts from './FeaturedProducts';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import { translate } from '../../i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContactScreen from './contactScreen';

class HomeScreen extends Component {
  static contextType = ThemeContext;

  static navigationOptions = ({ navigation }) => ({
    

    headerTitle: (<Image resizeMode="contain" 
    style={{width:theme.dimens.WINDOW_WIDTH*0.8, height:55, resizeMode:'contain', alignSelf: 'center'
    }}
     source={require('../../assets/download-(2).jpeg')}/>),
     
     //translate('home.title'),
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

  componentDidMount() {
    const { navigation } = this.props;
   // if (this.props.slider.length === 0) {
      //this.props.getHomeData();
    //}
   // navigation.setParams({ toggleDrawer: this.toggleDrawer });
  }

  // toggleDrawer = () => {
    // const { navigation } = this.props;
    //  navigation.toggleDrawer();
  // };

  // onProductPress = (product) => {
  //   this.props.setCurrentProduct({ product });
  //   NavigationService.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
  //     title: product.name,
  //   });
  // };
  openContactScreen() {
    NavigationService.navigate(NAVIGATION_CONTACT_PATH, {title : "Contact Us"});
    <ContactScreen link="https://dev03-totaltools.balancenet.com.au/contact" />
  };
  openStoreScreen() {
    NavigationService.navigate(NAVIGATION_STORE_PATH, {title : "Store Locator"});
  };

   openAccount() {
    NavigationService.navigate(NAVIGATION_ACCOUNT_STACK_PATH);
  };
   


  onRefresh = () => {
    this.props.getHomeData(true);
  };

  // renderFeatured() {
  //   return _.map(this.props.featuredProducts, (value, key) => (
  //     <FeaturedProducts
  //       key={`featured${key}`}
  //       products={value}
  //       title={this.props.featuredCategories[key].title}
  //       onPress={this.onProductPress}
  //       currencySymbol={this.props.currencySymbol}
  //       currencyRate={this.props.currencyRate}
  //     />
  //   ));
  // }
 
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
        <TouchableOpacity onPress={this.openAccount}>        
           <Image resizeMode="cover" 
    style={styles.canvas}
     source={require('../../assets/insiderimage.jpeg')}/>
      </TouchableOpacity>

      <Image resizeMode="cover" 
    style={styles.shopimage}
     source={require('../../assets/shopimage1.jpeg')}/>
    <Image resizeMode="cover" 
      style={styles.canvas}
        source={require('../../assets/insurance.jpeg')}/>

        <Image resizeMode="cover" 
          style={styles.canvas}
            source={require('../../assets/openpay.jpeg')}/>
     
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

       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         Specials
       </Text>

       <View style={{
          flex:6,
          flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal:2 ,
           
            }}>
       <Icon name="shopping-cart" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start' ,flex:4}}>
       BONUS/ REDEMPTION OFFERS

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}} ></Icon>

       </View>

       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         ZipPay Now Available!
       </Text>

       <View style={{
          flex:6,
          flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal:2 ,
           
            }}>
        <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}}></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         IMAR Insurance
       </Text>

       <View style={{
         flex:6,
            flexDirection: "row",
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          paddingHorizontal:2 ,
           
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{flex:4, alignSelf:'flex-start'}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1 , marginLeft:9}}></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         Openpay
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:2,
           
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start',flex:4}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}}></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         Mitsubishi Triton Offer
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:2 ,
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}} ></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         Shop the Latest Products
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:2 ,
           
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       NEW TOOLS IN STOCK

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}} ></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, }}>
         Weather Forecast
       </Text>

       <View style={{
          flex:6,
          flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal:2,

            }}>
       <Icon name="cloud" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start',flex:4}}>
       www.bom.gov.au

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{flex:1, marginLeft:9}} ></Icon>

       </View>
       
    
        {/* <HomeSlider slider={this.props.slider} />
        {this.renderFeatured()}
        <Button onPress={this.openAccount}> Profile
        
           </Button> */}
       {/* <TouchableOpacity onPress={this.openContactScreen}> */}
        {/* <Image source={require('./../download.jpeg')} /> */}
        {/* <HomeSlider slider={this.props.slider} /> */}
        {/* </TouchableOpacity> */}
        

       {/* <TouchableOpacity onPress={this.openStoreScreen}> */}
        {/* <Image source={require('./../download.jpeg')} /> */}
        {/* <HomeSlider slider={this.props.slider} /> */}
        {/* </TouchableOpacity> */}
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
    padding : 0
  },


});

HomeScreen.propTypes = {
  slider: PropTypes.array,
  getHomeData: PropTypes.func,
  navigation: PropTypes.object,
  featuredProducts: PropTypes.object,
  featuredCategories: PropTypes.object,
  setCurrentProduct: PropTypes.func,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  refreshing: PropTypes.bool,
};

HomeScreen.defaultProps = {
  slider: [],
};


const mapStateToProps = (state) => {
  const { refreshing } = state.home;
  const {
    errorMessage,
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;
  return {
    ...state.home,
    refreshing,
    errorMessage,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, { getHomeData, setCurrentProduct })(HomeScreen);
