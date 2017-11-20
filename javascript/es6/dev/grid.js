import { isNumber } from "util";

class Grid {

  /* gets string, returns number */

  

  _parseVar(value) {

    if (typeof value == 'string' && value.indexOf('px')!= -1) {
      return parseFloat(value);
    }

    if (typeof value == 'string' && value.indexOf('%')!= -1) {
      return parseFloat(value) / 100;
    }

    return value;
    
  }

  constructor() {
  
    this._cache = {};

    this._breakpoints = ['xs','sm','md','lg','xl','xxl'];


    
    this.config = {
      "container-max-widths":require("json-loader!../../config/container-max-widths.json"),
      "container-standard-margins":require("json-loader!../../config/container-standard-margins.json"),
      "grid-breakpoints":require("json-loader!../../config/grid-breakpoints.json"),
      "grid-columns":require("json-loader!../../config/grid-columns.json"),
      "grid-gutter-widths":require("json-loader!../../config/grid-gutter-widths.json"),
    }

    this.config['calculated-grid-gutter-widths'] = {};
    this.config['calculated-container-max-widths'] = {};

    var value = 0;
    for (var i=0 ; i< this._breakpoints.length; i++) {
      var name = this._breakpoints[i];
      value = this.config['grid-gutter-widths'][name] ? this.config['grid-gutter-widths'][name] : this._parseVar(value);
      this.config['calculated-grid-gutter-widths'][name] =  this._parseVar(value);
    }

    var value = 0;
    for (var i=0 ; i< this._breakpoints.length; i++) {
      var name = this._breakpoints[i];
      value = this.config['container-max-widths'][name] ? this.config['container-max-widths'][name] : value
      this.config['calculated-container-max-widths'][name] =  this._parseVar(value);
    }

    
    //this.cols=12;

    this.colClass="col-xs-1 col-sm-1 col-md-1";
    this.colStyle = [
      'background:rgba(255,0,0,0.1); height:100%;',
      'background:rgba(0,0,255,0.1); height:100%;',
      '1px solid rgba(0,0,0,0.2)'
    ];

    this.onStage=false;
  }

  attach() {
    let self = this;
    window.addEventListener('keydown', function(e) {
      var tagName =  e.target.tagName.toLowerCase();
      if (e.key === 'g' && tagName != 'input' && tagName != 'textarea' ) {
        self.toggleGrid()
      }
    })
  }

  get currentBreakPoint() {
    var breakpoint = '';
    var w = document.body.clientWidth;

    if (this._cache['breapoint_'+w]) {
      return this._cache['breapoint_'+w];
    }

    var breakpoints = this.config["grid-breakpoints"];

    for(var key in this.config["grid-breakpoints"]) {
      var _b = this._parseVar(breakpoints[key]);
      if (w >= _b) {
        breakpoint = key;
      }
    }

    this._cache['breapoint_'+w] = breakpoint;
    return breakpoint;

  }

  get containerWidth() {
    
    var windowWidth = document.body.clientWidth;
    var currentBreakpoint = this.currentBreakPoint;
    var maxWidth = this._parseVar(this.config['calculated-container-max-widths'][currentBreakpoint]);

    

    if (maxWidth <= 1) {
      //percentage 
      return windowWidth * maxWidth
    } else {
      if (windowWidth < maxWidth) {
        return windowWidth;
      } 
      return maxWidth;
    }
   
  }

  get columns() {
    return this.config["grid-columns"];
    
  }

  get gutterWidth() {
    
    var windowWidth = document.body.clientWidth;
    var currentBreakpoint = this.currentBreakPoint;

    var gutterWidth = this._parseVar(this.config['calculated-grid-gutter-widths'][currentBreakpoint]);

    return gutterWidth;

  }

  get columnWidth() {
    
    return (this.containerWidth / this.columns) - (1 * this.gutterWidth);

  }

  toggleGrid() {
    if (this.onStage) {
      document.querySelector('.grid-helper').parentNode.removeChild(document.querySelector('.grid-helper'));
    } else {
      let html = "<div class='grid-helper' style='z-index: 999; width:100%; height: 100%; position:fixed; left:0; top:0;'>";
      html += "<div class='container' style='height:100%;'>";
      html += "<div class='row' style='height:100%;'>";
      for (let i = 1; i <= this.columns; i++) {
        let border_style = i == 1 ?  `border-right: ${this.colStyle[2]} ;border-left: ${this.colStyle[2]}` : `border-right: ${this.colStyle[2]}`;
        html += `<div class=' ${this.colClass} ' style=' ${border_style} '><div class='column' style=' ${this.colStyle[i % 2]} '></div></div>`;
      }
      html += "</div></div></div>";
      document.body.insertAdjacentHTML('beforeend', html);
    }
    this.onStage = !this.onStage;
  }



}

export default Grid;

/** ES 5 version
SilverStripe.behaviors.Helpers = {
  cols:12,
  colClass:"col-xs-1 col-sm-1 col-md-1",
  colStyle: [
    'background:rgba(255,0,0,0.1); height:100%;',
    'background:rgba(0,0,255,0.1); height:100%;',
    '1px solid rgba(0,0,0,0.2)'
  ],
  onStage:false,
  attach:function() {
    var self = this;
    window.addEventListener('keydown', function(e) {
      if (e.key=='g') {
        self.toggleGrid()
      }
    })
  },
  toggleGrid: function() {
    if (this.onStage) {
      document.querySelector('.grid-helper').parentNode.removeChild(document.querySelector('.grid-helper'));
    } else {
      var html = "<div class='grid-helper' style='z-index: 999; width:100%; height: 100%; position:fixed; left:0; top:0;'>";
      html += "<div class='container' style='height:100%;'>";
      html += "<div class='row' style='height:100%;'>"
      for (var i = 1; i <= this.cols; i++) {
        var border_style = i == 1 ?  'border-right:' + this.colStyle[2] + ';border-left:' + this.colStyle[2] : 'border-right:' + this.colStyle[2];
        html += "<div class='" + this.colClass + "' style=' " + border_style + " '><div class='column' style='" + ( this.colStyle[i % 2]) + "'></div></div>";
      }
      html += "</div></div></div>";
      document.body.insertAdjacentHTML('beforeend', html);
    }
    this.onStage = !this.onStage;
  }
}
*/
