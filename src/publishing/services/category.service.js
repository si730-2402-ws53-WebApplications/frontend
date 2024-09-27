import http from "../../shared/services/http-common.js";
import axios from 'axios';



export class CategoryService {

    resourceEndpoint = '/db.json';

    getAll() {
        return axios.get(this.resourceEndpoint).then(response => response.data.telas); // Asegúrate de leer solo la sección 'telas'
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(categoryResource) {
        return http.post(this.resourceEndpoint, categoryResource);
    }

    update(id, categoryResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, categoryResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}