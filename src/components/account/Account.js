import React, { useEffect, useContext, state, useState} from 'react';
import { connect } from 'react-redux';
import XMLParser from "react-xml-parser";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes, { element } from 'prop-types';
import { Button, Text } from '../common';
import { magento } from '../../magento';
import { logout, currentCustomer } from '../../actions';
import { NAVIGATION_ORDERS_PATH, NAVIGATION_ADDRESS_SCREEN_PATH, NAVIGATION_INVOICE_SCREEN_PATH,NAVIGATION_LOGIN_STACK_PATH } from '../../navigation/routes';
import { ThemeContext, theme } from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { translate } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';

import InsiderData from './insiderData';
import { fn } from 'moment';
import { color } from 'react-native-reanimated';


const Account = ({
  customer,
  navigation,
  currentCustomer: _currentCustomer,
  logout: _logout,
  
}) => {
 
 const [data, setdata] = useState();
 const [lname, setlname ] = useState();
 const [mobile, setmobile ] = useState();
 const [tier, settier] = useState();
 const [insiderDollar, setinsiderdollar]= useState();
 const [expiry, setexpiry] = useState();
 const [spend, setspend] = useState();
 const [spendtoretain, setspendtoretain]= useState();
 const [spendtonext, setspendtonext]= useState();
 const [email, setemail] = useState();


  const theme = useContext(ThemeContext);

  useEffect(() => {
    // ComponentDidMount
    
    if (!customer) {
      _currentCustomer();
    }
    if(!data) {
      getInsiderData();
    } 
    
  }, []);
  
  
      const getInsiderData = async () =>{
    let loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id");
          console.log(loyaltyid.value)
        const response = await fetch('https://totaltools-xi-test-03.prontohosted.com.au/pronto/rest/internalUAT/api/GetMember', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': "application/json",
      'x-pronto-token': "balance:*:7fc966b1e11433d976c9b43c2eac2b7de13b8946f7c210352fcad59ea34ecc3427a71b3f800e36cf5990075027d0944face261d39460413582754e3b5198e045:251c5834f45d130da550a15695dc075db19fd0d30be4a0b9",
    },
    body: `<?xml version="1.0"?><GetMemberRequest><Parameters><LoyaltyID>${loyaltyid.value}</LoyaltyID></Parameters></GetMemberRequest>`,
  });
  const responseText = await response.text();
  var XMLParser = require('react-xml-parser');
  var xml = new XMLParser().parseFromString(responseText);

  //console.log(xml.getElementsByTagName('FirstName')[0].value);
  //console.log(xml.getElementsByTagName('LastName')[0].value);
  let fname = xml.getElementsByTagName('FirstName')[0].value
  let lname = xml.getElementsByTagName('LastName')[0].value
  let mobile = xml.getElementsByTagName('Mobile')[0].value
  let email = xml.getElementsByTagName('EmailAddress')[0].value

  let tier = xml.getElementsByTagName('Tier')[0].value
  let insiderdollars = xml.getElementsByTagName('InsiderDollars')[0].value
  let spendtoretain = xml.getElementsByTagName('SpendToRetain')[0].value
  let spend = xml.getElementsByTagName('Spend')[0].value
  let pointexpiry = xml.getElementsByTagName('PointExpiry')[0].value
  let spendtonext = xml.getElementsByTagName('SpendToNextTier')[0].value
  setdata(fname);
  setlname(lname);
  setemail(email);
  setmobile(mobile);
  settier(tier);
  setspendtonext(spendtonext);
  setinsiderdollar(insiderdollars);
  setspendtoretain(spendtoretain);
  setspend(spend);
  setexpiry(pointexpiry);
}
 

  // const renderData= () =>{
  //   return (
  //     <View>
  //       <Text bold
  //         type="subheading"
  //         style={{textAlign:'center', fontSize:25}} >{data}</Text>
  //         <Text bold
  //         type="subheading"
  //         style={{textAlign:'center', fontSize:25}} >{lname}</Text>
         
  //     </View>
  //   // return data.map(element => {return (
  //   //   
  //   );
  // }

  const onLogoutPress = () => {
    navigation.navigate(NAVIGATION_LOGIN_STACK_PATH);
    _logout();
   
  };
      

  const renderCustomerData = () => {
    if (!customer) {
      return (
        <ActivityIndicator
          size="large"
          color={theme.colors.secondary}
          style={styles.activity(theme)}
        />

      );
      
    }
    
    const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id")
  const { email, firstname, lastname, dob,} = customer;
    console.log("this is the line after which u need to pay attention")
    console.log(customer)
    console.log(loyaltyid.value)
    
    return (
      <ScrollView>
      <View style={{}}>
        <Text
          bold type="subheading" style={{textAlign:'center', fontSize:25, marginBottom:7 }}>
           {firstname}
          {' '}
          {lastname}
        </Text>
        <View style={{
          flex:1,
          flexDirection:'row',
          height:150,
          backgroundColor:'#ffffff'
           }}>
          <View style={{borderWidth:1,
          borderColor:"#ededed", width:theme.dimens.WINDOW_WIDTH*0.5,
           padding:10}}>
          <Text style={{alignSelf:'center'}}> Your Insider Level: </Text>
          <Text style={{alignSelf:'center',fontSize:40, color:theme.colors.primaryDark,}}> {tier} </Text>
          <Text style={{textAlign:"center" , fontSize:12 }}>Spend ${spendtonext} by 30 June 2020 to reach BRONZE </Text>


          </View>
          <View style={{borderWidth:1,
          borderColor:"#ededed",width:theme.dimens.WINDOW_WIDTH*0.5,
          marginHorizontal:3, padding:10}}>
      <Text style={{alignSelf:"center",  }}> Insider Dollars:  </Text>
          <Text style={{fontSize:40, color:theme.colors.primaryDark, alignSelf:'center'}}>{insiderDollar}</Text>
          <Text style={{textAlign:"center" , fontSize:12 }}>Your ${insiderDollar} Insider Dollars are due to expire: </Text>
          <Text style={{textAlign:'center' ,fontSize:12}}>{expiry}</Text>
        </View>
       
        </View>
        <Text style={{textAlign:'center', color:theme.colors.black,}}>*Insider Dollars may takae up to 48hrs to appear. Rewards carry shorter expiry. Membership Year July 1- June 30</Text>
        <View style={{
          flex:1,
          flexDirection:'row',backgroundColor:'#ffffff',
          height:100}}>
             <View style={{borderWidth:1, borderColor:'#ededed',
           width:theme.dimens.WINDOW_WIDTH*0.5,
           padding:10}}>
          <Text style={{textAlign:'center'}}> Your Spend this Membership Year: </Text>
             <Text style={{fontSize:40, color:theme.colors.primaryDark, alignSelf:'center'}}> ${spend}</Text>
          </View>
          <View style={{borderWidth:1, borderColor:'#ededed',
           width:theme.dimens.WINDOW_WIDTH*0.5,
           padding:10}}>
          <Text style={{textAlign:'center'}}> Spend Required to Retain your tier: </Text>
          <Text style={{fontSize:40, color:theme.colors.primaryDark, alignSelf:'center'}}> ${spendtoretain}</Text>
             
           </View>

        </View>

        <View style={{
          flex:1,
          flexDirection:'row',
          justifyContent:'center',
          }}> 
          <TouchableOpacity>
            <View style={{borderWidth:1,backgroundColor:'#ffffff',  borderColor:'#ededed',
           width:theme.dimens.WINDOW_WIDTH*0.45,
           padding:5 ,flexDirection:'row', marginTop:20, margin:5,height:50}}>
             <Icon name="info-circle" color={theme.colors.primaryDark} size={15} style={{alignSelf:'center'}}></Icon>
             <Text style={{alignSelf:'center', marginLeft:10}}>Member Benefits</Text>
           </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{borderWidth:1,  borderColor:'#ededed',backgroundColor:'#ffffff',
           width:theme.dimens.WINDOW_WIDTH*0.45,
           padding:5 ,flexDirection:'row', marginTop:20, margin:5,height:50}}>
             <Icon name="info-circle" color={theme.colors.primaryDark} size={15} style={{alignSelf:'center'}}></Icon>
             <Text style={{alignSelf:'center', marginLeft:10}}>Insider Points</Text>
           </View>
          </TouchableOpacity>
          
          </View>
        {/* <Text>{mobile}</Text> */}
        {/* <Text style={styles.center}>{email}</Text> */}
        {/* <Text style={styles.center}>{loyaltyid.value}</Text> */}
        {/* <Text style={styles.center}>{dob}</Text> */}
      
      </View>
      <Text style={{textAlign:'center',flex:1, fontSize:15, }}>Contact Information</Text>
      <View style= {{flex:1, borderTopWidth:1, borderBottomWidth:1, borderColor:'#ededed', padding:10}}>
      <Text style={{fontSize:10,}}>Email Address</Text>
            <Text style={{fontSize:20, color:'black'}}>{email}</Text
            >
      </View>
      <View style= {{flex:1, borderBottomWidth:1, borderColor:'#ededed', padding:10}}>
      <Text style={{fontSize:10,}}> Mobile Number </Text>
            <Text style={{fontSize:20, color:'black'}}>{mobile}</Text>

      </View>
      </ScrollView>
    );
};

  const openOrders = () => {
    navigation.navigate(NAVIGATION_ORDERS_PATH);
  };

  const openAddAddress = () => {
    navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
  };

   const openInvoice = () => {
     navigation.navigate(NAVIGATION_INVOICE_SCREEN_PATH);
   };
   
   
//   const insiderbasicInfo = (datafromInsider) => {

//     //setdata([...data, {text:datafromInsider.value}])
//     // let fname = datafromInsider.fname;
//      //let lname = datafromInsider.lname;
//      let name = datafromInsider
// return (
// <View>
  
// <Text>{name}</Text>
// </View>
// )
// };
  
  return (
    <View style={styles.container(theme)}>
      {/* {renderData()} */}
     {/* {renderInsiderData()} */}
     {/* <InsiderData callback={this.insiderbasicInfo} callback={()=>this.callback} /> */}
      {/* {insiderbasicInfo()} */}
      {renderCustomerData()}
      <Button onPress={onLogoutPress}>
        {translate('account.logoutButton')}
      </Button>
      <Button onPress={openOrders} style={styles.buttonMargin(theme)}>
        {translate('account.myOrdersButton')}
      </Button>
      <Button onPress={openAddAddress} style={styles.buttonMargin(theme)}>
        {translate('account.myAddressButton')}
      </Button>
      <Button onPress={openInvoice} style={styles.buttonMargin(theme)}> My Invoices </Button>
    </View>
  );
};

Account.navigationOptions = ({ navigation }) => ({
      
  headerTitle: (
  <Text  type="heading" bold style={{marginLeft:theme.dimens.WINDOW_WIDTH*0.25, color:theme.colors.primaryDark,width:theme.dimens.WINDOW_WIDTH*0.7,}}>
  PROFILE
    </Text>
    ),
  headerBackTitle: ' ',
  headerLeft: ( 
    <Icon.Button name="barcode" backgroundColor="00FFFFFF" color={theme.colors.primaryDark}> 
    <Text style={{ color:theme.colors.primaryDark}}> 
    Scan 
    </Text>
    </Icon.Button> 
    
  ),
  headerRight: ( 
    <TouchableOpacity>
    <Icon name="user-alt" size={20} style={{alignSelf:"flex-start", marginRight:10,color:theme.colors.primaryDark}}> </Icon>
 </TouchableOpacity>
 
  ),
});

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    paddingTop: theme.spacing.large,
  }),
  activity: theme => ({
    padding: theme.spacing.large,
  }),
  center: {
    textAlign: 'center',
  },
  textContainer: theme => ({
    marginBottom: theme.spacing.large,
  }),
  buttonMargin: theme => ({
    marginTop: theme.spacing.large,
  }),
});

Account.propTypes = {
  customer: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  currentCustomer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

Account.defaultProps = {
  customer: null,
};

const mapStateToProps = ({ account }) => {
  const { customer } = account;
  return { customer };
};

export default connect(mapStateToProps, { logout, currentCustomer })(Account);
