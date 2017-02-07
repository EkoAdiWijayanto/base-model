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

        })
        .after('post', function(req, res, next) {
            if (res.locals.bundle.code === 11000) {
                var temp = res.locals.bundle.toJSON();
                temp.err = 'Duplicate data';
                res.locals.bundle = temp;
            }
            next();
        });;
};