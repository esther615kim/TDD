const { shuffle } = require("./index");
const _ = require("./index");

describe("#identity", () => {
    test("returns the value passed as an argument", () => {
        expect(_.identity(3)).toBe(3);
        expect(_.identity("hello")).toBe("hello");
        expect(_.identity(true)).toBe(true);
    });
    test("return value has the same reference when passed an array or object", () => {
        const arr = [];
        expect(_.identity(arr)).toBe(arr);
        const obj = {};
        expect(_.identity(obj)).toBe(obj);
    });
});

describe("#fromPairs", () => {
    test("converts an array to an object", () => {
        expect(_.fromPairs([])).toEqual({});
    });
    test("fills object with key+value pairs based on nested arrays", () => {
        expect(
            _.fromPairs([
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ])
        ).toEqual({ a: 1, b: 2, c: 3 });
    });
});

describe("#times", () => {
    test("returns an array", () => {
        const output = _.times(5, 5);
        expect(output.constructor).toBe(Array);
    });
    test("fills an array with (n) of input", () => {
        expect(_.times(3, "Hi")).toEqual(["Hi", "Hi", "Hi"]);
        expect(_.times(10, true)).toEqual([
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
        ]);
        expect(_.times(1, true)).toBeTruthy();
    });
});

describe("#sample", () => {
    test("returns 0 if passed an empty array", () => {
        expect(_.sample([])).toBe(0);
    });
    test("returns a random element from the array", () => {
        expect(_.sample([1])).toBe(1);
        const randomSpy = jest.spyOn(Math, "random");
        randomSpy.mockImplementation(() => {
            return 1;
        });
        expect(_.sample([1, 2, 3, 4])).toBe(4);
        randomSpy.mockRestore(); // for resetting
    });
});

describe("#map", () => {
    test("iterates through array and returns new array", () => {
        const callback = (element) => {
            return "test";
        };
        const input = [1, 2, 3];
        expect(_.map(input, callback)).toEqual(["test", "test", "test"]);
    });
    test("doesn't mutate the original array", () => {
        const callback = (element) => {
            return "test";
        };
        const input = [1, 2, 3];
        expect(_.map(input, callback)).not.toBe(input);
    });
});

describe("#filter", () => {
    test("iterates through array and returns new array", () => {
        const callback = (element) => {
            return element % 2 === 0;
        };
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(_.filter(input, callback)).toEqual([2, 4, 6, 8, 10]);
    });
    test("doesn't mutate the original array", () => {
        const callback = (element) => {
            return element % 2 === 0;
        };
        const input = [1, 2, 3];
        expect(_.filter(input, callback)).not.toBe(input);
    });
});

describe("#shuffle", () => {
    test("returns a new array", () => {
        const input = [6, 5, 8, 12, 2, 21];
        expect(_.shuffle(input)).not.toBe(input);
    });
    test("using a mock function", () => {
        const randomSpy = jest.spyOn(Math, "random");
        randomSpy.mockImplementation(() => {
            return 0;
        });
        _.shuffle([1, 2, 3]);
        expect(randomSpy).toBeCalledTimes(2); //instead of 3
        randomSpy.mockRestore();
    });
});

describe("#forEach", () => {
    test("if not given arguments, returns empty array", () => {
        let input;
        let callback;
        expect(_.forEach(input, callback)).toEqual([]);
    });
    test("mock functions", () => {
        const callback = jest.fn((value) => {
            return value;
        });
        const input = [1, 2, 3];
        _.forEach(input, callback);
        expect(callback).toBeCalledTimes(3);
    });
});

describe("#invert", () => {
    test("returns an object", () => {
        expect(_.invert({})).toEqual({});
    });
    test("returns flipped keys and values", () => {
        const input = { a: "Ryan", b: "Esther" };
        const output = { Ryan: "a", Esther: "b" };
        expect(_.invert(input)).toEqual(output);
<<<<<<< HEAD
    })
})

describe("#fill", () => {
    test('returns an array', () => {
        const output = _.fill(2, "hi")
        expect(output.constructor).toBe(Array);
    })
    test('returns an array', () => {
        const output = _.fill(2, "hi")
        expect(output).toEqual(["hi", "hi"]);
    })
})

describe("#find", () => {
    test('returns undefinded when the target unfound', () => {
        expect(_.find([1, 2, 3], 4)).toBeUndefined();
    });
    test('returns index of target', () => {
        expect(_.find([1, 2, 3], 2)).toBe(1);
    });
})
=======
  });
});

describe("#zip", () => {
  test("returns an array", () => {
    const output = _.zip([1, 2], [3, 4]);
    expect(output.constructor).toBe(Array);
  });
  test("zips multiple arrays and turns them into 2 arrays", () => {
    expect(_.zip([1, 2], [3, 4], [5, 6])).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
  });
});
>>>>>>> db0986dfb6e720d7b6dc4cc9f30917f6d494b83c
