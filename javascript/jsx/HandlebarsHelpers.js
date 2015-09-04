export default function(handlebars) {

    handlebars.registerHelper('gt', function(l, r, opts) {
        return (l > r) ? opts.fn(this) : opts.inverse(this);
    });

    handlebars.registerHelper('lt', function(l, r, opts) {
        return (l < r) ? opts.fn(this) : opts.inverse(this);
    });

    handlebars.registerHelper('eq', function(l, r, opts) {
        return (l == r) ? opts.fn(this) : opts.inverse(this);
    });

    handlebars.registerHelper('gte', function(l, r, opts) {
        return (l >= r) ? opts.fn(this) : opts.inverse(this);
    });

    handlebars.registerHelper('lte', function(l, r, opts) {
        return (l <= r) ? opts.fn(this) : opts.inverse(this);
    });

    handlebars.registerHelper('noteq', function(l, r, opts) {
        return (l != r) ? opts.fn(this) : opts.inverse(this);
    });
}
