let create = 201;
let find = 200;
let badRequest = 400;
let get = 200;
let update = 204;
let deleted = 202;
let unathorize = 401;


function write(response, obj, err, status) {
    console.log("entre error helper: " + status);

    if (!err && (!obj || obj == null)) {
        response.status(404);
    } else if (err) {
        response.status(500);
    } else {
        response.status(status);
    }
    console.log(status);
    if (err) {
        obj = err;
    }
    response.json(obj);

}

module.exports = {
    write: write,
    create: create,
    find: find,
    badRequest: badRequest,
    get: get,
    update: update,
    delete: deleted,
    unathorize: unathorize,
}