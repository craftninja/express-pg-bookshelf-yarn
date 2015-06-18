var bookshelf = require('../../bookshelf');

var Yarn = bookshelf.Model.extend({
    tableName: 'yarns'
});

module.exports = Yarn;
