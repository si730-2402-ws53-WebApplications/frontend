import http from "../../shared/services/http-common.js";

export class HumidifierService {
    resourceEndpoint = '/humidifiers';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(humidifierResource) {
        return http.post(this.resourceEndpoint, humidifierResource);
    }

    update(id, humidifierResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, humidifierResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}
