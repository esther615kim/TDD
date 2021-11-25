const _ = {};

_.identity = (x) => {
    return x;
};

_.fromPairs = (array) => {
    const output = {};
    for (let i = 0; i < array.length; i++) {
        const key = array[i][0];
        const value = array[i][1];
        output[key] = value;
    }
    return output;
};

_.times = (num, input) => {
    const output = [];
    for (let i = 0; i < num; i++) {
        output.push(input);
    }
    return output;
};

_.sample = (array) => {
    if (array.length === 0) return 0;
    else if (array.length === 1) return array[0];
    else return array[Math.floor(Math.random() * array.length - 1)];
};

_.map = (array, callback) => {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(callback(array[i]));
    }
    return output;
};

_.filter = (array, callback) => {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) output.push(array[i]);
    }
    return output;
};

_.shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let randomChoice = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[randomChoice];
        array[randomChoice] = temp;
    }
    return [...array];
};

_.forEach = (array, callback) => {
    if (!array) return [];
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(callback(array[i]));
    }
    return output;
};

_.invert = (obj) => {
    const output = {};
    for (let key in obj) {
        output[obj[key]] = key;
    }
    return output;
};

_.zip = (...arrays) => {
    const array1 = [];
    const array2 = [];
    for (let i = 0; i < arrays.length; i++) {
        for (let j = 0; j < arrays[i].length; j++) {
            if (j % 2 === 0) array1.push(arrays[i][j]);
            else array2.push(arrays[i][j]);
        }
    }
    return [array1, array2];
};

_.fill = (num, value) => {
    const output = [];
    for (let i = 0; i < num; i++) {
        output.push(value);
    }
    return output;
}

_.find = (array, target) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) return i;
    }
}

module.exports = _;