import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Image,ScrollView, View, StyleSheet, TouchableOpacity, RefreshControl, KeyboardAvoidingView,} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialHeaderButtons, Button, Input, Text, Item } from '../common';
import { NAVIGATION_LOGIN_STACK_PATH, NAVIGATION_STORE_PATH, NAVIGATION_AUTH_LOADING_SWITCH, NAVIGATION_INVOICE_SCREEN_PATH, NAVIGATION_HOME_STACK_PATH} from '../../navigation/routes';
import { NAVIGATION_CONTACT_PATH,NAVIGATION_AUTH_STACK_PATH,NAVIGATION_LOGIN_PATH } from '../../navigation/routes';
import { NAVIGATION_ACCOUNT_PATH } from '../../navigation/routes';
import { getHomeData, setCurrentProduct } from '../../actions';
import HomeSlider from './HomeSlider';
import CurrencyPicker from './CurrencyPicker';
import FeaturedProducts from './FeaturedProducts';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import { translate } from '../../i18n';
import Modal from 'react-native-modal';
import { magento } from '../../magento';
import Share from "react-native-share";
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContactScreen from './contactScreen';
import { auth } from '../../actions/CustomerAuthActions';



class HomeScreen extends Component {
  constructor(props) {
    super(props);
  this.state = {
    isModalVisible:false,
    email: '',
    password : '',
    };
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);

  
  }

   

  static contextType = ThemeContext;

  static navigationOptions = ({ navigation }) => ({
    

    headerTitle: (<Image resizeMode="contain" 
    style={{width:theme.dimens.WINDOW_WIDTH*0.75, height:55, resizeMode:'contain', alignSelf: 'center'
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
      <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION_AUTH_LOADING_SWITCH)}>
      <Icon name="user-alt" size={20} style={{alignSelf:"flex-start", marginRight:10,color:theme.colors.primaryDark}}> </Icon>
   </TouchableOpacity>
   
    ),
  });

  
    
    
  


  async componentDidMount() {
    const { navigation } = this.props;
    const customerToken = await AsyncStorage.getItem('customerToken');
    magento.setCustomerToken(customerToken);
    if(!customerToken){
      this.openModal();
    
      }
      navigation.navigate(NAVIGATION_HOME_STACK_PATH)
    
  

    // navigation.navigate(
    //   customerToken
    //     ? NAVIGATION_HOME_STACK_PATH
    //     : NAVIGATION_LOGIN_STACK_PATH,
    // );
      
  };  
      //this.props.getHomeData();
    //}
   // navigation.setParams({ toggleDrawer: this.toggleDrawer });


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
  onLoginPress = () => {
    this.props.auth(this.state.email, this.state.password);
   
  };

  onSigninPress = () => {
    navigation.navigate(NAVIGATION_SIGNIN_PATH);
  };


  renderButtons = () => {
    return (
      <View>
        <Button
          disabled={this.state.email === '' || this.state.password === ''}
          onPress={this.onLoginPress}
        >
          {translate('login.loginButton')}
        </Button>
        <Button
          onPress={this.onSigninPress}
          style={styles.buttonMargin(theme)}
        >
          {translate('login.signupButton')}
        </Button>
        </View>
    )
  };

  openModal = () =>{
    this.setState({
    isModalVisible:true
    })
    }

    closeModal = () =>{
      this.setState({
      isModalVisible:false
      })
      }


  openContactScreen() {
    NavigationService.navigate(NAVIGATION_CONTACT_PATH, {title : "Contact Us"});
    <ContactScreen link="https://dev03-totaltools.balancenet.com.au/contact" />
  };
  openShops(){
    NavigationService.navigate(NAVIGATION_CONTACT_PATH, {title : "Contact Us"});

    <ContactScreen link="https://dev03-totaltools.balancenet.com.au/" />

  };
  openStoreScreen() {
    NavigationService.navigate(NAVIGATION_STORE_PATH, {title : "Store Locator"});
  };

   openInvoices() {
    NavigationService.navigate(NAVIGATION_INVOICE_SCREEN_PATH);
  };

   setEmail(inputdata) {
     this.setState({email: inputdata})
   };
   setPassword(inputData) {
    this.setState({password: inputData})
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

  shareOptions ={
        title: 'Share via',
        url: 'https://dev03-totaltools.balancenet.com.au/contact',
      };
    
        fun = async () => {
          const shareResponse = await Share.open(this.shareOptions);
        };
 
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
      <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} isVisible={this.state.isModalVisible} style={{backgroundColor:'white',maxHeight:theme.dimens.WINDOW_HEIGHT/ 2, flexDirection:'column', alignSelf:'center'}}>
      <View style={{ flex: 1,justifyContent:'center', padding:10, paddingTop:70}}>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container(theme)}
    >
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder='Email'
        keyboardType="email-address"
        returnKeyType="next"
        autoCorrect={false}
        value={this.state.email}
        editable={true}
        onChangeText={this.setEmail}
        onSubmitEditing={() => passwordInput.current.focus()}
        containerStyle={styles.inputContainer(theme)}
        textContentType="emailAddress"
      />
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        secureTextEntry
        placeholder='Password'
        autoCorrect={false}
        value={this.state.password}
        editable={true}
        onChangeText={this.setPassword}
        onSubmitEditing={this.onLoginPress}
        // assignRef={(input) => { passwordInput.current = input; }}
        containerStyle={styles.inputContainer(theme)}
        textContentType="password"
      />
      {this.renderButtons()}
      </KeyboardAvoidingView>
          </View>
      </Modal>

      <ScrollView
        style={styles.container(theme)}
        // refreshControl={(
        //   <RefreshControl
        //     refreshing={this.props.refreshing}
        //     onRefresh={this.onRefresh}
        //   />
        //   )}
      >
        <TouchableOpacity onPress={this.openInvoices}>        
           <Image resizeMode="cover" 
    style={styles.canvas}
     source={require('../../assets/insiderimage.jpeg')}/>
      </TouchableOpacity>


      <TouchableOpacity onPress={this.fun}> 
      <Image resizeMode="cover" 
    style={styles.shopimage}
     source={require('../../assets/shopimage1.jpeg')}/>
     </TouchableOpacity>

    <Image resizeMode="cover" 
      style={styles.canvas}
        source={require('../../assets/insurance.jpeg')}/>

        <Image resizeMode="cover" 
          style={styles.canvas}
            source={require('../../assets/openpay.jpeg')}/>
     
       <Text type="heading" bold style={{color:'black',fontSize: 22, alignSelf:'center', width: theme.dimens.WINDOW_WIDTH*0.8, margin:5}}>
         Whats New at Total Tools
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:20 ,
       margin:5
           
            }}>
       <Icon name="comment-alt" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       TOOLS NEWS & INFORMATION

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{ marginLeft:9}}></Icon>

       </View>

       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8,margin:5 }}>
         Specials
       </Text>

       <View style={{
          flex:6,
          flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal:2 ,
        margin:5
            }}>
       <Icon name="shopping-cart" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start' ,flex:4}}>
       BONUS/ REDEMPTION OFFERS

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{ marginLeft:9}} ></Icon>

       </View>

       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8,margin:5 }}>
         ZipPay Now Available!
       </Text>

       <View style={{
          flex:6,
          flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal:2 ,
        margin:5
            }}>
        <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{marginLeft:9}}></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, margin:5}}>
         IMAR Insurance
       </Text>

       <View style={{
         flex:6,
            flexDirection: "row",
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          paddingHorizontal:2 ,
          margin:5
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{flex:4, alignSelf:'flex-start'}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{marginLeft:9}}></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, margin:5}}>
         Openpay
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:2,
       margin:5
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start',flex:4}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{ marginLeft:9}}></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8,margin:5 }}>
         Mitsubishi Triton Offer
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:2 ,
       margin:5
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       Learn More! 

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{ marginLeft:9}} ></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, margin:5}}>
         Shop the Latest Products
       </Text>

       <View style={{
         flex:6,
         flexDirection: "row",
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingHorizontal:2 ,
       margin:5
            }}>
       <Icon name="info-circle" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start', flex:4}}>
       NEW TOOLS IN STOCK

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{ marginLeft:9}} ></Icon>

       </View>
       <Text type="heading" bold style={{color:'black',fontSize: 22, paddingHorizontal:15, width: theme.dimens.WINDOW_WIDTH*0.8, margin:5}}>
         Weather Forecast
       </Text>

       <View style={{
          flex:6,
          flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal:2,
        margin:5
            }}>
       <Icon name="cloud" backgroundColor="black" color="black" size={20} style={{flex:0.5, marginLeft:9}}></Icon>
       
       <Text type="subheading" bold style={{alignSelf:'flex-start',flex:4}}>
       www.bom.gov.au

       </Text>
       <Icon name="chevron-right" backgroundColor="00FFFFFF" size={25} style={{ marginLeft:9}} ></Icon>

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
  inputContainer: theme => ({
    width: theme.dimens.WINDOW_WIDTH * 0.7,
    marginBottom: theme.spacing.large,
  }),
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
  buttonMargin: theme => ({
    marginTop: theme.spacing.large,
  }),
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
  const {error, success, loading} = state.customerAuth;
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
    error, success, loading
  };
};

export default connect(mapStateToProps, { auth, setCurrentProduct })(HomeScreen);
