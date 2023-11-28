// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
BooksSchema = new Schema({
    ISBN : String,
    img : String,
	title : String,
    author : String,
    inventory : Number,
    category : String
});
module.exports = mongoose.model('Book', BooksSchema);

