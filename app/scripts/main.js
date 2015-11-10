var calculator = {
  buffer: "",
  prevValue: "",
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
    this.$buttonArray.on('click', this.enterInput);
  },
  render: function(){
    //updates the view from the (data) model
    this.$input[0].innerHTML = this.buffer;
  },
  enterInput: function(){
    switch (this.dataset.math) {
      case 'value':
        //console.log('type is ' + this.dataset.math);
        //console.log('value is of type ' + typeof this.dataset.value);
        if (this.dataset.value === "."){
          calculator.enterDecimal(this.dataset.value);
        }else{
          calculator.enterDigit(this.dataset.value);
        }
        break;
      case 'operator':
        calculator.operation(this.dataset.value);
        break;
      case 'compute':
        console.log('type is ' + this.dataset.math);
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
      calculator.render();
    }
  },
  enterDigit: function(digit){
    if(calculator.buffer === ""){
      calculator.buffer = digit;
    }else{
      calculator.buffer += digit;
    }
    calculator.render();
  },
  operation: function(operand){
    switch (operand){
      case '+':

        break;
      case '-':

        break;
      case '*':

        break;
      case '/':

        break;
    }
  }
};
calculator.init();
