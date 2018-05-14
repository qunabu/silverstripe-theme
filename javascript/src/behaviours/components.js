import Components from 'ss-components';

const ComponentsBehavior = {
    attach() {
        Components.attach();
    }
};

export default ComponentsBehavior;

window.SilverStripe.behaviors.ComponentsBehavior = ComponentsBehavior;