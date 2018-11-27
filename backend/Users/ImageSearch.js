const gis = require('g-i-s');

module.exports = (title, callback) => {
    gis(title, (error, results) => {
        if (error) callback({error});
        else callback({url: results[0].url})
    })
}