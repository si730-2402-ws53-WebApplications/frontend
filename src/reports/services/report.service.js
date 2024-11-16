import http from "../../shared/services/http-common.js";

class ReportService {
    getFabrics() {
        return http.get('/fabrics');
    }

    getEnviroDevices() {
        return http.get('/enviroDevices');
    }

    getClimateSensors() {
        return http.get('/climateSensors');
    }
}

export default new ReportService();
