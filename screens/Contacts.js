import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { ListItem, SearchBarIOS, SearchBar } from 'react-native-elements'; 
import firebase from 'firebase';
import '@firebase/firestore'; 
import { Button } from 'react-native-elements';
import AddNewContactItem from '../components/AddNewContactItem';

var {height, width} = Dimensions.get('window');

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.currentUserID = firebase.auth().currentUser.uid;
  }

  state = {
    data:[]
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    //retrieve all the documents in contacts collection
    var start = new Date().getTime();
    const friendsArray = [];
    await firebase
      .firestore()
      .collection("users")
      .doc(`${this.currentUserID}`)
      .collection("contacts")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          friendsArray.push(doc.data());
        });
      });
    var elapsed = new Date().getTime() - start;
    console.log("Call to get current user took " + elapsed + " milliseconds");
    this.setState({data: friendsArray});
  }

  _renderHeader = () => {
    return (
    <SearchBar 
      containerStyle = {{borderTopWidth:0, backgroundColor: '#FC9700'}}
      inputContainerStyle = {{height: height*0.055, backgroundColor: "#F2F2f2"}}
      placeholder="Search"
      lightTheme={true}
      round
    />);
  }

  _renderItem(item) {
    return (
    <ListItem 
      roundAvatar
      containerStyle={{backgroundColor: "#FBF9F9"}}
      bottomDivider={true}
      chevron={true}
      leftAvatar= {{source: {uri: item.profile_picture} }}
      title={`${item.name}`}
      onPress={() => this.props.navigation.navigate("ContactDetails", {item})}
      //could be like employer / employee state
      //subtitle = {item.email}
    />);
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <View style={{flex: 7}}>
          <FlatList 
            backgroundColor = {"#FBF9F9"}
            ListHeaderComponent = {this._renderHeader}
            keyExtractor = {(item, index) => index.toString()}
            data = {this.state.data}
            extraData={this.state}
            renderItem = {({item}) => this._renderItem(item)}
          />
        </View>
        <View style={{flex:1}}>
          <AddNewContactItem
          />
        </View>
      </View>
    )
  }
}

export default Contacts;