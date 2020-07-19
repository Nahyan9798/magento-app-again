import React, { Component } from 'react';
 import { WebView } from 'react-native-webview';
import {  Image,
    ScrollView, View, StyleSheet, RefreshControl, ActivityIndicator
  } from 'react-native';
import { NAVIGATION_CONTACT_PATH } from '../../navigation/routes';



class ContactScreen extends Component {
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
    <WebView source={{ uri: this.props.link }} 
    style={{ flex: 1 }}
    renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
    />
    );
  }
}
export default ContactScreen