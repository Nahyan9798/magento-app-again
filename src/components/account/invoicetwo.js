
import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  getOrdersForCustomer,
} from '../../actions';
import { Text } from '../common';
import OrderListItem from './OrderListItem';
import { ThemeContext, theme  } from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { translate } from '../../i18n';

import { NAVIGATION_HOME_SCREEN_PATH } from '../../navigation/routes';
import { ScrollView } from 'react-native-gesture-handler';

const InvoiceScreen = ({ account,}) => {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    // ComponentDidMount
      getInsiderData();

  }, []);
  const [data, setdata] = useState([]);
 

  const customer = account.customer;
  const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id")

  const getInsiderData = async () =>{
     const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id");
          console.log("loyalty id for insider data" + loyaltyid.value)
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
  let invoice = xml.getElementsByTagName("TransactionHeader");
  let inv = xml.getElementsByTagName('InvoiceNumber');
    // inv.map((item)=> {
    //   console.log(item.value);

    // })
  setdata(data => [...data, inv]);
  
  
  data.map((item)=> {
    
      console.log(item.value);

    

  })
 
  //console.log(data);
  let ord = xml.getElementsByTagName('OrderNo');
  // let lt = array.map((item) => {
  //     console.log(item.value);
    
  //   });
    // console.log(item.value);
  
  
  
 // console.log(invoice);
  // 
  


  
 
}

// const renderdata =() => {

// const Invoicenumbers = data.map((item)=> {
//   return (
//     <View>

//   <Text>{item}</Text>
//     </View>
//   );
// })

// }

const getinvnumbers= () => {
    data.map((item)=>{
    <Text>{item.value}</Text>
    });
  
    
}

  //   return (item.InvoiceNumber);
  // });
  // console.log(Invoicenumbers);
// console.log('this is xml data'+ data);
return (
  <View >
    {data.map((item)=>{
    <Text style={{justifyContent:'center', flex:1, fontSize:22}}>{item.value}</Text>
    })}
    <Text>
    
      abc
    </Text>
  </View>
);


}

  

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