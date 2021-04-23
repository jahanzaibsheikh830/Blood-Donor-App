var mongoose = require("mongoose");

let dbURI = "mongodb+srv://dbjahan:dbjahan@cluster0.8ric4.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function() {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) { //any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
var bloodUserSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "profilePic": String,
    "role": { "type": String, "default": "user" },
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var bloodUserModel = mongoose.model("blooduser", bloodUserSchema);

var bloodDonateSchema = new mongoose.Schema({
    "fullName": String,
    "phone": String,
    "address": String,
    "gender": String,
    "latitude": String,
    "longitude": String,
    "bloodGroup": String,
    "createdOn": { "type": Date, "default": Date.now },
});

var bloodDonateModel = mongoose.model("blood-donate", bloodDonateSchema);


module.exports = {
   bloodUserModel: bloodUserModel,
   bloodDonateModel: bloodDonateModel
}