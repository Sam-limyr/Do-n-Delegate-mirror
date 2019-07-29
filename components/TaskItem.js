import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from 'react-native-elements';
import {getDate, getTime, dateObjectEquality } from '../functions/HelperFunctions';
 
class TaskItem extends Component {
  state = {
  };

  _onSelectTask = () => {
    let item = this.props.item;
    let navLink = this.props.navLink;
    let localDeleteTask = this.props.localDeleteTask;
    console.log("hello");
    this.props.navigation.navigate(navLink.toString(), {item, localDeleteTask})
  }
 
  render() {
    return (
      <ListItem
        containerStyle={ {backgroundColor: "#FBF9F9"}}
        bottomDivider={true}
        title={`${this.props.item.name}`}
        subtitle={`By: ${this.props.item.employer_name}`}
        rightTitle={getDate(this.props.item.due_date)}
        rightTitleStyle={{ color: 'red' }}
        rightSubtitle={getTime(this.props.item.due_date)}
        rightSubtitleStyle={{ color: 'red' }}
        onPress={this._onSelectTask}
      />
    )
  }
}

export default TaskItem;

