import http from "../../shared/services/http-common.js";

export class HeaterService {
    resourceEndpoint = '/heaters';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(heaterResource) {
        return http.post(this.resourceEndpoint, heaterResource);
    }

    update(id, heaterResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, heaterResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}
