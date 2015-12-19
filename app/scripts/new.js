'use strict';
var calculator = {
  dataModel: {
    buffer: '',
    prevValue: '',
    symbol: '',
    result: '',
    dataArray: []
  },
  viewModel: {
    buffer: '',
    prevValue: '',
    symbol: '',
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
    var validation = calculator.validateInput(this.dataset.math, this.dataset.value);
    if( validation === true){
      calculator.updateDataModel(this.dataset.math, this.dataset.value);
      calculator.updateViewModel();
    }
    calculator.render();
  },
  validateInput: function(type, value){
    switch (type) {
    case 'value':
      if (value === '.'){
        var decimalMatch = /\./;
        if(decimalMatch.test(calculator.dataModel.buffer) === true){
          return false;
        }
      }
      return true;
    case 'operator':
    /*
      if( calculator.dataModel.symbol !== ''){
        return false;
      }
      */
      return true;
    case 'compute':
      if ( calculator.dataModel.buffer === '' || calculator.dataModel.symbol === '' || calculator.dataModel.prevValue === ''){
        return false;
      }
      return true;
    case 'clear':
      return true;
    case 'sign':
      return true;
    default:
      return false;
    }
  },
  updateDataModel: function(type, value){
    if(type === 'value'){
      calculator.dataModel.buffer += value;
    }
    if(type === 'operator'){
      if( calculator.dataModel.symbol === ''){
        switch (value){
        case 'add':
          calculator.dataModel.symbol = '+';
          calculator.operation();
          break;
        case 'subtract':
          calculator.dataModel.symbol = '-';
          calculator.operation();
          break;
        case 'multiply':
          calculator.dataModel.symbol = '*';
          calculator.operation();
          break;
        case 'divide':
          calculator.dataModel.symbol = '/';
          calculator.operation();
          break;
        }
      }
/*
      else{
        if(calculator.dataModel.buffer !== '' && calculator.dataModel.prevValue !== ''){
          calculator.compute();
          console.log('compute');
        }
      }
*/
    }
    if(type === 'compute'){
      calculator.compute();
    }
    if(type === 'clear'){
      if (value === 'AC') {
        calculator.allClear();
      }
      if (value === 'CE'){
        calculator.clearEntry();
      }
    }
    if (type === 'sign') {
      if (calculator.dataModel.buffer.charAt(0) === '-') {
        calculator.dataModel.buffer = calculator.dataModel.buffer.substr(1);
      }else{
        calculator.dataModel.buffer = '-' + calculator.dataModel.buffer;
      }
    }
  },
  operation: function(){
    if (calculator.dataModel.prevValue !== ''){
      if (calculator.dataModel.buffer !== ''){
        calculator.compute();
      }
    }
    if(calculator.dataModel.prevValue === ''){
      calculator.dataModel.prevValue = calculator.dataModel.buffer;
      calculator.dataModel.buffer = '';
    }
  },
  compute: function(){
    var input1 = parseFloat(calculator.dataModel.prevValue);
    var input2 = parseFloat(calculator.dataModel.buffer);
    switch (calculator.dataModel.symbol){
    case '+':
      calculator.dataModel.result = input1 + input2;
      break;
    case '-':
      calculator.dataModel.result = input1 - input2;
      break;
    case '*':
      calculator.dataModel.result = input1 * input2;
      break;
    case '/':
      calculator.dataModel.result = input1 / input2;
      break;
    }
  },
  allClear: function(){
    calculator.dataModel.buffer = '';
    calculator.dataModel.prevValue = '';
    calculator.dataModel.symbol = '';
    calculator.dataModel.result = '';
  },
  clearEntry: function(){
    if (calculator.dataModel.result !== '') {
      calculator.dataModel.result = '';
    }
    else if (calculator.dataModel.buffer === '' && calculator.dataModel.symbol === '') {
      calculator.dataModel.prevValue = '';
    }
    else if (calculator.dataModel.buffer === '' && calculator.dataModel.symbol !== '') {
      calculator.dataModel.symbol = '';
    }
    else if (calculator.dataModel.buffer !== '') {
      calculator.dataModel.buffer = '';
    }
  },
  updateViewModel: function(){
    calculator.viewModel.buffer = calculator.dataModel.buffer;
    calculator.viewModel.symbol = calculator.dataModel.symbol;
    calculator.viewModel.prevValue = calculator.dataModel.prevValue;
    calculator.viewModel.result = calculator.dataModel.result;
  },
  render: function(){
    //updates the viewModel.display from the viewModel object
    if(calculator.viewModel.prevValue === ''){
      calculator.viewModel.display = calculator.viewModel.buffer;
    }
    if(calculator.viewModel.prevValue !== ''){
      calculator.viewModel.display = calculator.viewModel.prevValue + ' ' + calculator.viewModel.symbol + ' ' + calculator.viewModel.buffer;
    }
    if(calculator.viewModel.result !== ''){
      calculator.viewModel.display = calculator.viewModel.prevValue + ' ' + calculator.viewModel.symbol + ' ' + calculator.viewModel.buffer + ' ' + ' = ' + calculator.viewModel.result;
    }
    calculator.$input[0].innerHTML = calculator.viewModel.display;
  }
};
calculator.init();
