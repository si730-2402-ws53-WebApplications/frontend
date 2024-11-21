import http from "../../shared/services/http-common.js";

export class WarehouseService {
    resourceEndpoint = '/api/v1/warehouses';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(storeroomResource) {
        return http.post(this.resourceEndpoint, storeroomResource);
    }

    update(id, storeroomResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, storeroomResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(nombre) {
        return http.get(`${this.resourceEndpoint}?nombre=${nombre}`);
    }
}
