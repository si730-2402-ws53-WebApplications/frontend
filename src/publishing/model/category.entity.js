export class Category {
    constructor({ id = '', nombre = '', almacen = '', categoria = '', cantidad = 0 }) {
        this.id = id;
        this.nombre = nombre;
        this.almacen = almacen;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }
}
