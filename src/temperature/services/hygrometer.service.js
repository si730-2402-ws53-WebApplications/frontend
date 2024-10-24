import http from "../../shared/services/http-common.js";

export class HygrometerService {
    resourceEndpoint = '/hygrometers';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(hygrometerResource) {
        return http.post(this.resourceEndpoint, hygrometerResource);
    }

    update(id, hygrometerResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, hygrometerResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}
