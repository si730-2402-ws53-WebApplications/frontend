import { Suggestion } from './suggestion.entity.js';

export class Category {
    constructor(
        {
            categoryId = 0,
            name = '',
            suggestions = []
        }
    ) {
        this.id = categoryId;
        this.name = name;
        this.suggestions = suggestions.map(suggestion => new Suggestion(suggestion));
    }
}