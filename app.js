const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;


app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req, res){

    var FirstName = req.body.firstName;
    var LastName = req.body.lastName;
    var email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://usXX.api.mailchimp.com/3.0/lists/list_id",
        method: "POST",
        headers: {
            "Authorization": "ndene1 APIKEY"
        },
        body: jsonData

    }

    request(options, function(error, response, body){
        if (error) {
            res.sendFile(__dirname +"/failure.html");            
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname +"/success.html");            
            } else {
                res.sendFile(__dirname +"/failure.html");            
            }
            
        }
    });
    
});


app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || port, function(){
    console.log("Server run on port: " +port);
});
