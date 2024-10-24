import http from "../../shared/services/http-common.js";

export class ThermometerService {
    resourceEndpoint = '/thermometers';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(thermometerResource) {
        return http.post(this.resourceEndpoint, thermometerResource);
    }

    update(id, thermometerResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, thermometerResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}
