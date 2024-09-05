const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    
    title: {
        type: String,
    },
    description: {
        type: String,
    },     

}, {
    timestamps: true,
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };