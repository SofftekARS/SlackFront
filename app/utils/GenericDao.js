let PopulationHelper = require('../utils/PopulationHelper');
let ResponseHelper = require('../utils/ResponseHelper');
/** 
 * guarda el objeto y devuelve en el response el resultado de la operacion
 */
let save = function(req, res, clazz, instance, next) {
    try {

        console.log("entre al save: " + instance);
        //populo el objeto
        let obj = PopulationHelper.populate(instance, req, clazz);
        console.log(obj);
        //lo guardo
        obj.save(function(err, objNew) {
            //si no tengo callback lo escribo en el response
            if (!next) {
                ResponseHelper.write(res, objNew, err, ResponseHelper.create);
            } else {
                // si tengo callback lo ejecuto
                next(err, objNew);
            }
        });
    } catch (err) {
        console.error(err);
        if (!next) {
            ResponseHelper.write(res, {}, err, ResponseHelper.badRequest);
        } else {
            next(err);
        }
    }
};
module.exports = {
    save: save,
}