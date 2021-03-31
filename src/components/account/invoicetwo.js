
import React, { useEffect, useContext, useState } from 'react';
import { NAVIGATION_ORDERS_PATH, NAVIGATION_AUTH_LOADING_SWITCH, NAVIGATION_INVOICE_SCREEN_PATH,NAVIGATION_LOGIN_STACK_PATH } from '../../navigation/routes';
import AsyncStorage from '@react-native-community/async-storage';
import { magento } from '../../magento';
import NavigationService from '../../navigation/NavigationService';

import moment from 'moment';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator, 
  Animated
} from 'react-native';
import PropTypes from 'prop-types';
import {
  getOrdersForCustomer,
} from '../../actions';
import { Text ,Button} from '../common';
import OrderListItem from './OrderListItem';
import { ThemeContext, theme  } from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { translate } from '../../i18n';

import { NAVIGATION_HOME_SCREEN_PATH } from '../../navigation/routes';
import { ScrollView } from 'react-native-gesture-handler';
import { StandardDelivery } from 'bugsnag-react-native';
import { CheckBox } from 'react-native-elements'
import Modal from 'react-native-modal';
import { Pressable } from 'react-native';



const InvoiceScreen = ({ account,}) => {
  const theme = useContext(ThemeContext);

  

  
  useEffect(() => {
    // ComponentDidMount
    bootstrapAsync();  
    getInsiderData();
      

  }, []);

  const bootstrapAsync = async () => {
      const customerToken = await AsyncStorage.getItem('customerToken');
      magento.setCustomerToken(customerToken);

      NavigationService.navigate(
        customerToken
          ?  NAVIGATION_INVOICE_SCREEN_PATH
          : NAVIGATION_LOGIN_STACK_PATH,
      );
  }


  const [earray, setarray]=useState([]);
  const [data, setdata] = useState([]);
  const [orderno, setorderno] = useState([]);
  const [storename, setstorename] = useState([]);
  const [price , setprice] = useState([]);
  const [selected, setSelected] = useState(false);

  const customer = account.customer;
  const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id")

  const getInsiderData = async () =>{
     const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id");
          //console.log("loyalty id for insider data" + loyaltyid.value)
        const response = await fetch('https://totaltools-xi-test-03.prontohosted.com.au/pronto/rest/internalUAT/api/GetMemberTransactions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': "application/json",
      'x-pronto-token': "balance:*:7fc966b1e11433d976c9b43c2eac2b7de13b8946f7c210352fcad59ea34ecc3427a71b3f800e36cf5990075027d0944face261d39460413582754e3b5198e045:251c5834f45d130da550a15695dc075db19fd0d30be4a0b9",
    },
    body: `<?xml version="1.0"?><GetMemberRequest><Parameters><LoyaltyID>${loyaltyid.value}</LoyaltyID></Parameters></GetMemberRequest>`,
  });
  const responseText = await response.text();
  // console.log(responseText);
  // setdata(responseText);
  // console.log(responseText);
  var XMLParser = require('react-xml-parser');
 
  var xml = new XMLParser().parseFromString(responseText);
  console.log(xml)
  let th = xml.getElementsByTagName('LoyaltyTransaction');
  let sequence = xml.getElementsByTagName('SeqNo')
  setarray(th);
  }
//   const ShowButton = () => {
//     console.log("buttons is now shown")
//   }
    
//   // const press =(langauge)=> {
    
//     //setChecked({ langauge: { checked: !langauge.checked } })

//   // setChecked(!checked)
//   // console.log({checked})
  
//   // console.log({langauge})
//   // if(checked == false){
//   //   // ShowButton();

//   // }
// }

// const languages = [ {name: 'php', checked: false, },
// {name: 'py  ', checked: false, },
// {name: 'react', checked: false, },
// {name: 'rn', checked: false, },
// ]

// const onPressed = (langauge) => {
  // setChecked({ [langauge]: {checked : !checked } })
  // setChecked( checked.concat(checked[langauge] = !checked[langauge]) )
  // setChecked( checked.concat([langauge => !checked[langauge]]))
//  var temp;
//  temp[langauge] = !checked[langauge]
//   setChecked( checked.concat(temp))
  
//      setSelected(!languages[0].checked)
//   // setChecked([langauge]=!languages[langauge])
// console.log(selected)

  //console.log(langauge);
// }
return ( <>
 

  <ScrollView>
    {/* <CheckBox 
     title = 'php'
     name = 'lang1'
                 iconRight
           //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
           checkedColor = 'red'
           checked = { checked }
           onPress = { () =>  press('lang1') }
    />
<CheckBox 
     title = 'react'
     name = 'lang2'
                 iconRight
           //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
           checkedColor = 'red'
           checked = { checked }
           onPress = { () => press('lang2') }
    /> */}
        
    {/* {
      languages.map((l,i)=> {
        return(
          <View > 
         <CheckBox
         key= {i}
            title = { l.name }
          
            iconRight
            value = {l.name}
            //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
            checkedColor = 'red'
            checked = { l.checked }
            onPress = { () => onPressed(l) }
          />
        </View>
        )
      })
  
             
} */}
    { earray.map((item,index)=>{
      return(<>
    
      <View style={{borderBottomColor:theme.colors.primaryDark, borderBottomWidth:1, flex:1, margin:7,padding:10}}>
      <View style={{flexDirection:'row', fleX:4  ,}}>
     
     

      <Text style={{fontSize:20, flex:3 ,margin:5,  color:theme.colors.primaryDark}} > {item.getElementsByTagName('InvoiceNumber')[0].value} </Text>
      <Text style={{fontSize:20, margin:5, flex:0.9,  color:theme.colors.primaryDark,  textAlign:'right' }}> ${item.children[2].getElementsByTagName('Linevalue')[0].value} </Text>
       
      </View>
        
        <View style={{flexDirection:'row', }}>
       
        <View style={{flexDirection:'row', marginRight:5}}>
        <Icon name="calendar-alt"  style={{paddingVertical:5}}></Icon>
        <Text style={{fontSize:12, margin:5,   alignSelf:'flex-start'}} key={index}> {item.getElementsByTagName('OrderDate')[0].value} </Text>
        </View>
        
        <View style={{flexDirection:'row', }}>
        <Icon name="map-marker-alt"style={{paddingVertical:5, marginLeft:5}} ></Icon>
        <Text style={{fontSize:12, margin:5,   alignSelf:'flex-start'}} key={index}> {item.getElementsByTagName('StoreName')[0].value} </Text>
        </View>

        </View>
        </View>
       
        
      
       </>
      )
     })}

  </ScrollView> 
 
  {/* <Button style={{position:'absolute', bottom: 2, left:10, zIndex:30}}>Share as pdf</Button> */}
</>);


}


InvoiceScreen.navigationOptions = ({ navigation }) => ({
      
  headerTitle: (
  <Text  type="heading" bold style={{marginLeft:theme.dimens.WINDOW_WIDTH*0.25, color:theme.colors.primaryDark,width:theme.dimens.WINDOW_WIDTH*0.7,}}>
  Invoices
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
    <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION_AUTH_LOADING_SWITCH)}>
    <Icon name="user-alt" size={20} style={{alignSelf:"flex-start", marginRight:10,color:theme.colors.primaryDark}}> </Icon>
 </TouchableOpacity>
 
  ),
});
  

const styles = {
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  emptyListContainerStyle: theme => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  }),
  sheet: theme =>  ({
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  }),
  popup: theme =>  ({
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
  }),
  textStyle: theme => ({
    paddingTop: theme.spacing.small,
  }),
  buttonTextStyle: theme => ({
    padding: theme.spacing.large,
    top: 0,
    color: theme.colors.secondary,
  }),
};


const mapStateToProps = (state) => {
  const accountData = state.account;
  return {
    account: accountData
  }
};

export default connect(mapStateToProps)(InvoiceScreen);