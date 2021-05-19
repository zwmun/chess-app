import React, { Component, useRef, useEffect } from 'react';
import { AppRegistry, Text, View, ScrollView, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, Animated } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


class Pawn {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wPawn.png")
    }
    else{
      this.img = require("./photos/bPawn.png")
    }
  }
  move = () => {
    


  }
}

class GameSquare extends Component {

  constructor(props){
    super(props);
    this.state = {
      color : this.props.color,
      imgComp : <View></View>,
    };
    if(this.state.color == "black"){
      this.state.color = "gray";
    }
    if(this.props.curPiece != 'none'){
      this.state.imgComp = <Image style = {styles.imageSquare} source = {this.props.curPiece.img} />
    }
  }

  render(){
 
    return(

      <View style={[styles.gameSquare, {backgroundColor: this.state.color}]}>
        {this.state.imgComp}
      </View>

    );

  }

}

class GameBoard extends Component {

  constructor(props){
    super(props);
    this.state = {

      grid: [],
      whitePieces: [],
      blackPieces: [],

    };

    // this is initializing the game board
    for(var i = 0; i < 8; i ++){
      this.state.grid[i] = [];
      var squareColor = "white"
      if(i%2 == 1){
        squareColor = "black"
      }
      for(var j = 0; j < 8; j ++){

        this.state.grid[i][j] = {};
        this.state.grid[i][j].color = squareColor;
        this.state.grid[i][j].curPiece = "none";
        if(squareColor == "white"){
          squareColor = 'black';
        }
        else{ 
          squareColor = 'white';
        }
      }

    }
    // this is filling the game board with the initial values
    for(var i = 0; i < 8; i++){
      
      var whitePawn = new Pawn('white');
      var blackPawn = new Pawn('black');

      this.state.whitePieces.push(whitePawn);
      this.state.blackPieces.push(blackPawn);

      this.state.grid[6][i].curPiece = whitePawn;
      this.state.grid[1][i].curPiece = blackPawn;

    }


  }
  
  render(){

    return(
      <View style={styles.gameBoard}>
        {this.state.grid.map((obj) => 
          obj.map((nestedObj) =>
           <GameSquare
            {...nestedObj}
          /> 
          )
        )}
      </View>
    );

  }

}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <GameBoard>
        </GameBoard>

      </View>
      <View style={styles.navBar}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  content: {
    flex: 7,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flex: 1,
    backgroundColor: 'red',
  },
  gameBoard: {
    width: deviceWidth * 8/9, /* i'd like each square to be 1/9 of the screen, with 1/18 spacing oneach side of the board*/
    height: deviceWidth * 8/9, /* NOTE: this currently won't work with the device turned sideways, add a way to choose the shortest side later */
    backgroundColor: 'orange',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  gameSquare: {
    width: deviceWidth * 1/9,
    height: deviceWidth * 1/9,
    backgroundColor: 'yellow'
  },
  imageSquare: {
    width: deviceWidth * 1/9,
    height: deviceWidth * 1/9,
  },
});
