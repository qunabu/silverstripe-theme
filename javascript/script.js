var Qunabu = {}

$(function() {
  Qunabu = {
    footer: {
      footerFunction1:function() {
        console.log('footerFunction1');
      },
      footerFunction2:function() {
        console.log('footerFunction2');
      }
    },
    header : {
      headerFunction1:function() {
        console.log('headerFunction1');
      },
      headerFunction2:function() {
        console.log('headerFunction2');
      }
    },
    common: {
      commonFunction1:function() {
        console.log('commonFunction1');
      },
      commonFunction2:function() {
        console.log('commonFunction2');
      }
    },
    Page : {
      pageFunction1:function() {
        console.log('this function will be launch only on body.Page class ');
      }
    },
    HomePage : {
      pageFunction1:function() {
        console.log('this function will be launch only on body.HomePage class');
      }
    },
    attach:function(section) {
      if (this[section]) {
        for (var all in this[section]) {
          if (typeof this[section][all] == 'function') {
            this[section][all]();
          }
        }
      }
    },
    init:function() {
      this.attach('common');
      this.attach('header');
      this.attach('footer');
      var l = document.body.classList.length;
      for (var i=0; i<l; i++) {
        this.attach(document.body.classList[i]);
      }
    }
  }
})

$(function() {
  Qunabu.init();
})