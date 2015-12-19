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
    calculator.render();
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
  updateViewModel: function(){
    if(calculator.dataModel.dataArray === [] && calculator.dataModel.buffer === ''){

    }
    calculator.viewModel.result =  calculator.dataModel.result;
  },
  render: function(){
    calculator.$input[0].innerHTML = calculator.viewModel.result;
  }
};
calculator.init();
