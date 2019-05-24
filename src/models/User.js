const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: false,
    },
    facebookId:{
        type: String,
        required: false,
    },
    picture:{
        type: String,
        required: false,
    }
});

UserSchema.plugin(mongoosePaginate);


mongoose.model('User', UserSchema);