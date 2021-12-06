// import { removeAgents } from './1-human-resources';
// import { removeAgents, makeNameTags, createPoll } from './1-human-resources';
const { createPoll, makeNameTags, removeAgents } = require('./1-human-resources')

describe("HR kata", () => {
    const passedInput = [
        { name: 'Sam', profession: 'artist' },
        { name: 'Mitch', profession: 'mole' },
    ]
    // #1 check the passed input - obj(array)
    test("removeAgents - passed input is an array", () => {
        expect(typeof passedInput).toBe('object');
    })
    // #2 check the returned value -obj(array) 
    test("removeAgents - returns an array ", () => {
        expect(typeof removeAgents(passedInput)).toBe('object')
    })
    // #3 test expected output
    test("removeAgents - does not return someone whose profession is 'mole", () => {
        expect(removeAgents(passedInput)).toEqual([{ "name": "Sam", "profession": "artist" }])
    })

    const guests = [
        {
            title: "Mr",
            forename: "Sam",
            surname: "Caine",
            age: 30,
            company: "Northcoders",
        },
    ];
    // #1 check the passed input and output
    test("makeNameTags - receives and returns an obj(array)", () => {
        expect(typeof guests).toBe('object');
        expect(typeof makeNameTags(guests)).toBe('object');
    })
    // #2 check if the passed input has the required properties
    test.skip("makeNameTags - each guest has the follwing keys:'title','forename',`lastname` and `company`", () => {
        // expect(guests).toHaveProperty('title') // not working
        expect(guests).toEqual([{ "age": 30, "company": "Northcoders", "forename": "Sam", "surname": "Caine", "title": "Mr" }])
    })
    //3 check the expected output 
    test.skip("makeNameTags - check the expected output", () => {
        expect(makeNameTags(guests)).toEqual(['Mr Sam Caine, Northcoders'])
    })

    // createPoll
    const survey = ["cake", "biscuit", "biscuit"]
    // check input & return values(Type-obj)
    test("createPoll - receives and returns an obj", () => {
        expect(typeof survey).toBe('object');
        expect(typeof createPoll(survey)).toBe('object');
    })


})

// test("createPoll -", () => { })
