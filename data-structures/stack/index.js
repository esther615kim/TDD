const { expect } = require('@jest/globals');
const { createStack, push, pop, isEmpty, isFull, peek } = require('./index');

describe("#createStack", () => {
    const func = createStack();
    const testFunc = createStack(3);
    const addBanana = jest.fn(() => {
        testFunc.push("banana");
    })

    // test1 if the func returns an obj
    test("returns an object", () => {
        expect(typeof (createStack())).toBe('object');
    })
    // test2 test pop
    test("`pop` returns a string", () => {
        expect(typeof func.peek()).toBe('string');
    })
    test("`pop` returns the latest item deleted in the storage", () => {
        addBanana();
        expect(testFunc.pop()).toBe("banana");
    })

    // test3 the passed param(maxSize)
    test("returns the passed maxSize", () => {
        expect(testFunc.maxSize).toBe(3);
    })

    // test4 add item in storage
    // test("adds an item to the stack storage", () => {
    //     addBanana();
    //     expect(testFunc.storage).toEqual({ 1: "banana" });

    //     // expect(testFunc.storage).stringMatching("banana");
    // })
    test("add item in storage", () => {
        addBanana();
        const storageLength = testFunc.storage.length;
        expect(storageLength).toHaveLength(testFunc.quantity);
    })
    // test5 isEmpty
    test("'isEmpty' returns a boolean", () => {
        expect(typeof func.isEmpty()).toBe('boolean');
    })
    test("`isEmpty`return true when it is not empty", () => {
        addBanana();
        expect(func.isEmpty()).toBeTruthy();
    })
    // test6 isEmpty using mock function?
    test("`isFull` returns true when the storage is full ", () => {
        addBanana(); // mock func qty3 - maxsize3
        expect(func.isFull).toBeTruthy();
    })
    // test 7 peek
    test("`peek` returns a string", () => {
        expect(typeof func.peek()).toBe('string');
    })
    test("`peak` returns the latst item added in the storage", () => {
        expect(testFunc.peek()).toBe('banana');
    })
}) // end of the line

// createStack()
// test("",()=>{})
