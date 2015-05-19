export class Slug {
    constructor() {

    }
}

Slug.convertToSlug = function(text)
{
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
};
