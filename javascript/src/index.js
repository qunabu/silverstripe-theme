/** import sections */
require('lazysizes');
import Components from 'ss-components';
import Grid from "ss-grid";

/** if you need jquery then uncomment line below */
//import $ from "jquery"; 
//window.$ = window.jQuery = $; 


/** BEHAVIOURS 
 * in the last line of each behaviour add line like eg.
 * `window.SilverStripe.behaviors.PageTransitions = new PageTransitions();`
*/
import ComponentsBehavior from './behaviours/components';
import PageTransitions from './behaviours/page_transitions';

/** COMPONENTS */
import Header from './components/header';

/** GRID Helper */
if (window.location.href.indexOf('localhost') != -1 || window.location.href.indexOf('qunabu') != -1) {
    window.grid = new Grid(require('sass-extract-loader!./../../sass/base/_bootstrap-config.scss'));
    grid.attach();    
}
