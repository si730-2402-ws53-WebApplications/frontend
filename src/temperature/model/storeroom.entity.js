export class Storeroom {
    constructor({
                    id = '',
                    name = '',
                    location = '',
                    description = '',
                    capacity = '',
                    contact = {
                        phone: '',
                        email: ''
                    },
                    temperature = {
                        actual: '',
                        maximum: '',
                        minimum: '',
                        unit: 'Celsius'
                    },
                    humidity = {
                        actual: '',
                        maximum: '',
                        minimum: '',
                        unit: 'percent'
                    }
                }) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.capacity = capacity;
        this.contact = contact;
        this.temperature = temperature;
        this.humidity = humidity;
    }
}
