export default function(handlebars) {

    handlebars.registerHelper('gt', function(l, r, opts) {
        return (l > r) ? wrapWithMetaInfo(l, r, ">", opts.fn(this)) : opts.inverse(this);
    });

    handlebars.registerHelper('hasDone', function(val, opts) {

        if (opts && opts.data && opts.data.root && opts.data.root.learning_modules) {
            var lookup = opts.data.root.learning_modules;

            if (lookup[snakeCase(val)]) {
                return wrapWithMetaInfo(null, val, "Shown because you completed module: ", opts.fn(this));
            }

        }

        return opts.inverse(this);
    });

    handlebars.registerHelper('hasExperienceWith', function(val, limit, opts) {

        if (opts && opts.data && opts.data.root && opts.data.root.topic_scores) {
            var lookup = opts.data.root.topic_scores;

            if (lookup[snakeCase(val)] >= limit) {
                return wrapWithMetaInfo(null, val, "Shown because you have experience with: ", opts.fn(this));
            }

        }

        return opts.inverse(this);
    });

    handlebars.registerHelper('hasNoExperienceWith', function(val, limit, opts) {

        console.log(val, limit, opts);

        if (opts && opts.data && opts.data.root && opts.data.root.topic_scores) {
            var lookup = opts.data.root.topic_scores;


            if (!lookup[snakeCase(val)] || lookup[snakeCase(val)] <= limit) {
                return wrapWithMetaInfo(null, val, "Shown because you have limited experience with: ", opts.fn(this));
            }

        }

        return opts.inverse(this);
    });

    handlebars.registerHelper('lt', function(l, r, opts) {
        return (l < r) ? wrapWithMetaInfo(l, r, "<", opts.fn(this)) : opts.inverse(this);
    });

    handlebars.registerHelper('eq', function(l, r, opts) {
        return (l == r) ? wrapWithMetaInfo(l, r, "=", opts.fn(this)) : opts.inverse(this);
    });

    handlebars.registerHelper('gte', function(l, r, opts) {
        return (l >= r) ? wrapWithMetaInfo(l, r, ">=", opts.fn(this)) : opts.inverse(this);
    });

    handlebars.registerHelper('lte', function(l, r, opts) {
        return (l <= r) ? wrapWithMetaInfo(l, r, "<=", opts.fn(this)) : opts.inverse(this);
    });

    handlebars.registerHelper('noteq', function(l, r, opts) {
        return (l != r) ? wrapWithMetaInfo(l, r, "!=", opts.fn(this)) : opts.inverse(this);
    });
}

function snakeCase(str) {
    var working = str.toLowerCase();
    working = working.replace(/\s/g, "_");
    return working;
}

function wrapWithMetaInfo(l, r, operator, result) {
    return `<div class="inserted"><span>${result}</span><div class="reason">?<div>${l ? l : ""} ${operator} ${r ? r : ""}</div></div></div>\n`;
}
