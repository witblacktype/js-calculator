'use strict';
/* Refactoring notes:


*/
var calculator = {
  // remove these global variables and use the dataModel instead
  model: '',
  // ------------------------------------------------------------
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
    }
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
      if( calculator.dataModel.symbol !== ''){
        return false;
      }
      return true;
    case 'compute':
      if ( calculator.dataModel.buffer === '' || calculator.dataModel.symbol === '' || calculator.dataModel.prevValue === ''){
        return false;
      }
      return true;
    case 'clear':
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
      switch (value){
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
      }
    }
  },
  updateViewModel: function(){
    var output = calculator.dataModel.buffer;
    if (calculator.viewModel.prevValue !== ''){
      output += ' ' + calculator.dataModel.symbol + ' ' + calculator.dataModel.prevValue;
    }
    if (calculator.viewModel.result !== ''){
      output += ' = ' + calculator.dataModel.result;
    }
    return output;
  },
  render: function(){
    //updates the view from the (data) model
    //calculator.$input[0].innerHTML = calculator.buffer;
    calculator.$input[0].innerHTML = calculator.model;
  },
  operation: function(){
    if (calculator.prevValue !== ''){
      if (calculator.dataModel.buffer !== ''){
        calculator.compute();
      }
    }
    if(calculator.dataModel.prevValue === ''){
      //calculator.symbol = operand;
      calculator.dataModel.prevValue = calculator.dataModel.buffer;
      calculator.dataModel.buffer = '';
    }
    calculator.updateModel();
    calculator.render();
  },
  clearButton: function(){
    calculator.dataModel.buffer = '';
    calculator.dataModel.prevValue = '';
    calculator.dataModel.symbol = '';
    calculator.dataModel.result = '';
    calculator.updateModel();
    calculator.render();
  },
  compute: function(){
    var input1 = parseFloat(calculator.dataModel.prevValue);
    var input2 = parseFloat(calculator.dataModel.buffer);
    switch (calculator.symbol){
    case '+':
      calculator.dataModel.result = input1 + input2;
      calculator.updateModel();
      calculator.render();
      break;
    case '-':
      calculator.dataModel.result = input1 - input2;
      calculator.updateModel();
      calculator.render();
      break;
    case '*':
      calculator.dataModel.result = input1 * input2;
      calculator.updateModel();
      calculator.render();
      break;
    case '/':
      calculator.dataModel.result = input1 / input2;
      calculator.updateModel();
      calculator.render();
      break;
    }
  },
  updateModel: function(){
    calculator.model = calculator.dataModel.prevValue + ' ' + calculator.dataModel.symbol + ' ' + calculator.dataModel.buffer + ' ' + calculator.dataModel.result;
  }
};
calculator.init();
