const fs = require('fs');
const https = require('https');

const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/people/:username/pets',
    method: 'GET'
};

function getPets() {
    // read file
    fs.readFile('northcoders.json', (err, data) => {

        if (err) console.error(err);
        else {
            const people = JSON.parse(data.toString());
            const petOwners = [];
            let count = 0;

            // loop
            const loop = (ppl, callback) => {

                ppl.forEach((person) => {
                    options.path = `/api/people/${person.username}/pets`;
                    const request = https.request
                        (options, (res) => {
                            res.on('data', (packet) => {
                                const pets = JSON.parse(packet.toString());
                                if (pets.person) petOwners.push(pets);
                                else count++;
                            })
                        });

                    request.on('error', (error) => {
                        console.log('Request Error:', error);
                    });
                    request.end();
                }) // end of forEach

                setTimeout(() => {
                    let length = people.length - count;
                    console.log("petOwners:", petOwners.length, petOwners);
                    if (petOwners.length === length) callback(petOwners);
                }, 2000);

            };

            function createFile(pets) {
                let isWritten = false;
                if (!(isWritten)) {
                    // create file
                    fs.writeFile('./pets.json', JSON.stringify(pets),
                        (err) => {
                            if (err) throw err;
                            console.log('The pet.json file has been saved!');
                        });
                    isWritten = true;
                }
            }
            // callback
            loop(people, createFile);
            // loop(people, createFile);
        }
    });
}
module.exports = getPets;
