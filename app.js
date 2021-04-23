const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { url } = require('inspector');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (request, response) {
    response.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;
    console.log(fname, lname, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const option = {
        method: "POST",
        auth: "Damish:4e34ca9830c844e567d7a8db1989f6be-us1"
    }

    var url = "https://us1.api.mailchimp.com/3.0/lists/707c2f1757";


    const request = https.request(url, option, function (response) {
        if (response.statusCode == 200) {
            // res.send("successfull send the subcribe");
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/fail.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    // console.log("HElp");
    res.redirect('/');
});




app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running 3000");
});




// 4e34ca9830c844e567d7a8db1989f6be-us1

// 707c2f1757