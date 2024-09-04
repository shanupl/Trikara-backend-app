const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },     
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,        
    },    
    userType: {
        type: String,
        default: 'candidate',
    },
    status: {
        type: String,
    },    
    password: {
        type: String,
    },

}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = { User };