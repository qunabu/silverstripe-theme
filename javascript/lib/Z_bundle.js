/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _grid = __webpack_require__(1);

	var _grid2 = _interopRequireDefault(_grid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** attaching behaviors to global object */
	window.SilverStripe.behaviors.Grid = new _grid2.default(); /** import sections */

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Grid = function () {
	  function Grid() {
	    _classCallCheck(this, Grid);

	    this.cols = 12;
	    this.colClass = "col-xs-1 col-sm-1 col-md-1";
	    this.colStyle = ['background:rgba(255,0,0,0.1); height:100%;', 'background:rgba(0,0,255,0.1); height:100%;', '1px solid rgba(0,0,0,0.2)'];
	    this.onStage = false;
	  }

	  _createClass(Grid, [{
	    key: 'attach',
	    value: function attach() {
	      console.log('attach');
	      var self = this;
	      window.addEventListener('keydown', function (e) {
	        if (e.key == 'g') {
	          self.toggleGrid();
	        }
	      });
	    }
	  }, {
	    key: 'toggleGrid',
	    value: function toggleGrid() {
	      if (this.onStage) {
	        document.querySelector('.grid-helper').parentNode.removeChild(document.querySelector('.grid-helper'));
	      } else {
	        var html = "<div class='grid-helper' style='z-index: 999; width:100%; height: 100%; position:fixed; left:0; top:0;'>";
	        html += "<div class='container' style='height:100%;'>";
	        html += "<div class='row' style='height:100%;'>";
	        for (var i = 1; i <= this.cols; i++) {
	          var border_style = i == 1 ? 'border-right:' + this.colStyle[2] + ';border-left:' + this.colStyle[2] : 'border-right:' + this.colStyle[2];
	          html += "<div class='" + this.colClass + "' style=' " + border_style + " '><div class='column' style='" + this.colStyle[i % 2] + "'></div></div>";
	        }
	        html += "</div></div></div>";
	        document.body.insertAdjacentHTML('beforeend', html);
	      }
	      this.onStage = !this.onStage;
	    }
	  }]);

	  return Grid;
	}();

	exports.default = Grid;

/***/ })
/******/ ]);