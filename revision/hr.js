// 1

function removeAgents(people) {
    return people.filter(item => item.profession !== 'mole')
}

// 2

function makeNameTags(person) {
    const updated = Object.assign({}, person);
    updated[0].age = ",";

    // map
    return Object.values(updated[0]).join(" ");
}

// 3

function createPoll(survey) {
    return survey;
}

module.exports = { createPoll, makeNameTags, removeAgents }
