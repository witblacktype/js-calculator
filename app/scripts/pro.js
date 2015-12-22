'use strict';
var calculator = {
  dataModel: {
    buffer: '',
    prevValue: '',
    symbol: '',
    result: '',
    dataObj: {},
    dataArray: []
  },
  viewModel: {
    leftSide: '',
    rightSide: '',
    operator: '',
    result: '',
    display: ''
  },
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.$calc = $('.calculator');
    this.$buttonArray = this.$calc.find('.btn-calc');
    this.$input = this.$calc.find('.input');
  },
  bindEvents: function(){
    //bind click event context to enterInput function
    calculator.$buttonArray.on('click', calculator.enterInput);
  },
  enterInput: function(){
    calculator.updateDataModel(this.dataset.math, this.dataset.value);
    calculator.updateViewModel(this.dataset.math, this.dataset.value);
    calculator.render(this.dataset.math, this.dataset.value);
  },
  updateDataModel: function(type, value){
    if(type === 'value'){
      if (value === '.'){
        var decimalMatch = /\./;
        if(decimalMatch.test(calculator.dataModel.buffer) === false){
          calculator.dataModel.buffer += value;
        }
      }else{
        calculator.dataModel.buffer += value;
      }
    }
    if (type === 'operator' && calculator.dataModel.buffer === '') {
      calculator.dataModel.dataObj.operator = value;
    }
    if (type === 'operator' && calculator.dataModel.buffer !== '') {
      calculator.dataModel.dataObj.value = parseFloat(calculator.dataModel.buffer);
      calculator.dataModel.dataArray.push(calculator.dataModel.dataObj);
      calculator.dataModel.buffer = '';
      calculator.dataModel.dataObj = {};


      calculator.dataModel.dataObj.operator = value;
    }

    if (type === 'compute' && calculator.dataModel.buffer !== '') {
      calculator.dataModel.dataObj.value = parseFloat(calculator.dataModel.buffer);
      calculator.dataModel.dataArray.push(calculator.dataModel.dataObj);
      calculator.dataModel.buffer = '';
      calculator.dataModel.dataObj = {};


      calculator.dataModel.result = calculator.parseArray(calculator.dataModel.dataArray);
    }
    if(type === 'clear' && value === 'CE'){
      calculator.dataModel.dataArray.pop();
    }
    if(type === 'clear' && value === 'AC') {
      calculator.dataModel.dataArray = [];
      calculator.dataModel.result = '';
      calculator.dataModel.dataObj = {};
    }
    if(type === 'sign'){
      if (calculator.dataModel.buffer.charAt(0) === '-') {
        calculator.dataModel.buffer = calculator.dataModel.buffer.substr(1);
      }else{
        calculator.dataModel.buffer = '-' + calculator.dataModel.buffer;
      }
    }

  },
  parseArray: function(arr){
    //var arr = calculator.dataModel.dataArray;
    var answer = arr.reduce(function(previous, current){
      switch (current.operator) {
        case 'add':
          //calculator.dataModel.result = {value: previous.value + current.value}.value;
          return {value: previous.value + current.value};
        case 'subtract':
          //calculator.dataModel.result = {value: previous.value - current.value}.value;
          return {value: previous.value - current.value};
        case 'multiply':
          //calculator.dataModel.result = {value: previous.value * current.value}.value;
          return {value: previous.value * current.value};
        case 'divide':
          //calculator.dataModel.result = {value: previous.value / current.value}.value;
          return {value: previous.value / current.value};
        default:
          console.log('default case: ' + current.operator);
      }
    });
    return answer.value;
  },
  updateViewModel: function(type, value){
    if(calculator.dataModel.dataArray.length === 0 && calculator.dataModel.buffer === ''){

    }

    if (calculator.dataModel.dataArray.length > 0) {
      switch (calculator.dataModel.dataObj.operator) {
        case 'add':
          calculator.dataModel.symbol = '+';
          break;
        case 'subtract':
          calculator.dataModel.symbol = '-';
          break;
        case 'multiply':
          calculator.dataModel.symbol = '*';
          break;
        case 'divide':
          calculator.dataModel.symbol = '/';
          break;
        default:
          console.log('test');
      }
    }

    if(type === 'compute'){



      switch (calculator.dataModel.dataArray[calculator.dataModel.dataArray.length - 1].operator) {
        case 'add':
          calculator.dataModel.symbol = '+';
          break;
        case 'subtract':
          calculator.dataModel.symbol = '-';
          break;
        case 'multiply':
          calculator.dataModel.symbol = '*';
          break;
        case 'divide':
          calculator.dataModel.symbol = '/';
          break;
        default:
          console.log('default case view switch');
      }


    }
    if(calculator.dataModel.dataArray.length > 1){
      var array = calculator.dataModel.dataArray.slice(0, calculator.dataModel.dataArray.length - 1);
      calculator.viewModel.leftSide = calculator.parseArray(array);
    }

    console.log('left side: ' + calculator.viewModel.leftSide);

    calculator.viewModel.rightSide = calculator.dataModel.buffer;


    if (type === 'compute') {
      calculator.viewModel.operator = calculator.dataModel.dataArray[calculator.dataModel.dataArray.length - 1].operator;

    }

    calculator.viewModel.operator = calculator.dataModel.dataObj.operator;

    calculator.viewModel.result =  calculator.dataModel.result;
  },
  render: function(type, value){

    var output = '';


    output = calculator.viewModel.leftSide + ' ' + calculator.viewModel.operator + ' ' + calculator.viewModel.rightSide;
    /*
    if (calculator.viewModel.leftSide !== '') {
      output += calculator.viewModel.leftSide;
      output += ' ' + calculator.dataModel.symbol + ' ';
    }
    if (calculator.dataModel.buffer !== '' && calculator.dataModel.dataArray.length === 0) {
      output += calculator.viewModel.rightSide;
    }
    if (type === 'operator') {
      output = calculator.viewModel.leftSide + ' ' + calc
    }
    */
    if (type === 'compute') {
      output += calculator.viewModel.leftSide + ' ';
      output += calculator.viewModel.operator;
      output += calculator.dataModel.dataArray[calculator.dataModel.dataArray.length - 1].value;
      output += ' = ' + calculator.viewModel.result;
    }


    calculator.$input[0].innerHTML = output;

  }
};
$(document).ready(calculator.init());
