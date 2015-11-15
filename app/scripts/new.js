'use strict';
/* Refactoring notes:

- refactor validateInput() function to return true if the input is valid
validateInput: function(type, value){
  switch (type) {
    case 'value':
      //console.log('type is ' + this.dataset.math);
      //console.log('value is of type ' + typeof this.dataset.value);
      if (value === '.'){
        calculator.enterDecimal(value);
      }else{
        calculator.enterDigit(value);
      }
      break;
    case 'operator':
      calculator.operation(value);
      break;
    case 'compute':
      calculator.compute();
      break;
    case 'clear':
      calculator.clearButton();
      break;
    default:
      console.log('default case');
      break;
  }








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

  updateDataModel: function(type, value){
    return type + value;
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
  validateInput: function(type, value){
    switch (type) {
      case 'value':
        //console.log('type is ' + this.dataset.math);
        //console.log('value is of type ' + typeof this.dataset.value);
        if (value === '.'){
          //var decimalMatch = /\./;
          calculator.enterDecimal(value);
        }else{
          calculator.enterDigit(value);
        }
        break;
      case 'operator':
        calculator.operation(value);
        break;
      case 'compute':
        calculator.compute();
        break;
      case 'clear':
        calculator.clearButton();
        break;
      default:
        console.log('default case');
        break;
    }
  },
  enterDecimal: function(decimal){
    var decimalMatch = /\./;
    if(decimalMatch.test(calculator.dataModel.buffer) === false){
      calculator.dataModel.buffer += decimal;
      calculator.updateModel();
      calculator.render();
    }
  },
  enterDigit: function(digit){
    if(calculator.dataModel.buffer === ''){
      calculator.dataModel.buffer = digit;
    }else{
      calculator.dataModel.buffer += digit;
    }
    calculator.updateModel();
    calculator.render();
  },
  operation: function(operand){
    switch (operand){
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
