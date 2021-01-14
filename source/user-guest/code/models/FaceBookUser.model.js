const mongoose = require('mongoose');

const FaceBookUserSchema = mongoose.Schema ({
    facebookId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        requried: true
    },
    gender: {
        type: String,
        default: 'female'
    },
    avatar: {
        type: String,
        default: '/public/avatar/default/avatar.png'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    idWishList: {
        type: [mongoose.Schema.ObjectId],
        ref: 'courses'
    },
    purchasedCourses: {
        type: [{
            idCourse: {
                type: mongoose.Schema.ObjectId,
                ref: 'courses'
            },
            learnedVideos: [{
                type: Number
            }]
        }]
    }
});

const FaceBookUser = mongoose.model('facebookusers', FaceBookUserSchema);

module.exports = FaceBookUser;