const express = require("express");
const axios = require('axios')
const aa = express.Router();

aa.route("/")
    .get(async(req, res)=>{

        console.log("in a");

        // The URL you want to make a POST request to
        const url = 'http://localhost:3562';
        

        // Making the POST request
        await axios.post(url)
          .then(response => {
            // Handle the response here
            console.log('Response:', response.data);
            res.send(response)
          }).catch(error=> {
            // Handle errors here
            //console.error('Error:', error);
            res.send("err")
          }
        
    )
        })

module.exports = aa;