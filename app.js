const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const https = require("https");

// const port = process.env.PORT;
const app = express();
app.use(express.static(__dirname +"/static"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , (req , res) =>{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" , (req, res) => {
    const firstName  =  req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: secondName
            }
        }]
    }

    let jsonData = JSON.stringify(data);

    const url =  "https://us20.api.mailchimp.com/3.0/lists/fc11ecbb9d";

    const options = {
        method: "POST",
        auth: "goldhumorist:d608bb36a72df73087f3a85052501c40-us20"
    }
    const request = https.request(url , options , (response)=>{
        if(response.statusCode === 200) {
            res.send("Successfully subscribed!")
        }else  {
            res.send("Something went wrong:(")
        }
     response.on("data", (data)=>{
         console.log(JSON.parse(data));
     })
    })

    request.write(jsonData);
    request.end();
    
    
})


app.listen(process.env.PORT || 3000 , ()=>{
    console.log("Server has been started on port - "+ 3000);
})

