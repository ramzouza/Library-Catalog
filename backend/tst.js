const ResourceMapper = require('./Resources/ResourceMapper.js');


//console.log(ResourceMapper.select(1).results);


let resource_obj = {"id": 44 ,"title": "Jon is the bestest","author":"Ramez", "format":" Hardcovers","pages":" 500","publisher":"New publisher ","language":"Arab", "isbn_10":"great ", "isbn_13":"ewr"}
let type = "book";

let yanis = { checked:['magazine','book','music','movie']}
let x= ResourceMapper.advSelect(yanis,true);