import React, { useEffect, useContext, state, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Text, Price } from '../common';
import { NAVIGATION_ORDER_PATH } from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';
import {  currentCustomer } from '../../actions';
import { translate } from '../../i18n';
import { priceSignByCode } from '../../helper/price';

const OrderListItem = ({
  account,
  item,
}) => {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    // ComponentDidMount
    
    if (!customer) {
      _currentCustomer();
    }
  
  }, []);


  const [data, setdata] = useState([]);

  const currencySymbol = priceSignByCode(item.order_currency_code);
  const customer = account.customer;
  const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id")

  const getInsiderData = async () =>{
    const loyaltyid = customer.custom_attributes.find(attribute => attribute.attribute_code == "loyalty_id");
          // console.log(loyaltyid.value)
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
  var XMLParser = require('react-xml-parser');
  var xml = new XMLParser().parseFromString(responseText);
  console.log('this is xml data'+ xml);
  setdata(xml);
    const getdata = data.items.map((item) =>{
        console.log(item.InvoiceNumber);
    });
 
}



  const openOrdersScreen = () => {
    NavigationService.navigate(NAVIGATION_ORDER_PATH, {
      item,
    });
  };
   
  
  
  return (
    <TouchableOpacity onPress={openOrdersScreen}>
      <View style={styles.container(theme)}>
     
        <View style={{flex:2, flexDirection:'row',alignItems:'flex-start'}}>
        {/* <Text bold style={{flex:1.5}}>{invoice}</Text> */}
        <Price
            basePrice={item.grand_total}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
        {/* <Text type="label">{`${translate('orderListItem.created')}: ${item.created_at}`}</Text>
        <Text type="label">{item.customer_email}</Text>
        <Text type="label">{loyaltyid.value}</Text>
        
        <Text type="label">
          {`${translate('orderListItem.shipTo')} ${item.customer_firstname} ${item.customer_lastname}`}

        </Text>
        <View style={styles.row}>
          <Text type="label">
            {`${translate('orderListItem.orderTotal')}: `}
          </Text>
          
        </View>
        <Text type="label">{`${translate('orderListItem.status')}: ${item.status}`}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.dimens.borderRadius,
    marginTop: theme.spacing.small,
    padding: theme.spacing.small,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    flex: 1,
  }),
  row: {
    flexDirection: 'row',
  },
});

OrderListItem.propTypes = {
  
  item: PropTypes.object.isRequired,
  
};


OrderListItem.defaultProps = {};

const mapStateToProps = (state) => {
  const accountData = state.account;
  return {
    account: accountData
  }
};

export default connect(mapStateToProps)(OrderListItem);
