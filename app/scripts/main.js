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
    this.$input[0].innerHTML = "new values";
  },
  enterInput: function(){
    switch (this.dataset.math) {
      case 'value':
        //console.log('type is ' + this.dataset.math);
        //console.log('value is of type ' + typeof this.dataset.value);
        if (this.dataset.value === "."){
          console.log(this);
        }else{
          console.log(this);
        }
        break;
      case 'operator':
        console.log('type is ' + this.dataset.math);
        break;
      case 'compute':
        console.log('type is ' + this.dataset.math);
        break;
      default:
        console.log('default case');
        break;
    }
  },
  enterDecimal: function(){
    var decimalMatch = /\./;
    if(decimalMatch.test(buffer) === false){
        buffer += this.dataset.value;
    }
  },
  enterValue: function(){
    var decimalMatch = /\./;
    if(decimalMatch.test(buffer) === false){
        buffer += this.dataset.value;
    }
  },
  enterDigit: function(digit){
    buffer += digit.value;
    if(prevValue === ""){
      document.getElementById('input').innerHTML = buffer;
    }else{
      document.getElementById('input').innerHTML = document.getElementById('input').innerHTML + buffer;
    }
  }
};
calculator.init();
