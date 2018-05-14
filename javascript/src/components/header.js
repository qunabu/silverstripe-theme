import Components from 'ss-components';
//import $ from 'jquery';

export default class Header {
 
    constructor(el, data) {
        this.el = el;
        this.data = data;
        //this.$el= $(el)
 
        this.initListeners();
        
    }
   
    initListeners(){
    }
}
 
Components.register('header', Header);
