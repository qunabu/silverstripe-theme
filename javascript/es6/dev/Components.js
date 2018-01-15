export default class Components {
    
    constructor() {
        this._components = {}
        this._classNames = {}
    }

    register(type, classObj) {
        this._classNames[type] = classObj;
    }

    attach() {
        let elementList = Array.prototype.slice.call( document.querySelectorAll('[data-component]'));

        elementList.forEach(element => {
            let data = $(element).data();
            
            if (data.attached) {
                return 
            } else {
                $(element).data('attached', true);
            }
                      
            /** FIXME 
             * potential memory leak 
             * find a way to remove elements out of DOM
             */
            if (this._classNames[data.component]) {
                this._components[element] = new this._classNames[data.component](element, data, SilverStripe.settings);
                this._components[element].id = element.id;
            } else {
                console.log(data.component + ' component is missing');
            }
        });
        
    }

    get classNames() {
        return this._classNames;
    }

    get components() {
        return this._components;
    }

    getById(id) {

        for (var key in this._components) {
            if (this._components[key].id === id) {
                return this._components[key];
            }
        }
    }

    getByType(type) {

        var results = [];
        for (var key in this._components) {
            if (this._components[key].constructor.name === type) {
                results.push(this._components[key]);
            }
        }
        return results;

    }

}
