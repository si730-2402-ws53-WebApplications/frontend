export class Humidifier {
    constructor({
                    id = '',
                    name = '',
                    model = '',
                    storeroom = '',
                    humidity = ''
                }) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.storeroom = storeroom;
        this.humidity = humidity;
    }
}
