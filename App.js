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
    this.hasMoved = false;
    this.justMoved = false;
    this.type = "pawn";
    if(this.color == "white"){
      this.img = require("./photos/wPawn.png")
    }
    else{
      this.img = require("./photos/bPawn.png")
    }
  }
  move = (board, update) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    // prerequesits to moving: must be your turn, king must be safe
    var startX = this.curPosition[0];
    var startY = this.curPosition[1];
    if(this.curPosition[0] != 0  && this.curPosition[0] != 7){
      if(!this.hasMoved){
        if(this.color == "white"){
          if(board[startX - 1][startY].curPiece == "none"){
            board[startX - 1][startY].posSquare = true;
            board[startX - 1][startY].movingPiece = this;
            if(board[startX - 2][startY].curPiece == "none"){
              board[startX - 2][startY].posSquare = true;
              board[startX - 2][startY].movingPiece = this;
            }
          }
        }
        else{
          if(board[startX + 1][startY].curPiece == "none"){
            board[startX + 1][startY].posSquare = true;
            board[startX + 1][startY].movingPiece = this;
            if(board[startX + 2][startY].curPiece == "none"){
              board[startX + 2][startY].posSquare = true;
              board[startX + 2][startY].movingPiece = this;
            }
          }
        }
      }
      else{
        if(this.color == "white"){
          if(board[startX - 1][startY].curPiece == "none" ){
            board[startX - 1][startY].posSquare = true;
            board[startX - 1][startY].movingPiece = this;
          }
        }
        else{
          if(board[startX + 1][startY].curPiece == "none"){
            board[startX + 1][startY].posSquare = true;
            board[startX + 1][startY].movingPiece = this;
          }
        }
      }
    
    if(this.curPosition[1] != 0 && this.curPosition[1] != 7){
      if(this.color == 'white'){
        if(board[startX - 1][startY + 1].curPiece != "none"  && board[startX - 1][startY+ 1].curPiece.color != this.color){
          board[startX - 1][startY + 1].posSquare = true;
          board[startX - 1][startY + 1].movingPiece = this;
        }
        if(board[startX - 1][startY - 1].curPiece != "none"  && board[startX - 1][startY - 1].curPiece.color != this.color){
          board[startX - 1][startY - 1].posSquare = true;
          board[startX - 1][startY - 1].movingPiece = this;
        }
      }
      else if(this.color == 'black'){
        if(board[startX + 1][startY + 1].curPiece != "none" && board[startX +1 ][startY + 1].curPiece.color != this.color){
          board[startX + 1][startY + 1].posSquare = true;
          board[startX + 1][startY + 1].movingPiece = this;
        }
        if(board[startX + 1][startY - 1].curPiece != "none"  && board[startX +1 ][startY - 1].curPiece.color != this.color){
          board[startX + 1][startY - 1].posSquare = true;
          board[startX + 1][startY - 1].movingPiece = this;
        }
      }
    }
    else if(this.curPosition[1] == 0){
      if(this.color == 'white'){
        if(board[startX - 1][startY + 1].curPiece != "none"  && board[startX - 1][startY + 1].curPiece.color != this.color){
          board[startX - 1][startY + 1].posSquare = true;
          board[startX - 1][startY + 1].movingPiece = this;
        }
      }
      else if(this.color == 'black'){
        if(board[startX + 1][startY + 1].curPiece != "none"  && board[startX + 1][startY +1].curPiece.color != this.color){
          board[startX + 1][startY + 1].posSquare = true;
          board[startX + 1][startY + 1].movingPiece = this;
        }
      }
    } 
    else{
      if(this.color == 'white'){
        if(board[startX - 1][startY - 1].curPiece != "none"  && board[startX - 1][startY - 1].curPiece.color != this.color){
          board[startX - 1][startY - 1].posSquare = true;
          board[startX - 1][startY - 1].movingPiece = this;
        }
      }
      else if(this.color == 'black'){
        if(board[startX + 1][startY - 1].curPiece != "none"  && board[startX + 1][startY - 1].curPiece.color != this.color){
          board[startX + 1][startY - 1].posSquare = true;
          board[startX + 1][startY - 1].movingPiece = this;
        }
      }
    }
  }

  // en passant
  // separate for my own sanity
  if(this.color == 'white'){
    if(this.curPosition[0] == 3){
      if(this.curPosition[1] < 7 && this.curPosition[1] > 0){
        if(board[startX][startY - 1].curPiece != "none"){
          if(board[startX][startY - 1].curPiece.type == "pawn" && board[startX][startY - 1].curPiece.justMoved == true){
            board[startX - 1][startY - 1].posSquare = true;
            board[startX - 1][startY - 1].movingPiece = this;
            board[startX - 1][startY - 1].enPassant = board[startX][startY - 1].curPiece;
          }
        }
        if(board[startX][startY + 1].curPiece != "none"){
          if(board[startX][startY + 1].curPiece.type == "pawn" && board[startX][startY + 1].curPiece.justMoved == true){
            board[startX - 1][startY + 1].posSquare = true;
            board[startX - 1][startY + 1].movingPiece = this;
            board[startX - 1][startY + 1].enPassant = board[startX][startY + 1].curPiece;
          }
        }
      }
      else if(this.curPosition[1] == 0){
        if(board[startX][startY + 1].curPiece != "none"){
          if(board[startX][startY + 1].curPiece.type == "pawn" && board[startX][startY + 1].curPiece.justMoved == true){
            board[startX - 1][startY + 1].posSquare = true;
            board[startX - 1][startY + 1].movingPiece = this;
            board[startX - 1][startY + 1].enPassant = board[startX][startY + 1].curPiece;
          }
        }
      }
      else if(this.curPosition[1] == 7){
        if(board[startX][startY - 1].curPiece != "none"){
          if(board[startX][startY - 1].curPiece.type == "pawn" && board[startX][startY - 1].curPiece.justMoved == true){
            board[startX - 1][startY - 1].posSquare = true;
            board[startX - 1][startY - 1].movingPiece = this;
            board[startX - 1][startY - 1].enPassant = board[startX][startY - 1].curPiece;
          }
        }
      }

    }
  }
  else{
    if(this.curPosition[0] == 4){
      if(this.curPosition[1] < 7 && this.curPosition[1] > 0){
        if(board[startX][startY - 1].curPiece != "none"){
          if(board[startX][startY - 1].curPiece.type == "pawn" && board[startX][startY - 1].curPiece.justMoved == true){
            board[startX + 1][startY - 1].posSquare = true;
            board[startX + 1][startY - 1].movingPiece = this;
            board[startX + 1][startY - 1].enPassant = board[startX][startY - 1].curPiece;
          }
        }
        if(board[startX][startY + 1].curPiece != "none"){
          if(board[startX][startY + 1].curPiece.type == "pawn" && board[startX][startY + 1].curPiece.justMoved == true){
            board[startX + 1][startY + 1].posSquare = true;
            board[startX + 1][startY + 1].movingPiece = this;
            board[startX + 1][startY + 1].enPassant = board[startX][startY + 1].curPiece;
          }
        }
      }
      else if(this.curPosition[1] == 0){
        if(board[startX][startY + 1].curPiece != "none"){
          if(board[startX][startY + 1].curPiece.type == "pawn" && board[startX][startY + 1].curPiece.justMoved == true){
            board[startX + 1][startY + 1].posSquare = true;
            board[startX + 1][startY + 1].movingPiece = this;
            board[startX + 1][startY + 1].enPassant = board[startX][startY + 1].curPiece;
          }
        }
      }
      else if(this.curPosition[1] == 7){
        if(board[startX][startY - 1].curPiece != "none"){
          if(board[startX][startY - 1].curPiece.type == "pawn" && board[startX][startY - 1].curPiece.justMoved == true){
            board[startX + 1][startY - 1].posSquare = true;
            board[startX + 1][startY - 1].movingPiece = this;
            board[startX + 1][startY - 1].enPassant = board[startX][startY - 1].curPiece;
          }
        }
      }

    }
  }

    update();
  }
}

class Knight {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wKnight.png")
    }
    else{
      this.img = require("./photos/bKnight.png")
    }
  }
  move = (board, update) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    var startX = this.curPosition[0];
    var startY = this.curPosition[1];
      // vertical
    if(((startX - 2) >= 0) && ((startY - 1) >= 0)){
      if((board[startX - 2][startY - 1].curPiece != 'none' && 
        board[startX - 2][startY - 1].curPiece.color != this.color) 
        || (board[startX - 2][startY - 1].curPiece == 'none')){

        board[startX - 2][startY - 1].posSquare = true;
        board[startX - 2][startY - 1].movingPiece = this;
      }
    }
    if(((startX - 2) >= 0) && ((startY + 1) <= 7)){
      if((board[startX - 2][startY + 1].curPiece != 'none' && 
        board[startX - 2][startY + 1].curPiece.color != this.color) 
        || (board[startX - 2][startY + 1].curPiece == 'none')){

        board[startX - 2][startY + 1].posSquare = true;
        board[startX - 2][startY + 1].movingPiece = this;
      }
    }

    if(((startX + 2) <= 7) && ((startY - 1) >= 0)){
      if((board[startX + 2][startY - 1].curPiece != 'none' && 
        board[startX + 2][startY - 1].curPiece.color != this.color) 
        || (board[startX + 2][startY - 1].curPiece == 'none')){

        board[startX + 2][startY - 1].posSquare = true;
        board[startX + 2][startY - 1].movingPiece = this;
      }
    }
    if(((startX + 2) <= 7) && ((startY + 1) <= 7)){
      if((board[startX + 2][startY + 1].curPiece != 'none' && 
      board[startX + 2][startY + 1].curPiece.color != this.color) 
      || (board[startX + 2][startY + 1].curPiece == 'none')){

        board[startX + 2][startY + 1].posSquare = true;
        board[startX + 2][startY + 1].movingPiece = this;
      }
    }
    // horizontal 
    if(((startX - 1) >= 0) && ((startY - 2) >= 0)){
      if((board[startX - 1][startY - 2].curPiece != 'none' && 
        board[startX - 1][startY - 2].curPiece.color != this.color) 
        || (board[startX - 1][startY - 2].curPiece == 'none')){

        board[startX - 1][startY - 2].posSquare = true;
        board[startX - 1][startY - 2].movingPiece = this;
      }
    }
    if(((startX - 1) >= 0) && ((startY + 2) <= 7)){
      if((board[startX - 1][startY + 2].curPiece != 'none' && 
        board[startX - 1][startY + 2].curPiece.color != this.color) 
        || (board[startX - 1][startY + 2].curPiece == 'none')){

        board[startX - 1][startY + 2].posSquare = true;
        board[startX - 1][startY + 2].movingPiece = this;
      }
    }

    if(((startX + 1) <= 7) && ((startY - 2) >= 0)){
      if((board[startX + 1][startY - 2].curPiece != 'none' && 
        board[startX + 1][startY - 2].curPiece.color != this.color) 
        || (board[startX + 1][startY - 2].curPiece == 'none')){

        board[startX + 1][startY - 2].posSquare = true;
        board[startX + 1][startY - 2].movingPiece = this;
      }
    }
    if(((startX + 1) <= 7) && ((startY + 2) <= 7)){
      if((board[startX + 1][startY + 2].curPiece != 'none' && 
      board[startX + 1][startY + 2].curPiece.color != this.color) 
      || (board[startX + 1][startY + 2].curPiece == 'none')){

        board[startX + 1][startY + 2].posSquare = true;
        board[startX + 1][startY + 2].movingPiece = this;
      }
    }
    
   update();
  }
}

class Bishop {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wBishop.png")
    }
    else{
      this.img = require("./photos/bBishop.png")
    }
  }
  move = (board, update) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    var startX = this.curPosition[0];
    var startY = this.curPosition[1];

    var tempX = startX;
    var tempY = startY;
    while(tempX < 7 && tempY < 7){
      tempX++
      tempY++
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }

    var tempX = startX;
    var tempY = startY;
    while(tempX < 7 && tempY > 0){
      tempX++
      tempY--
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }

    var tempX = startX;
    var tempY = startY;
    while(tempX > 0 && tempY >0 ){
      tempX--;
      tempY--;
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }

    var tempX = startX;
    var tempY = startY;
    while(tempX > 0 && tempY < 7){
      tempX--
      tempY++
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }
    update();
  }
}

class Rook {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wRook.png")
    }
    else{
      this.img = require("./photos/bRook.png")
    }
  }
  move = (board, update) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    var startX = this.curPosition[0];
    var startY = this.curPosition[1];

    var tempX = startX;
    while(tempX < 7){
      tempX++;
      if((board[tempX][startY].curPiece != 'none' 
      && board[tempX][startY].curPiece.color != this.color) 
      || (board[tempX][startY].curPiece == 'none')){
        board[tempX][startY].posSquare = true;
        board[tempX][startY].movingPiece = this;
      }

      if(board[tempX][startY].curPiece != 'none'){
        break;
      }
    }
    var tempX = startX;
    while(tempX > 0){
      tempX--;
      if((board[tempX][startY].curPiece != 'none' 
      && board[tempX][startY].curPiece.color != this.color) 
      || (board[tempX][startY].curPiece == 'none')){
        board[tempX][startY].posSquare = true;
        board[tempX][startY].movingPiece = this;
      }

      if(board[tempX][startY].curPiece != 'none'){
        break;
      }
    }
    var tempY = startY;
    while(tempY > 0){
      tempY--;
      if((board[startX][tempY].curPiece != 'none' 
      && board[startX][tempY].curPiece.color != this.color) 
      || (board[startX][tempY].curPiece == 'none')){
        board[startX][tempY].posSquare = true;
        board[startX][tempY].movingPiece = this;
      }

      if(board[startX][tempY].curPiece != 'none'){
        break;
      }
    }
    var tempY = startY;
    while(tempY < 7){
      tempY++;
      if((board[startX][tempY].curPiece != 'none' 
      && board[startX][tempY].curPiece.color != this.color) 
      || (board[startX][tempY].curPiece == 'none')){
        board[startX][tempY].posSquare = true;
        board[startX][tempY].movingPiece = this;
      }

      if(board[startX][tempY].curPiece != 'none'){
        break;
      }
    }
    update();
  }
}

class Queen {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wQueen.png")
    }
    else{
      this.img = require("./photos/bQueen.png")
    }
  }
  move = (board, update) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    var startX = this.curPosition[0];
    var startY = this.curPosition[1];

    var tempX = startX;
    var tempY = startY;
    while(tempX < 7 && tempY < 7){
      tempX++
      tempY++
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }

    var tempX = startX;
    var tempY = startY;
    while(tempX < 7 && tempY > 0){
      tempX++
      tempY--
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }

    var tempX = startX;
    var tempY = startY;
    while(tempX > 0 && tempY >0 ){
      tempX--;
      tempY--;
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }

    var tempX = startX;
    var tempY = startY;
    while(tempX > 0 && tempY < 7){
      tempX--
      tempY++
      if((board[tempX][tempY].curPiece != 'none' 
      && board[tempX][tempY].curPiece.color != this.color) 
      || (board[tempX][tempY].curPiece == 'none')){

        board[tempX][tempY].posSquare = true;
        board[tempX][tempY].movingPiece = this;
      }
      if(board[tempX][tempY].curPiece != 'none'){
        break;
      }
    }
    var startX = this.curPosition[0];
    var startY = this.curPosition[1];

    var tempX = startX;
    var tempY = startY;
    while(tempX < 7){
      tempX++;
      if((board[tempX][startY].curPiece != 'none' 
      && board[tempX][startY].curPiece.color != this.color) 
      || (board[tempX][startY].curPiece == 'none')){
        board[tempX][startY].posSquare = true;
        board[tempX][startY].movingPiece = this;
      }

      if(board[tempX][startY].curPiece != 'none'){
        break;
      }
    }
    var tempX = startX;
    while(tempX > 0){
      tempX--;
      if((board[tempX][startY].curPiece != 'none' 
      && board[tempX][startY].curPiece.color != this.color) 
      || (board[tempX][startY].curPiece == 'none')){
        board[tempX][startY].posSquare = true;
        board[tempX][startY].movingPiece = this;
      }

      if(board[tempX][startY].curPiece != 'none'){
        break;
      }
    }
    var tempY = startY;
    while(tempY > 0){
      tempY--;
      if((board[startX][tempY].curPiece != 'none' 
      && board[startX][tempY].curPiece.color != this.color) 
      || (board[startX][tempY].curPiece == 'none')){
        board[startX][tempY].posSquare = true;
        board[startX][tempY].movingPiece = this;
      }

      if(board[startX][tempY].curPiece != 'none'){
        break;
      }
    }
    var tempY = startY;
    while(tempY < 7){
      tempY++;
      if((board[startX][tempY].curPiece != 'none' 
      && board[startX][tempY].curPiece.color != this.color) 
      || (board[startX][tempY].curPiece == 'none')){
        board[startX][tempY].posSquare = true;
        board[startX][tempY].movingPiece = this;
      }

      if(board[startX][tempY].curPiece != 'none'){
        break;
      }
    }
    update();
  }
}

class King {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wKing.png")
    }
    else{
      this.img = require("./photos/bKing.png")
    }
  }
  move = () => {
    console.log("this is a " + this.color + "king")
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
  }

  movePiece = () => {
    var flag = false;
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        if(this.props.board[i][j].curPiece == this.props.movingPiece){
          if(this.props.board[this.props.position[0]][this.props.position[1]].curPiece != 'none'){
            this.props.board[this.props.position[0]][this.props.position[1]].curPiece.inPlay = false;
          }
          this.props.board[this.props.position[0]][this.props.position[1]].curPiece = this.props.board[i][j].curPiece;
          this.props.board[i][j].curPiece = "none";

          flag = true;
          break;
        }
      }
      if(flag){break};
    }
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        this.props.board[i][j].posSquare = false;
        if(this.props.board[i][j].curPiece != "none"){
          this.props.board[i][j].curPiece.justMoved = false;
          if(this.props.board[i][j].curPiece == this.props.enPassant){
            this.props.board[i][j].curPiece.inPlay = false;
            this.props.board[i][j].curPiece = "none";
            this.enPassant = "none";
          }
        }
      }
    }
    if(this.props.movingPiece.type == "pawn" && this.props.movingPiece.hasMoved == false){
      this.props.movingPiece.justMoved = true;
    }
    this.props.movingPiece.hasMoved = true;
    this.props.movingPiece.curPosition = this.props.position;
    this.props.updateBoard();

  }

  returnImg = () => {

    if(this.props.curPiece != 'none'){
      this.state.imgComp = 
        <TouchableHighlight onPress = {() => this.props.curPiece.move(this.props.board, this.props.updateBoard)}>
          <Image style = {styles.imageSquare} source = {this.props.curPiece.img} />
        </TouchableHighlight>;
      if(this.props.posSquare){
        this.state.imgComp =
        <TouchableHighlight onPress = {() => this.movePiece()}>
          <View style={[styles.gameSquare, {backgroundColor: "#00FFFFAE"}]}>
            <Image style = {styles.imageSquare} source = {this.props.curPiece.img} />
          </View>
        </TouchableHighlight>;
      }

    }
    else{
      this.state.imgComp = <View></View>;
      if(this.props.posSquare){
        this.state.imgComp =
        <TouchableHighlight onPress = {() => this.movePiece()}>
          <View style={[styles.gameSquare, {backgroundColor: "#00FFFFAE"}]}>
          </View>
        </TouchableHighlight>;
      }
    }
    return this.state.imgComp;

  }

  render(){
 
    return(

      <View style={[styles.gameSquare, {backgroundColor: this.state.color}]}>
            {this.returnImg()}
      </View>

    );

  }

}

class GameBoard extends Component {

  constructor(props){
    super(props);
    this.state = {

      curPlayer : "white",
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
        this.state.grid[i][j].posSquare = false;
        this.state.grid[i][j].enPassant = "none";
        this.state.grid[i][j].position = [i,j]; // im pretty sure there is a. smart way to do this. eh
        if(squareColor == "white"){
          squareColor = 'black';
        }
        else{ 
          squareColor = 'white';
        }
      }

    }
    
    this.state.whitePieces = [
      new Rook('white'),
      new Knight('white'),
      new Bishop('white'),
      new Queen('white'),
      new King('white'),
      new Bishop('white'),
      new Knight('white'),
      new Rook('white'),
    ];

    this.state.blackPieces = [
      new Rook('black'),
      new Knight('black'),
      new Bishop('black'),
      new Queen('black'),
      new King('black'),
      new Bishop('black'),
      new Knight('black'),
      new Rook('black'),
    ];

    // this is filling the game board with the initial values
    for(var i = 0; i < 8; i++){
      
      var whitePawn = new Pawn('white');
      var blackPawn = new Pawn('black');

      this.state.whitePieces.push(whitePawn);
      this.state.blackPieces.push(blackPawn);

      this.state.grid[7][i].curPiece = this.state.whitePieces[i];
      this.state.grid[6][i].curPiece = whitePawn;

      this.state.grid[0][i].curPiece = this.state.blackPieces[i];
      this.state.grid[1][i].curPiece = blackPawn;

    }
    for(var i = 0; i < 8; i ++){

      for(var j = 0; j < 8; j++){
        if(this.state.grid[i][j].curPiece != 'none'){
          this.state.grid[i][j].curPiece.curPosition = this.state.grid[i][j].position;
        }
      }

    }


  }
  
  updateBoard = () => {

    this.setState({});
    
  }
  render(){

    return(
      <View style={styles.gameBoard}>
        {this.state.grid.map((obj) => 
          obj.map((nestedObj) =>
           <GameSquare
            {...nestedObj}
            board = {this.state.grid}
            updateBoard = {this.updateBoard}
            player = {this.state.curPlayer}
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
