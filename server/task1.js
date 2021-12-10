const fs = require('fs');
const https = require('https');

function getPeople(callback) {

    const options = {
        hostname: 'nc-leaks.herokuapp.com',
        path: '/api/people',
        method: 'GET'
    };

    const request = https.request(options, (response) => {
        let body = '';

        response.on('data', (packet) => {
            body = body + packet.toString();  // Concatenate pack to make response string.
            //console.log(body);
            const bodyObject = JSON.parse(body);
            if (bodyObject.hasOwnProperty('people')) {
                const people = bodyObject.people;
                //console.log(people);
                const northCoders = people.filter(
                    (person) => person.job.workplace === 'northcoders'
                );
                //console.log(northCoders);
                fs.writeFile('./northcoders.json', JSON.stringify(northCoders),
                    (err) => {
                        if (err) throw err;
                        console.log('The northcoders.json file has been saved!');
                    });
            }
        });

    });

    request.on('error', (error) => {
        console.log('Request Error:', error);
    });
    request.end()
    // Invoke Send
    callback();
}

module.exports = getPeople;
