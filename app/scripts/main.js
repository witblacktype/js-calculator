var calculator = {
  buffer: "",
  prevValue: "",
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.$calc = $('#calculator');
    this.$buttonArray = this.$calc.find('button');
    this.$input = this.$calc.find('textarea');
    console.log(this.$input[0]);
  },
  bindEvents: function(){
    console.log(this.$buttonArray);

    this.$buttonArray.on('click', this.enterInput);

    /*
    this.$buttonArray.on('click', function(){
      console.log(this.dataset.math + " Button: " + this.dataset.value);
    });
    */

  },
  enterInput: function(){
    //this.$input[0].innerHTML = this.$buttonArray.dataset.value;
    console.log(this.dataset.math);
    console.log(this.dataset.value);

  },
  preview: function(){
    console.log(this);
    console.log(this.$calc);
  },
  render: function(){
    //updates the view from the (data) model
    this.$input[0].innerHTML = "new values";
    console.log(this.$input[0].innerHTML);
  },
  addValue: function(){
    console.log(this.$button.data('value'));
  }
};
calculator.init();

/*
$('button').on('click', function(){
  //parse button.value
  var obj = $(this);
  var type = $(this).data('math');
  var val = $(this).data('value');

  //find if button type is value, operator, or compute
  switch (type) {
    case 'value':
      console.log('type is ' + type);
      break;
    case 'operator':
      console.log('type is ' + type);
      break;
    case 'compute':
      console.log('type is ' + type);
      break;
    default:
      console.log('default case');
      break;
  }
});
*/
