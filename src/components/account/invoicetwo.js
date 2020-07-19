// import React, { useEffect, useContext } from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import { Text, Price } from '../common'; 
// import { orderProductDetail } from '../../actions';
// import { NAVIGATION_INVOICE_SCREEN_PATH } from '../../navigation/routes';
// import NavigationService from '../../navigation/NavigationService';
// import { ThemeContext } from '../../theme';
// import { translate } from '../../i18n';

// const InvoiceScreen = ({
//   products,
//   navigation,
//   orderProductDetail: _orderProductDetail,
//     item,
//   }) => {
//     const theme = useContext(ThemeContext);
//     // useEffect(() => {
//     //   navigation.state.params.item.items.forEach((item) => {
//     //     if (!(item.sku in products)) {
//     //       _orderProductDetail(item.sku);
//     //     }
//     //   });
//     // },
//    //  []);
//     // const openInvoiceScreen = () => {
//     //     NavigationService.navigate(NAVIGATION_INVOICE_SCREEN_PATH, {
//     //       item,
//     //     });
//     //   };
//     console.log("you are in invoice tab")
//       return (
        
//           <View style={styles.container(theme)}>
//             <Text type="label">This will be the invoice page</Text>
//             {/* <Text bold>{`${translate('common.order')} # ${item.increment_id}`}</Text>
//             <Text type="label">{`${translate('orderListItem.created')}: ${item.created_at}`}</Text>
//             <Text type="label">
//               {`${translate('orderListItem.shipTo')} ${item.customer_firstname} ${item.customer_lastname}`}
//             </Text>
//             <View style={styles.row}>
//               <Text type="label">
//                 {`${translate('orderListItem.orderTotal')}: `}
//               </Text>
//               <Price
//                 basePrice={item.grand_total}
//                 currencySymbol={currencySymbol}
//                 currencyRate={1}
//               />
//             </View> */}
//             {/* <Text type="label">{`${translate('orderListItem.status')}: ${item.status}`}</Text> */}
//           </View>
       
//       );
//     };

//     const styles = StyleSheet.create({
//         container: theme => ({
//           backgroundColor: theme.colors.surface,
//           borderRadius: theme.dimens.borderRadius,
//           marginTop: theme.spacing.small,
//           padding: theme.spacing.small,
//           borderBottomWidth: 1,
//           borderColor: theme.colors.border,
//           flex: 1,
//         }),
//         row: {
//           flexDirection: 'row',
//         },
//       });
      
//       InvoiceScreen.propTypes = {
//         item: PropTypes.object.isRequired,
//       };
      
//       InvoiceScreen.defaultProps = {};
      
//       export default InvoiceScreen;


import React, { useEffect, useContext } from 'react';
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
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

import { NAVIGATION_HOME_SCREEN_PATH } from '../../navigation/routes';

const InvoiceScreen = ({
  orders,
  customerId,
  refreshing,
  getOrdersForCustomer: _getOrdersForCustomer,
  navigation,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    _getOrdersForCustomer(customerId);
  }, []);

  const onRefresh = () => {
    _getOrdersForCustomer(customerId, true);
  };

  const renderItem = orderItem => (
    <OrderListItem
      item={orderItem.item}
    />
  );

  const renderOrderList = () => {
    const data = orders.sort((b, a) => moment(a.created_at).diff(b.created_at));

    return (
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
)}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderEmptyOrderList = () => {
    const { navigate } = navigation;
    return (
      <View style={styles.emptyListContainerStyle(theme)}>
        <Text type="heading" style={styles.textStyle(theme)}>
          {translate('No Orders yet!')}
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
        >
          <Text type="heading" bold style={styles.buttonTextStyle(theme)}>
            {translate('common.continueShopping')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (orders && orders.length) {
    return (
      <View style={styles.container(theme)}>
        {renderOrderList()}
      </View>
    );
  }
  return renderEmptyOrderList();
};

InvoiceScreen.navigationOptions = () => ({
  title: "Invoices",
  headerBackTitle: ' ',
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
  textStyle: theme => ({
    paddingTop: theme.spacing.small,
  }),
  buttonTextStyle: theme => ({
    padding: theme.spacing.large,
    top: 0,
    color: theme.colors.secondary,
  }),
};

InvoiceScreen.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  customerId: PropTypes.number,
  refreshing: PropTypes.bool,
  getOrdersForCustomer: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

InvoiceScreen.defaultProps = {
  orders: null,
  customerId: null,
};

const mapStateToProps = ({ account, magento }) => {
  const customerId = account.customer ? account.customer.id : null;
  const orders = account.orderData ? account.orderData.items : [];
  return {
    customerId,
    orders,
    refreshing: account.refreshing,
  };
};

export default connect(mapStateToProps, {
  getOrdersForCustomer,
})(InvoiceScreen);