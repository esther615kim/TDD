const { expect } = require('@jest/globals');
// import { createQueue, enQueue, deQueue, getQuantity, isEmpty, isFull } from './index';
const { createQueue, enQueue, deQueue, getQuantity, isEmpty, isFull } = require('./index');

const func = createQueue();

describe("#createQueue", () => {
    // test1 return value
    test("returns an object ", () => {
        expect(typeof (createQueue())).toBe('object');
    });
    // test2 check properties
    test("should have the following properties: front,backand storage", () => {
        expect(func).toHaveProperty('front');
        expect(func).toHaveProperty('back');
        expect(func).toHaveProperty('storage');
    });
    // test3 add maxSize
    test("should have maxSize of passed value in queue", () => {
        const testFunc = createQueue(5);
        expect(testFunc.maxSize).toBe(5);
    });
    // test4 enQueue -------------------------------------------------------!
    const testEnqueue = jest.fn(() => func.enQueue("banana")); // add "banana"
    test.skip("enQueue`-should return 'fully stored' and do not add a new item when it is full", () => {
        createQueue(2);
        // testEnqueue();
        // testEnqueue();
        // testEnqueue();
        expect(testEnqueue).toHaveBeenCalledTimes(3);
        // expect(func.back).toBe(2);
        // expect(testEnqueue).toReturn("fully loaded")
    })
    test.skip("`enQueue`-item should be added in queue", () => {
        expect(func.storage.size).toBe(2);
    })
    test.skip("enQueue- 'back' has been incremented by 1", () => {
        expect(func.back).toBe(2);
    });
    // test5 deuque -----------------------------------------------------!
    const testDeque = func.deQueue();
    test("`deQueue`-returns undefined when the queue is empty", () => {
        expect(func.back).toBe(0);
    })
    test("deQueue`-'back'has been decremented by 1", () => {
        createQueue(2);
        testEnqueue(); // add"banana"
        testEnqueue(); // add"banana"
        expect(func.back).toBe(2);
        func.deQueue();
        expect(func.back).toBe(1);
    });
    // test6 getQuantity------------------------------------------------!
    test("getQuantity - returns zero when the storage is empty", () => {
        expect(createQueue().isEmpty()).toBeTruthy();
        expect(createQueue().getQuantity()).toBe(0)
        // expect(func.getQuantity()).tRoBe(3);
    });
    test("getQuantity - returns the qty of items in the queue", () => {
        const func = createQueue();
        const addCherry = func.enQueue("cherry");
        expect(func.getQuantity()).toBe(1);
    });
    // test7 isEmpty--------------------------------------------------!
    test("isEmpty-returns true when the queue is empty", () => {
        expect(createQueue().isEmpty()).toBeTruthy();
    })

    test("isEmpty-returns false when the queue is not empty", () => {
        const func = createQueue();
        const addCherry = func.enQueue("cherry");
        expect(func.isEmpty()).toBeFalsy();
    })
    //test8 isFull-----------------------------------------------------!
    test("isFull-returns false when the queue is empty", () => {
        expect(createQueue().isEmpty()).toBeTruthy();
        expect(createQueue().isFull()).toBeFalsy();
    });
    test.skip("isFull-returns true when the queue has reached the maxSize", () => {
        const func = createQueue(1);
        const addCherry = () => (func.enQueue("cherry"));
        addCherry(); // ?
        expect(func.maxSize).toBe(1);
        expect(func.back).toBe(1);
        expect(func.isFull()).toBeTruthy();
    });
    //FIX test9 peek-----------------------------------------------------!
    test.only("peek-returns a string", () => {
        const func = createQueue(1);
        const addCherry = () => (func.enQueue("cherry"));
        addCherry();
        expect(typeof func.peek()).toBe('string');
    });
    // end of the test
})


// test.only("",()=>{});
