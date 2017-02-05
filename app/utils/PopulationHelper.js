/**
 * Popula el objeto y valida que este bien formado
 * @param {obj} - instancia del objeto para popular 
 *       si no existe creo una instancia usando el clazz  
 * @param {Request} El request para poder obtener los datos para llenar el objeto
 * @param {clazz} Clase del objeto para poder instanciarlo en caso de que sea un create
 * @returns Objeto populado
 */
function populate(obj, req, clazz) {
    //el objeto vacio es en caso de un create, sino se popula por un update
    if (!obj) {
        obj = new clazz();
    }
    obj.populate(req);
    let err = obj.validateSync();
    if (err) {
        throw err;
    } else {
        return obj;
    }
}

module.exports = {
    populate: populate,
}