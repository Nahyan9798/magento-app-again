import React, { Component } from 'react';
 import { WebView } from 'react-native-webview';
import {  Image,
    ScrollView, View, StyleSheet, RefreshControl,ActivityIndicator
  } from 'react-native';
import { NAVIGATION_STORE_PATH } from '../../navigation/routes';



class StoreLocator extends Component {

  static navigationOptions = ({ navigation }) => ({header:null});

    LoadingIndicatorView() {
        return (
          <ActivityIndicator
            color='#0a1142'
            size='large'
            style={{
              flex: 1,
              justifyContent: 'center'
            }}
          />
        )
      }
  render() {
    return (
    <WebView source={{ uri: 'https://dev03-totaltools.balancenet.com.au/storelocator/' }} 
    style={{ marginTop: 2, flex: 1 }} 
    renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
        />
    );
  }
}
export default StoreLocator