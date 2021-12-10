const fs = require('fs');
const { get } = require('http');
const https = require('https');
const getPeople = require('./task1');
const getInterests = require('./task2');
const getPets = require('./task3');
const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/confidential',
    method: 'GET'
};

const request = https.request(options, (response) => {
    let body = '';

    response.on('data', (packet) => {
        body = body + packet.toString();  // Concatenate pack to make response string.
        //console.log('Packet', packet.toString());
        //console.log(response);
        const bodyObject = JSON.parse(body);
        //console.log(bodyObject);
        if (bodyObject.hasOwnProperty('instructions')) {
            //console.log(bodyObject.instructions);
            fs.writeFileSync('./instructions.md', bodyObject.instructions)
        } else {
            console.log('Has no instructions!')
        };
    });

});

request.on('error', (error) => {
    console.log('Request Error:', error);
});

// Invoke Send
request.end();

getPeople(
    () => {
        getInterests(
            () => {
                getPets();
            }
        )
    }
);
// getInterests();
