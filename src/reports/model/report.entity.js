export class Report {
    constructor({
                    id = 0, // ID único del reporte
                    date = new Date().toISOString(), // Fecha de creación del reporte
                    fabricsData = [], // Datos de las telas (e.g., cantidades)
                    enviroDevicesData = [], // Datos de los dispositivos ambientales
                    climateSensorsData = [], // Datos de los sensores climáticos
                }) {
        this.id = id;
        this.date = date;
        this.fabricsData = fabricsData;
        this.enviroDevicesData = enviroDevicesData;
        this.climateSensorsData = climateSensorsData;
    }
}