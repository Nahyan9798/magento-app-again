import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
//import DOMParser from "xmldom";
import XMLParser from "react-xml-parser";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function parseXml(xml) {
  var dom = null;
  if (window.DOMParser) {
     try { 
        dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
     } 
     catch (e) { dom = null; }
  }
  else if (window.ActiveXObject) {
     try {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml)) // parse error ..
           window.alert(dom.parseError.reason + dom.parseError.srcText);
     } 
     catch (e) { dom = null; }
  }
  else
     alert("cannot parse xml string!");
  return dom;
}

export default class InsiderData extends React.Component {

    constructor(props){
  super(props);

     
}

    // componentDidMount() {
  async renderData(props) {
 
  const response = await fetch('https://totaltools-xi.prontohosted.com.au/pronto/rest/internal/api/GetMember', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': "application/json",
      'x-pronto-token': "balance:*:7fc966b1e11433d976c9b43c2eac2b7de13b8946f7c210352fcad59ea34ecc3427a71b3f800e36cf5990075027d0944face261d39460413582754e3b5198e045:251c5834f45d130da550a15695dc075db19fd0d30be4a0b9",
    },
    body: '<?xml version="1.0"?><GetMemberRequest><Parameters><LoyaltyID>448971</LoyaltyID></Parameters></GetMemberRequest>',
  });
  const responseText = await response.text();
  var XMLParser = require('react-xml-parser');
  var xml = new XMLParser().parseFromString(responseText);
  console.log(xml.getElementsByTagName('FirstName')[0].value);
  console.log(xml.getElementsByTagName('LastName')[0].value);
  console.log(xml)
  let LoyaltyCustomer = xml.getElementsByTagName('LoyaltyCustomer');
  console.log(LoyaltyCustomer);
  let fname = xml.getElementsByTagName('FirstName')[0].value
  let lname = xml.getElementsByTagName('LastName')[0].value
  let email = xml.getElementsByTagName('EmailAddress')[0].value

  //this.setState({xmlData:xml, fname: fname, lname: lname});

  props.callback(fname);
  // return(
  //   <View styles={styles.container}>
  //   <Text>abc</Text>
  // <Text>{fname}</Text>
  // <Text>{lname}</Text>
  // <Text>{email}</Text>

  // </View>
  // )
  
}




render() {
this.renderData();
  return(
null
 );

  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent : 'center',
    color: 'black',
  
  },
})
 

