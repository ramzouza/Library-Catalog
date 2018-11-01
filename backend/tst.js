const ResourceMapper = require('./Resources/ResourceMapper.js');


//console.log(ResourceMapper.select(1).results);


let resource_obj = {"title": "Jon is the best","author":"Ramez", "format":" Hardcover","pages":" 500","publisher":"New publisher ","language":"Arab", "isbn_10":"great ", "isbn_13":"ewr"}
let type = "book";
ResourceMapper.insert(resource_obj, type)