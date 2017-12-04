/** import sections */
import Grid from './dev/grid';
import PageTransitions from './dev/page_transitions';
import Body from './dev/body';

/** attaching behaviors to global object */
window.SilverStripe.behaviors.Grid = new Grid();
window.SilverStripe.behaviors.PageTransitions = new PageTransitions();
window.SilverStripe.behaviors.Body = new Body();
window.SilverStripe.behaviors.Components = new Components();
//window.SilverStripe.behaviors.Components.register('realization-map', MapComponent);

