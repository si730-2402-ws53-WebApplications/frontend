export class Heater {
    constructor({
                    id = '',
                    name = '',
                    model = '',
                    storeroom = '',
                    temperature = ''
                }) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.storeroom = storeroom;
        this.temperature = temperature;
    }
}
