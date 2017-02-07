module.exports = function(model) {
    model
        .includeSchema(false)
        .after('get', function(req, res, next) {
            console.log('AAAA', req.params);
            if (!req.params.id) {
                delete req.quer.options; // Remove skip and limit to get total count
                req.quer.count(function(err, count) { //Apply remaining query

                    if (err) throw err;

                    var result = {
                        docs: res.locals.bundle,
                        count: count
                    };

                    res.locals.bundle = result;

                    next();

                });
            } else {
                next();
            }

        });
};
