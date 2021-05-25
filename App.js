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
  move = (board, update, pruneMoves, turn, checkCastlingKingside, checkCastlingQueenside) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    if(this.color == turn){
      
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
      pruneMoves(this);
      update();
    }
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
  move = (board, update, pruneMoves, turn, checkCastlingKingside, checkCastlingQueenside) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    if(this.color == turn){
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
      pruneMoves(this);
      update();
    }
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
  move = (board, update, pruneMoves, turn, checkCastlingKingside, checkCastlingQueenside) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    if(this.color == turn){
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
      pruneMoves(this);
      update();
    }
  }
}

class Rook {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.hasMoved = false;
    this.curPosition;
    if(this.color == "white"){
      this.img = require("./photos/wRook.png")
    }
    else{
      this.img = require("./photos/bRook.png")
    }
  }
  move = (board, update, pruneMoves, turn, checkCastlingKingside, checkCastlingQueenside) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    if(this.color == turn){
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
      pruneMoves(this)
      update();
    }
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
  move = (board, update, pruneMoves, turn, checkCastlingKingside, checkCastlingQueenside) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    if(this.color == turn){
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
      pruneMoves(this)
      update();
    }
  }
}

class King {
  constructor(color){
    this.color = color;
    this.inPlay = true;
    this.img;
    this.curPosition;
    this.type = 'king'
    this.hasMoved = false;
    if(this.color == "white"){
      this.img = require("./photos/wKing.png")
    }
    else{
      this.img = require("./photos/bKing.png")
    }
  }
  move = (board, update, pruneMoves, turn, checkCastlingKingside, checkCastlingQueenside) => {
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        board[i][j].posSquare = false;
      }
    }
    if(this.color == turn){
      var startX = this.curPosition[0];
      var startY = this.curPosition[1];
      
      if(((startX - 1) >= 0) && ((startY - 1) >= 0)){
        if((board[startX - 1][startY - 1].curPiece != 'none' && 
          board[startX - 1][startY - 1].curPiece.color != this.color) 
          || (board[startX - 1][startY - 1].curPiece == 'none')){

          board[startX - 1][startY - 1].posSquare = true;
          board[startX - 1][startY - 1].movingPiece = this;
        }
      }
      if(((startX + 1) <= 7) && ((startY - 1) >= 0)){
        if((board[startX + 1][startY - 1].curPiece != 'none' && 
          board[startX + 1][startY - 1].curPiece.color != this.color) 
          || (board[startX + 1][startY - 1].curPiece == 'none')){

          board[startX + 1][startY - 1].posSquare = true;
          board[startX + 1][startY - 1].movingPiece = this;
        }
      }
      if(((startX - 1) >= 0) && ((startY + 1) <= 7)){
        if((board[startX - 1][startY + 1].curPiece != 'none' && 
          board[startX - 1][startY + 1].curPiece.color != this.color) 
          || (board[startX - 1][startY + 1].curPiece == 'none')){

          board[startX - 1][startY + 1].posSquare = true;
          board[startX - 1][startY + 1].movingPiece = this;
        }
      }
      if(((startX + 1) <= 7) && ((startY + 1) <= 7)){
        if((board[startX + 1][startY + 1].curPiece != 'none' && 
          board[startX + 1][startY + 1].curPiece.color != this.color) 
          || (board[startX + 1][startY + 1].curPiece == 'none')){

          board[startX + 1][startY + 1].posSquare = true;
          board[startX + 1][startY + 1].movingPiece = this;
        }
      }
      if(((startX + 1) <= 7)){
        if((board[startX + 1][startY].curPiece != 'none' && 
          board[startX + 1][startY].curPiece.color != this.color) 
          || (board[startX + 1][startY].curPiece == 'none')){

          board[startX + 1][startY].posSquare = true;
          board[startX + 1][startY].movingPiece = this;
        }
      }
      if(((startX - 1) >= 0)){
        if((board[startX - 1][startY].curPiece != 'none' && 
          board[startX - 1][startY].curPiece.color != this.color) 
          || (board[startX - 1][startY].curPiece == 'none')){

          board[startX - 1][startY].posSquare = true;
          board[startX - 1][startY].movingPiece = this;
        }
      }
      if(((startY + 1) <= 7)){
        if((board[startX][startY + 1].curPiece != 'none' && 
          board[startX][startY + 1].curPiece.color != this.color) 
          || (board[startX][startY + 1].curPiece == 'none')){

          board[startX][startY + 1].posSquare = true;
          board[startX][startY + 1].movingPiece = this;
        }
      }
      if(((startY - 1) >= 0)){
        if((board[startX][startY - 1].curPiece != 'none' && 
          board[startX][startY - 1].curPiece.color != this.color) 
          || (board[startX][startY - 1].curPiece == 'none')){

          board[startX][startY - 1].posSquare = true;
          board[startX][startY - 1].movingPiece = this;
        }
      }
      if(checkCastlingKingside(this.color) == true){
        this.canCastleKingside = true;
        if(this.color == "white"){
          board[7][6].posSquare = true;
          board[7][6].movingPiece = this;
        }
        else{
          board[0][6].posSquare = true;
          board[0][6].movingPiece = this;
        }
      }
      else{
        this.canCastleKingside = false;
      }
      if(checkCastlingQueenside(this.color) == true){
        this.canCastleQueenside = true;
        if(this.color == "white"){
          board[7][2].posSquare = true;
          board[7][2].movingPiece = this;
        }
        else{
          board[0][2].posSquare = true;
          board[0][2].movingPiece = this;
        }
      }
      else{
        this.canCastleQueenside = false;
      }
      pruneMoves(this)
      update();
    }
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
          if(this.props.movingPiece.color == 'white'){
            if(this.props.movingPiece.type == "king" && this.props.movingPiece.canCastleKingside && this.props.position == this.props.board[7][6].position){
              
              this.props.board[7][5].curPiece = this.props.board[7][7].curPiece;
              this.props.board[7][5].curPiece.curPosition = this.props.board[7][5].position;
              this.props.board[7][7].curPiece = 'none';
            }
            if(this.props.movingPiece.type == "king" && this.props.movingPiece.canCastleQueenside && this.props.position == this.props.board[7][2].position){
              
              this.props.board[7][3].curPiece = this.props.board[7][0].curPiece;
              this.props.board[7][3].curPiece.curPosition = this.props.board[7][3].position;
              this.props.board[7][0].curPiece = 'none';
            }
          }
          else{
            if(this.props.movingPiece.type == "king" && this.props.movingPiece.canCastleKingside && this.props.position == this.props.board[0][6].position){
              this.props.board[0][5].curPiece = this.props.board[0][7].curPiece;
              this.props.board[0][5].curPiece.curPosition = this.props.board[0][5].position;
              this.props.board[0][7].curPiece = 'none';
            }
            if(this.props.movingPiece.type == "king" && this.props.movingPiece.canCastleQueenside && this.props.position == this.props.board[0][2].position){
              
              this.props.board[0][3].curPiece = this.props.board[0][0].curPiece;
              this.props.board[0][3].curPiece.curPosition = this.props.board[0][3].position;
              this.props.board[0][0].curPiece = 'none';
            }
          }
          
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
    
    if(this.props.movingPiece.type == "pawn"){
      if(this.props.movingPiece.curPosition[0] == 0 && this.props.movingPiece.color == "white"){
        var newPiece = new Queen("white");
        this.props.board[this.props.movingPiece.curPosition[0]][this.props.movingPiece.curPosition[1]].inPlay = false;
        this.props.board[this.props.movingPiece.curPosition[0]][this.props.movingPiece.curPosition[1]].curPiece = newPiece;
        this.props.board[this.props.movingPiece.curPosition[0]][this.props.movingPiece.curPosition[1]].curPiece.curPosition = this.props.movingPiece.curPosition
        this.props.addPiece("white", newPiece)
      }
    }
    if(this.props.movingPiece.type == "pawn"){
      if(this.props.movingPiece.curPosition[0] == 7 && this.props.movingPiece.color == "black"){
        var newPiece = new Queen("black");
        this.props.board[this.props.movingPiece.curPosition[0]][this.props.movingPiece.curPosition[1]].inPlay = false;
        this.props.board[this.props.movingPiece.curPosition[0]][this.props.movingPiece.curPosition[1]].curPiece = newPiece;
        this.props.board[this.props.movingPiece.curPosition[0]][this.props.movingPiece.curPosition[1]].curPiece.curPosition = this.props.movingPiece.curPosition
        this.props.addPiece("black", newPiece)
      }
    }
    this.props.updateBoard();
    this.props.changePlayer();
  }

  returnImg = () => {

    if(this.props.curPiece != 'none'){
      this.state.imgComp = 
        <TouchableHighlight onPress = {() => 
        this.props.curPiece.move(this.props.board, this.props.updateBoard, this.props.pruneMoves, this.props.player, 
                              this.props.checkCastlingKingside, this.props.checkCastlingQueenside)
        }>
          <Image style = {styles.imageSquare} source = {this.props.curPiece.img} />
        </TouchableHighlight>;
      if(this.props.posSquare){
        this.state.imgComp =
        <TouchableHighlight onPress = {() => this.movePiece()}>
          <View style={[styles.gameSquare, {backgroundColor: "#00FFFF30"}]}>
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
          <View style={[styles.gameSquare, {backgroundColor: "#00FFFF30"}]}>
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
      whiteKing : new King('white'),
      blackKing : new King('black'),

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
      this.state.whiteKing,
      new Bishop('white'),
      new Knight('white'),
      new Rook('white'),
    ];

    this.state.blackPieces = [
      new Rook('black'),
      new Knight('black'),
      new Bishop('black'),
      new Queen('black'),
      this.state.blackKing,
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
  
  pruneMoves = (piece) => {
    var curPos = [];
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j++){
        if(this.state.grid[i][j].posSquare == true){
          curPos.push(this.state.grid[i][j].position);
        }
      }
    }
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        if(this.state.grid[i][j].posSquare == true){
          var origPosition = [];
          origPosition[0] = piece.curPosition[0];
          origPosition[1] = piece.curPosition[1];
          var fillerPiece = this.state.grid[i][j].curPiece; // we need to keep track of this piece
          if(this.state.grid[i][j].curPiece != "none" && this.state.grid[i][j].curPiece.color != piece.color){
            //if there is a piece in this square and it's not our color, we need to operate as if it is not inplay, otherwise we wont be able to take it
            this.state.grid[i][j].curPiece.inPlay = false; //THIS VALUE MUST BE FIXED
          }

          //SET UP THE HYPOTHETICAL
          this.state.grid[piece.curPosition[0]][piece.curPosition[1]].curPiece = "none"; // we cant set up the hypothetical without first moving out piece
          this.state.grid[i][j].curPiece = piece; // setting up a hypothetical to see if it would stop check
          this.state.grid[i][j].curPiece.curPosition = this.state.grid[i][j].position; // have to adjust the position 
          //THESE VALUES MUST BE FIXED ^^^^
          if(this.kingSafety(piece.color) != true){ //running the hypothetical
            this.state.grid[i][j].posSquare = false;
            this.state.grid[i][j].movingPiece = 'none';
            curPos.splice((curPos.indexOf(this.state.grid[i][j].position)), 1)
          }
          for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
            this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
            this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = piece;
          }
          this.state.grid[i][j].curPiece = fillerPiece;
          if(this.state.grid[i][j].curPiece != 'none'){
            this.state.grid[i][j].curPiece.inPlay = true; 
            this.state.grid[i][j].curPiece.curPosition = this.state.grid[i][j].position;
          }
          this.state.grid[origPosition[0]][origPosition[1]].curPiece = piece;
          this.state.grid[origPosition[0]][origPosition[1]].curPiece.curPosition = this.state.grid[origPosition[0]][origPosition[1]].position;
          
        }
      }
    }
  }

  changePlayer = () => {
    if(this.state.curPlayer == "white"){
      this.state.curPlayer = 'black';
    }
    else{
      this.state.curPlayer = "white"
    }
    this.updateBoard();
  };

  castlingQueenside = (color) => {
    var curPos = [];
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j++){
        if(this.state.grid[i][j].posSquare == true){
          curPos.push(this.state.grid[i][j].position);
        }
      }
    }
    if(color == "white"){
      if(!this.state.whiteKing.hasMoved && !this.state.grid[7][0].curPiece.hasMoved){
        if(this.state.grid[7][1].curPiece == 'none' && this.state.grid[7][2].curPiece == 'none' && this.state.grid[7][3].curPiece == 'none'){
          var curKingPos = [];
          curKingPos[0] = this.state.whiteKing.curPosition[0];
          curKingPos[1] = this.state.whiteKing.curPosition[1];
          if(this.kingSafety("white")){
            this.state.grid[curKingPos[0]][curKingPos[1]].curPiece = 'none';
            this.state.grid[7][3].curPiece = this.state.whiteKing;
            this.state.whiteKing.curPosition =  this.state.grid[7][3].position;
            if(this.kingSafety("white")){
              this.state.grid[7][3].curPiece = 'none';
              this.state.grid[7][2].curPiece = 'none';
              this.state.grid[7][2].curPiece = this.state.whiteKing;
              this.state.whiteKing.curPosition =  this.state.grid[7][2].position;
              if(this.kingSafety("white")){
                this.state.grid[7][3].curPiece = 'none';
                this.state.grid[7][2].curPiece = 'none';
                this.state.whiteKing.curPosition = curKingPos;
                for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
                  this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
                  this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.whiteKing;
                }
                return true;
              }
            }
          }
          this.state.grid[7][3].curPiece = 'none';
          this.state.grid[7][2].curPiece = 'none';
          this.state.whiteKing.curPosition = curKingPos;
        }
      }
      for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
        this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
        this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.whiteKing;
      }
    }
    else{
      if(!this.state.blackKing.hasMoved && !this.state.grid[0][7].curPiece.hasMoved){
        if(this.state.grid[0][1].curPiece == 'none' && this.state.grid[0][2].curPiece == 'none' && this.state.grid[0][3].curPiece == 'none'){
          var curKingPos = [];
          curKingPos[0] = this.state.blackKing.curPosition[0];
          curKingPos[1] = this.state.blackKing.curPosition[1];
          if(this.kingSafety("black")){
            this.state.grid[curKingPos[0]][curKingPos[1]].curPiece = 'none';
            this.state.grid[0][3].curPiece = this.state.blackKing;
            this.state.blackKing.curPosition =  this.state.grid[0][3].position;
            if(this.kingSafety("black")){
              this.state.grid[0][2].curPiece = 'none';
              this.state.grid[0][3].curPiece = 'none';
              this.state.grid[0][2].curPiece = this.state.blackKing;
              this.state.blackKing.curPosition =  this.state.grid[0][2].position;
              if(this.kingSafety("black")){
                this.state.grid[0][2].curPiece = 'none';
                this.state.grid[0][3].curPiece = 'none';
                this.state.blackKing.curPosition = curKingPos;
                for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
                  this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
                  this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.blackKing;
                }
                return true;
              }
            }
          }
          this.state.grid[0][2].curPiece = 'none';
          this.state.grid[0][3].curPiece = 'none';
          this.state.blackKing.curPosition = curKingPos;
        }
      }
      for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
        this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
        this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.blackKing;
      }
    }
    return false;
  }

  castlingKingside = (color) => {
    var curPos = [];
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j++){
        if(this.state.grid[i][j].posSquare == true){
          curPos.push(this.state.grid[i][j].position);
        }
      }
    }
    if(color == "white"){
      if(!this.state.whiteKing.hasMoved && !this.state.grid[7][7].curPiece.hasMoved){
        if(this.state.grid[7][6].curPiece == 'none' && this.state.grid[7][5].curPiece == 'none'){
          var curKingPos = [];
          curKingPos[0] = this.state.whiteKing.curPosition[0];
          curKingPos[1] = this.state.whiteKing.curPosition[1];
          if(this.kingSafety("white")){
            this.state.grid[curKingPos[0]][curKingPos[1]].curPiece = 'none';
            this.state.grid[7][5].curPiece = this.state.whiteKing;
            this.state.whiteKing.curPosition =  this.state.grid[7][5].position;
            if(this.kingSafety("white")){
              this.state.grid[7][6].curPiece = 'none';
              this.state.grid[7][5].curPiece = 'none';
              this.state.grid[7][6].curPiece = this.state.whiteKing;
              this.state.whiteKing.curPosition =  this.state.grid[7][6].position;
              if(this.kingSafety("white")){
                this.state.grid[7][6].curPiece = 'none';
                this.state.grid[7][5].curPiece = 'none';
                this.state.whiteKing.curPosition = curKingPos;
                for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
                  this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
                  this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.whiteKing;
                }
                return true;
              }
            }
          }
          this.state.grid[7][6].curPiece = 'none';
          this.state.grid[7][5].curPiece = 'none';
          this.state.whiteKing.curPosition = curKingPos;
        }
      }
      for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
        this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
        this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.whiteKing;
      }
    }
    else{
      if(!this.state.blackKing.hasMoved && !this.state.grid[0][7].curPiece.hasMoved){
        if(this.state.grid[0][6].curPiece == 'none' && this.state.grid[0][5].curPiece == 'none'){
          var curKingPos = [];
          curKingPos[0] = this.state.blackKing.curPosition[0];
          curKingPos[1] = this.state.blackKing.curPosition[1];
          if(this.kingSafety("black")){
            this.state.grid[curKingPos[0]][curKingPos[1]].curPiece = 'none';
            this.state.grid[0][5].curPiece = this.state.blackKing;
            this.state.blackKing.curPosition =  this.state.grid[0][5].position;
            if(this.kingSafety("black")){
              this.state.grid[0][6].curPiece = 'none';
              this.state.grid[0][5].curPiece = 'none';
              this.state.grid[0][6].curPiece = this.state.blackKing;
              this.state.blackKing.curPosition =  this.state.grid[0][6].position;
              if(this.kingSafety("black")){
                this.state.grid[0][6].curPiece = 'none';
                this.state.grid[0][5].curPiece = 'none';
                this.state.blackKing.curPosition = curKingPos;
                for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
                  this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
                  this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.blackKing;
                }
                return true;
              }
            }
          }
          this.state.grid[0][6].curPiece = 'none';
          this.state.grid[0][5].curPiece = 'none';
          this.state.blackKing.curPosition = curKingPos;
        }
      }
      for(var k = 0; k < curPos.length; k ++){ // kingSafety just erased all of the posSquares, so we gotta reinstate them
        this.state.grid[curPos[k][0]][curPos[k][1]].posSquare = true;
        this.state.grid[curPos[k][0]][curPos[k][1]].movingPiece = this.state.blackKing;
      }
    }
    return false;
  }

  kingSafety = (color) => {

    if(color == "white"){
      for(var i = 0; i < this.state.blackPieces.length; i++){
        if(this.state.blackPieces[i].inPlay){
          this.state.blackPieces[i].move(this.state.grid, this.filler, this.filler, "black", this.filler, this.filler);
          for(var j = 0; j < 8; j ++){
            for(var k = 0; k < 8; k++){
              if(this.state.grid[j][k].posSquare){
                if((this.state.whiteKing.curPosition[0] == this.state.grid[j][k].position[0])
                  && (this.state.whiteKing.curPosition[1] == this.state.grid[j][k].position[1])){
                  for(var i = 0; i < 8; i ++){
                    for(var j = 0; j < 8; j ++){
                      this.state.grid[i][j].posSquare = false;
                    }
                  }
                  return false;
                }
              }
            }
          }
        }
      }
    }
    else{
      for(var i = 0; i < this.state.whitePieces.length; i++){
        if(this.state.whitePieces[i].inPlay){
          this.state.whitePieces[i].move(this.state.grid, this.filler, this.filler, "white", this.filler, this.filler);
          for(var j = 0; j < 8; j ++){
            for(var k = 0; k < 8; k++){
              if(this.state.grid[j][k].posSquare){
                if((this.state.blackKing.curPosition[0] == this.state.grid[j][k].position[0])
                  && (this.state.blackKing.curPosition[1] == this.state.grid[j][k].position[1])){
                  for(var i = 0; i < 8; i ++){
                    for(var j = 0; j < 8; j ++){
                      this.state.grid[i][j].posSquare = false;
                    }
                  }
                  return false;
                }
              }
            }
          }
        }
      }
    }
    for(var i = 0; i < 8; i ++){
      for(var j = 0; j < 8; j ++){
        this.state.grid[i][j].posSquare = false;
        this.state.grid[i][j].movingPiece = 'none'
      }
    }
    return true;

  }

  filler = () => {
    
  }

  addPiece = (color, piece) => {
    if(color == "white"){
      this.state.whitePieces.push(piece);
    }
    else{
      this.state.blackPieces.push(piece);
    }
    this.setState({});
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
            safety = {this.kingSafety}
            pruneMoves = {this.pruneMoves}
            addPiece = {this.addPiece}
            checkCastlingKingside = {this.castlingKingside}
            checkCastlingQueenside = {this.castlingQueenside}
            changePlayer = {this.changePlayer}
          /> 
          )
        )}
      </View>
    );

  }

}

export default class App extends Component {
  state = {
    boardKey : 0,
  }
  resetBoard = () => {
    this.setState({boardKey: this.state.boardKey + 1});
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.content}>

          <GameBoard key = {this.state.boardKey}>
          </GameBoard>

        </View>
        <View style={styles.navBar}>
          <View style={styles.button}>
            <TouchableHighlight onPress = {() => this.resetBoard()}>
              <View>
                {"reset"}
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
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
    backgroundColor: '#90aa90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flex: 1,
    borderTopColor : "white",
    borderTopWidth: 5,
    backgroundColor: '#aa90aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    width: deviceWidth * 1/2,
    height: deviceHeight * 1/15,
    color: 'white',
    backgroundColor: '#f0aa30',
    justifyContent: 'center',
    alignItems: 'center',
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
