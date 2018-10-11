const UserCatalog = require('./UserCatalog')
const User = require('./User')
const AuthService = require('./AuthService')
const ResourceCatalog = require('./ResourceCatalog')


console.log('hello');

let  x =ResourceCatalog.MakeNewResource({title : "title" , author : "author", format : "format" ,pages:"format"  ,publisher: "publi",language: "eng", ISBN_10:"111", ISBN_13 : "222"}, "Book")
ResourceCatalog.MakeNewResource({title : "title3" , author : "author3", format : "format3" ,pages:"format3"  ,publisher: "publi",language: "eng", ISBN_10:"111", ISBN_13 : "222"}, "Book")
ResourceCatalog.MakeNewResource({title : "title2" , author : "author2", format : "format2" ,pages:"format2"  ,publisher: "publi",language: "eng", ISBN_10:"111", ISBN_13 : "222"}, "Book")
ResourceCatalog.MakeNewResource({title : "title1" , author : "author1", format : "format1" ,pages:"format1"  ,publisher: "publi",language: "eng", ISBN_10:"111", ISBN_13 : "222"}, "Book")



console.log(ResourceCatalog.getResList());