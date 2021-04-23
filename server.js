var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
var { bloodUserModel, bloodDonateModel } = require('./dbconn/module')
var path = require("path")
var SERVER_SECRET = process.env.SECRET || "1234";
var jwt = require('jsonwebtoken')
var app = express()
var authRoutes = require('./routes/auth')
const fs = require('fs')
const admin = require("firebase-admin");
const multer = require('multer')

const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})

var upload = multer({ storage: storage })



app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:19006', 'exp://192.168.1.112:19000'],
    credentials: true
}));
app.use(morgan('dev'));
// app.use("/", express.static(path.resolve(path.join(__dirname, "public")));

app.get('/', (req, res, next) => {
    res.send("running")

})

app.use('/', authRoutes);
app.use(function (req, res, next) {
    console.log(req.cookies.jToken)
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate;

            if (diff > 300000) {
                res.status(401).send("token expired")
            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    role: decodedData.role
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86400000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                req.headers.jToken = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {

    console.log(req.body)

    bloodUserModel.findById(req.body.jToken.id, 'name email phone role createdOn',
        function (err, doc) {
            console.log("doc", doc)
            if (!err) {
                res.send({
                    status: 200,
                    profile: doc
                })

            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})
app.post('/donate', (req, res, next) => {
    if (!req.body.fullName || !req.body.phone
        || !req.body.address || !req.body.gender
        || !req.body.bloodGroup || !req.body.latitude || !req.body.longitude) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "email": "jahanzaib@gmail.com",
                "password": "123",
            }`)
        return;
    }

    bloodUserModel.findOne({ email: req.headers.jToken.email }, (err, user) => {
        if (user) {
            var newDonation = new bloodDonateModel({
                "fullName": req.body.fullName,
                "phone": req.body.phone,
                "address": req.body.address,
                "gender": req.body.gender,
                "bloodGroup": req.body.bloodGroup,
                "latitude": req.body.latitude,
                "longitude": req.body.longitude,
            })
            newDonation.save((err, data) => {
                if (!err) {
                    res.send({
                        status: 200,
                        message: "Data Insert Successfully"
                    })
                } else {
                    console.log(err);
                    res.status(500).send({
                        message: "data insert error, " + err
                    })
                }
            });
        }
        else {

        }
    })
})
app.get('/getDonors', (req, res, next) => {
    bloodUserModel.findOne({ email: req.headers.jToken.email }, (err, user) => {
        if (user) {
            bloodDonateModel.find({}, (err, data) => {
                if (data) {
                    res.send({
                        status: 200,
                        data: data
                    })
                }
                else {
                    res.send({
                        message: "something wrong"
                    })
                }
            })
        }
        else {
            res.send({
                message: "something wrong"
            })
        }
    })
})
app.post("/uploadImg", upload.any(), (req, res, next) => {

    console.log("req.body: ", req.body.myFile);
    bucket.upload(
        req.body.myFile,
        function (err, file, apiResponse) {
            if (!err) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0])
                        bloodUserModel.findOne({ email: req.headers.jToken.email }, (err, user) => {
                            if (!err) {
                                user.update({ profilePic: urlData[0] }, (err, updatedProfile) => {
                                    if (!err) {
                                        res.status(200).send({
                                            message: "succesfully uploaded",
                                            url: urlData[0],
                                        })
                                    }
                                    else {
                                        res.status(500).send({
                                            message: "an error occured" + err,
                                        })
                                    }

                                })
                            }
                            else {
                                res.send({
                                    message: "error"
                                });
                            }
                        })
                        try {
                            fs.unlinkSync(req.files[0].path)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})
