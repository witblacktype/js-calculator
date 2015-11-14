'use strict';
var calculator = {
  buffer: '',
  prevValue: '',
  symbol: '',
  eqSymbol: '=',
  model: '',
  result: '',
  dataModel: {
    buffer: '',
    prevValue: '',
    symbol: '',
    result: '',
  },
  viewModel: {
    buffer: '',
    prevValue: '',
    symbol: '',
    display: '',
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
  updateModel: function(){
    calculator.model = calculator.prevValue + ' ' + calculator.symbol + ' ' + calculator.buffer + ' ' + calculator.eqSymbol + ' ' + calculator.result;
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
  enterInput: function(){
    var type = this.dataset.math;
    var value = this.dataset.value;
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
        console.log('type is clear');
        break;
      default:
        console.log('default case');
        break;
    }
  },
  enterDecimal: function(decimal){
    var decimalMatch = /\./;
    if(decimalMatch.test(calculator.buffer) === false){
      calculator.buffer += decimal;
      calculator.updateModel();
      calculator.render();
    }
  },
  enterDigit: function(digit){
    if(calculator.buffer === ''){
      calculator.buffer = digit;
    }else{
      calculator.buffer += digit;
    }
    calculator.updateModel();
    calculator.render();
  },
  operation: function(operand){
    switch (operand){
      case 'add':
        calculator.symbol = '+';
        break;
      case 'subtract':
        calculator.symbol = '-';
        break;
      case 'multiply':
        calculator.symbol = '*';
        break;
      case 'divide':
        calculator.symbol = '/';
        break;
    }



    if (calculator.prevValue !== ''){
      if (calculator.buffer !== ''){
        calculator.compute();
      }
    }
    if(calculator.prevValue === ''){
      //calculator.symbol = operand;
      calculator.prevValue = calculator.buffer;
      calculator.buffer = '';
    }

    calculator.updateModel();
    calculator.render();



  },
  clearButton: function(){
    calculator.buffer = '';
    calculator.prevValue = '';
    calculator.symbol = '';
    calculator.result = '';
    calculator.updateModel();
    calculator.render();
  },
  compute: function(){
    var input1 = parseFloat(calculator.prevValue);
    var input2 = parseFloat(calculator.buffer);
    //var output;
    console.log(input1);
    console.log(input2);
    console.log(calculator.symbol);
    switch (calculator.symbol){
      case '+':
        calculator.result = input1 + input2;
        calculator.updateModel();
        calculator.render();
        break;
      case '-':
        calculator.result = input1 - input2;
        calculator.updateModel();
        calculator.render();
        break;
      case '*':
        calculator.result = input1 * input2;
        calculator.updateModel();
        calculator.render();
        break;
      case '/':
        calculator.result = input1 / input2;
        calculator.updateModel();
        calculator.render();
        break;
    }



  }
};
calculator.init();
