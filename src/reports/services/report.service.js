import http from "../../shared/services/http-common.js";

class ReportService {
    getFabrics() {
        return http.get("/fabrics");
    }

    getEnviroDevices() {
        return http.get("/enviroDevices");
    }

    getClimateSensors() {
        return http.get("/climateSensors");
    }

    saveReport(data) {
        return http.post("/saveReport", data);
    }

    // Método para obtener todos los reportes guardados
    getReports() {
        return http.get("/saveReport");
    }

    // Método para obtener un reporte específico por su ID
    getReportById(reportId) {
        return http.get(`/saveReport/${reportId}`);
    }
}

export default new ReportService();
