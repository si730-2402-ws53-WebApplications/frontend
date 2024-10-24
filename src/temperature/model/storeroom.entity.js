export class Storeroom {
    constructor({
                    id = '',
                    nombre = '',
                    temperatura = {
                        actual: 0,
                        maxima: 0,
                        minima: 0,
                        unidad: 'Celsius'
                    },
                    humedad = {
                        actual: 0,
                        maxima: 0,
                        minima: 0,
                        unidad: '%'
                    }
                }) {
        this.id = id;
        this.nombre = nombre;
        this.temperatura = temperatura;
        this.humedad = humedad;
    }
}
