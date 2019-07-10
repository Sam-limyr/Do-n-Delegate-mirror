import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import DialogBox from '../components/DialogBox';

class Delegate extends Component {
  
  render() {
    return (
      <View>
        <View>
          <FlatList
            data={[{ name: "Bob"}, { name: "Tim"}]}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({item}) => 
              <ListItem 
                roundAvatar
                avatar = {{}}
                title = {item.name}
              />
            }
          />
        </View>

        <View>
          <DialogBox />
        </View>
      </View>
    );
  }
}

export default Delegate;