const mongoose = require('mongoose');
const User = require('../models/UserModel');

mongoose.connect('mongodb://localhost:27017/3rd-project')
.then(x =>{

    console.log('connected to database name:', x.connections[0].name);

    return User.create({
        email:'marco@marco.com',
        pasword:'123',
        name:'marco'
    });

})
.then(createdUser => {
    console.log('my updated user is', createdUser);
})
.catch(err => console.log('error connecting to db', err));

