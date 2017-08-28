
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var MongoClient = require('mongodb').MongoClient;

var xhr = new XMLHttpRequest();

xhr.addEventListener("load", function() {
        // fs.writeFileSync('ITD.JSON', this.responseText);

        var jsonResponse = JSON.parse(this.responseText);

        console.log("Doc 8643 contains " + jsonResponse.length + " aircraft.");

        // Connection URL
        var url = 'mongodb://localhost:27017/data';

        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, db) {
                if (err) {
                        throw err;
                }

                console.log("Connected successfully to server");

                db.collection('ITD').insertMany(jsonResponse, null, function(err, result) {
                        if (err) {
                                throw err;
                        }

                        console.log("Inserted " + result.insertedCount + " records into 'ITD'.");

                        db.close();
                });
        });
});

xhr.open("POST", 'https://www4.icao.int/doc8643/External/AircraftTypes');
xhr.send();

