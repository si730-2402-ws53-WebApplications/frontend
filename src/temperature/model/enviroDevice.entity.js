export class EnviroDevice {
    constructor({
                    id = '',
                    name = '',
                    model = '',
                    value = '',
                    type = '',
                    unit = '',
                    storeroomId = ''
                }) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.value = value;
        this.type = type;
        this.unit = unit;
        this.storeroomId = storeroomId;
    }
}
