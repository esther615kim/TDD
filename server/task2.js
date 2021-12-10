const fs = require('fs');
const https = require('https');

const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/people/:username/interests',
    method: 'GET'
};

function getInterests(callback) {
    // read file
    fs.readFile('northcoders.json', (err, data) => {

        if (err) console.error(err);
        else {
            const people = JSON.parse(data.toString());
            const newPeople = [];
            const numberOfPeople = people.length;

            // loop
            const loop = (ppl, callback) => {

                ppl.forEach((person) => {
                    options.path = `/api/people/${person.username}/interests`;
                    const request = https.request
                        (options, (res) => {
                            res.on('data', (packet) => {
                                const interests = JSON.parse(packet.toString());
                                newPeople.push(interests);
                            })
                        });

                    request.on('error', (error) => {
                        console.log('Request Error:', error);
                    });
                    request.end();
                }) // end of forEach

                setTimeout(() => {
                    console.log(newPeople.length, newPeople);
                    if (newPeople.length === numberOfPeople) callback(newPeople);
                }, 2000);

            };

            function createFile(ppl) {
                let isWritten = false;
                if (!(isWritten)) {
                    // create file
                    fs.writeFile('./interests.json', JSON.stringify(ppl),
                        (err) => {
                            if (err) throw err;
                            console.log('The interests.json file has been saved!');
                        });
                    isWritten = true;
                }
            }
            // callback
            loop(people, createFile);
        }
    });
    callback();
}
module.exports = getInterests;
