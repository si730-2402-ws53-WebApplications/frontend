import http from "../../shared/services/http-common.js";

export class CategoryService {
    resourceEndpoint = 'api/v1/categories';

    getAll() {
        return http.get(this.resourceEndpoint);
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

    createSuggestion(categoryId, suggestionResource) {
        return http.post(`${this.resourceEndpoint}/${categoryId}/suggestions`, suggestionResource);
    }

    viewSuggestions(categoryId) {
        return http.get(`${this.resourceEndpoint}/${categoryId}/suggestions`);
    }

    deleteSuggestion(categoryId, suggestionId) {
        return http.delete(`${this.resourceEndpoint}/${categoryId}/suggestions/${suggestionId}`);
    }

    updateSuggestion(categoryId, suggestionId, suggestionResource) {
        return http.put(`${this.resourceEndpoint}/${categoryId}/suggestions/${suggestionId}`, suggestionResource);
    }
}