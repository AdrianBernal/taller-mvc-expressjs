var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

// var schema = Schema(
//     {
//         name: String,
//         binary: Buffer,
//         living: Boolean,
//         updated: { type: Date, default: Date.now },
//         age: { type: Number, min: 18, max: 65, required: true },
//         mixed: Schema.Types.Mixed,
//         _someId: Schema.Types.ObjectId,
//         array: [],
//         ofString: [String], // You can also have an array of each of the other types too.
//         nested: { stuff: { type: String, lowercase: true, trim: true } }
//     });

var UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    images: [Schema.Types.ObjectId]
});

UserSchema.statics.findByEmail = async function (email) {
    let user = await this.findOne({
        email: email
    });
    return user;
};

UserSchema.statics.findByName = async function (name) {
    let user = await this.findOne({
        name: name
    });
    return user;
};

UserSchema.statics.findByLogin = async function (login) {
    return await this.findByEmail(login) || await this.findByName(login);
};

UserSchema.statics.list = function() {
    return User.find({}).exec((err, users) => users);
};

// userSchema.pre('remove', function(next) {
//     this.model('Message').deleteMany({ user: this._id }, next);
// });

// Exportamos el modelo para usarlo en otros ficheros
var userModel = {};

if (!modelAlreadyDeclared()) {
    userModel = mongoose.model('Users', UserSchema)
}

function modelAlreadyDeclared () {
    try {
        userModel = mongoose.model('Users')  // it throws an error if the model is still not defined
        return true
    } catch (e) {
        return false
    }
}

module.exports = userModel;