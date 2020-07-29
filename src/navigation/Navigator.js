import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';

import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Category from '../components/catalog/Category';
import CategoryTree from '../components/catalog/CategoryTree';
import Product from '../components/catalog/Product';
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import Login from '../components/account/Login';
import Signin from '../components/account/Signin';
import Account from '../components/account/Account';
import AuthLoading from '../components/account/AuthLoading';
import PasswordReset from '../components/account/PasswordReset';
import HomeScreen from '../components/home/HomeScreen';
import SearchScreen from '../components/search/SearchScreen';
import OrdersScreen from '../components/account/OrdersScreen';
import OrderScreen from '../components/account/OrderScreen';
import AddressScreen from '../components/account/AddressScreen';
import OfferScreen from '../components/offers/offers';
import StoreScreen from '../components/home/storeLocator';
import InfoScreen from '../components/info/info';
import Invoice from '../components/account/invoicetwo';
import Contact from '../components/home/contactScreen';
import Store from '../components/home/storeLocator';
import DrawerScreen from '../components/catalog/DrawerScreen';


import CartBadge from '../components/cart/CartBadge';

import * as routes from './routes';

import { theme } from '../theme';

const defaultHeader = {
  headerStyle: {
    backgroundColor: theme.colors.white,
  },
  headerTitleStyle: {
    ...theme.typography.titleTextSemiBold,
  },
  headerBackTitle: "Back",
  headerTintColor: theme.colors.appbarTint,
};
const AuthStack = createStackNavigator({
  [routes.NAVIGATION_LOGIN_PATH]: Login,
  [routes.NAVIGATION_SIGNIN_PATH]: Signin,
  [routes.NAVIGATION_RESET_PASSWORD_PATH]: PasswordReset,
}, {
  navigationOptions: {header: null}},
);

const HomeStack = createStackNavigator(
  {
    [routes.NAVIGATION_HOME_SCREEN_PATH]: HomeScreen,
    [routes.NAVIGATION_CATEGORY_PATH]: Category,
    [routes.NAVIGATION_HOME_PRODUCT_PATH]: Product,
    [routes.NAVIGATION_CONTACT_PATH]: Contact,
  

  },
  {
    initialRouteName: routes.NAVIGATION_HOME_SCREEN_PATH,
    navigationOptions: defaultHeader,
  },
);



const AccountStack = createStackNavigator({
  [routes.NAVIGATION_ACCOUNT_PATH]: Account,
  [routes.NAVIGATION_ORDERS_PATH]: OrdersScreen,
  [routes.NAVIGATION_ORDER_PATH]: OrderScreen,
  [routes.NAVIGATION_ADDRESS_SCREEN_PATH]: AddressScreen,
  [routes.NAVIGATION_INVOICE_SCREEN_PATH]: Invoice,
}, {
  navigationOptions: {header:null},
});

const OfferStack = createStackNavigator({
  [routes.NAVIGATION_OFFER_SCREEN_PATH]: OfferScreen,
}, {navigationOptions: defaultHeader});

const StoreStack = createStackNavigator({
  [routes.NAVIGATION_STORE_PATH]: StoreScreen,
}, {navigationOptions: {header:null}});

const InvoiceStack = createStackNavigator({
  [routes.NAVIGATION_INVOICE_SCREEN_PATH]: Invoice,
}, {navigationOptions: {header:null}});

const AccountSwitch = createSwitchNavigator({
  [routes.NAVIGATION_AUTH_LOADING_SWITCH]: AuthLoading,
  [routes.NAVIGATION_LOGIN_STACK_PATH]: AuthStack,
  [routes.NAVIGATION_AUTH_STACK_PATH]: AccountStack,

  
}, {navigationOptions: {header:null}}

);

const InfoStack = createStackNavigator({
  [routes.NAVIGATION_INFO_SCREEN_PATH]: InfoScreen,
  //  [routes.NAVIGATION_ACCOUNT_STACK_PATH]: AccountStack,
  [routes.NAVIGATION_AUTH_LOADING_SWITCH]: AccountSwitch,
  // [routes.NAVIGATION_AUTH_LOADING_SWITCH]: AuthLoading,
}, {
  initialRouteName: routes.NAVIGATION_INFO_SCREEN_PATH,
  navigationOptions: {header:null}});





const SearchStack = createStackNavigator({
  [routes.NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
  [routes.NAVIGATION_SEARCH_PRODUCT_PATH]: Product,
}, {
  navigationOptions: defaultHeader,
});

const CartStack = createStackNavigator({
  [routes.NAVIGATION_CART_PATH]: Cart,
}, {
  navigationOptions: defaultHeader,
});

const MainAppNavigator = createBottomTabNavigator(
  {
    [routes.NAVIGATION_HOME_STACK_PATH]: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarLabel:'Home', 
        tabBarIcon: ({ tintColor }) => <Icon name="md-build" type="ionicon" color={tintColor} />,
      }),
    },

    [routes.NAVIGATION_OFFER_SCREEN_PATH]: {
      screen: OfferStack,
      navigationOptions: () => ({
        tabBarLabel:'Offers',  
        tabBarIcon: ({ tintColor }) => <Icon name="md-hammer" type="ionicon" color={tintColor} />,
      }),
    },
    [routes.NAVIGATION_INVOICE_SCREEN_PATH]: {
      screen: InvoiceStack,
      navigationOptions: () => ({
        tabBarLabel:'Invoices', 
        tabBarIcon: ({ tintColor }) => <Icon name="md-list" type="ionicon" color={tintColor} />,
      }),
    },
    [routes.NAVIGATION_STORE_PATH]: {
      screen: StoreStack,
      navigationOptions: () => ({
        tabBarLabel:'Stores', 
        tabBarIcon: ({ tintColor }) => <Icon name="md-pin" type="ionicon" color={tintColor} />,
      }),
    },
    [routes.NAVIGATION_INFO_SCREEN_PATH]: {
      screen: InfoStack,
      navigationOptions: () => ({
        tabBarLabel: 'info',
        tabBarIcon: ({ tintColor }) => <Icon name="md-information" type="ionicon" color={tintColor} />,
      }),
    },
  },
  {
    // initialRouteName: NAVIGATION_AUTH_STACK_PATH,
    tabBarOptions: {
      showLabel: true,
      activeTintColor: theme.colors.primaryDark,
      inactiveTintColor: theme.colors.tabBarIconInactive,
      activeBackgroundColor: theme.colors.tabBarBackground,
      inactiveBackgroundColor: theme.colors.tabBarBackground,
    },
  },
);

// const Drawer = createDrawerNavigator({
//   [routes.BOTTOM_TAB_NAVIGATOR]: {
//     screen: MainAppNavigator,
//   },
//   // [routes.NAVIGATION_AUTH_STACK_PATH]: {
//   //   screen: AccountSwitch,
//   //   navigationOptions: { header: null },
//   // },
// }, {
//   contentComponent: CategoryTree,
// });

// const DrawerNavigator = createStackNavigator(
  // {
  //   Drawer,
  // },
  // // {
    // contentComponent: DrawerScreen,
    // getCustomActionCreators: (route, stateKey) => ({
      // toggleFilterDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
    // }),
  // },
// );

const Nav = createStackNavigator({
  [routes.BOTTOM_TAB_NAVIGATOR]: {
    screen: MainAppNavigator,
    navigationOptions: { header: null },
  },
  // [routes.NAVIGATION_AUTH_STACK_PATH]:{ screen:AccountSwitch,  navigationOptions: { header: null },},
  // [routes.NAVIGATION_CHECKOUT_PATH]: Checkout,
}, {
  headerBackTitleVisible: false,
});

export const Navigator = createAppContainer(Nav);
