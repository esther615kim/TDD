
## Sprint date: Nov-26-2021

## Goals

1. Continue practicing test-driven development (TDD) - both the process and the tools you'll be using to do it from now until the end of the course (and beyond).
2. Get an 'inside view' of one of the most heavily used JavaScript libraries, [lodash](https://lodash.com/) (50m downloads on NPM last month).
3. Lay the foundations for understanding the functional style of programming that JS lends itself so well to.

## Tasks
`✅ TASKS-DONE`
_Do not use higher-order native array methods such as `map`, `filter`, `reduce`, `forEach` in your implementation_ so you can gain a deeper understanding of how these methods work behind the scenes.

You should be heavily referencing the [lodash](https://lodash.com/docs/4.17.4/) documentation to understand how your functions should work.

The following are the lodash functions that you should aim to implement your own versions of using TDD. Note that some of these names will look familiar, but you need to check the documentation as they may offer additional functionality.

- ✅ `_.identity` - **Note: this function and the tests have already been written for you**
- ✅`_.fromPairs`
- ✅ `_.times`
- ✅`_.sample` - You will _need_ to use [jest - Mock Functions](https://jestjs.io/docs/mock-functions) to test your implementation of this to prove that you are using `Math.random()`!
- ✅`_.map`
- ✅`_.filter`
- ✅`_.shuffle` - You will _need_ to use [jest - Mock Functions](https://jestjs.io/docs/mock-functions) to test your implementation of this to prove that you are using `Math.random()`!
- ✅ `_.forEach` - You will _need_ to use [jest - Mock Functions](https://jestjs.io/docs/mock-functions) to test your implementation of this to prove that you are invoking the iteratee function for each item in the array with the correct arguments`!
- ✅`_.invert`
- ✅`_.zip`
- ✅`_.fill`
- ✅`_.find`

## Advanced Tasks

You _may_ need to use [jest - Mock Functions](https://jestjs.io/docs/mock-functions) to test your implementation of these!

- `_.chunk`
- `_.remove`
- `_.reduce`
- `_.intersection`

### References
- Lodash https://lodash.com/docs/4.17.15#filter
- Jest matchers https://jestjs.io/docs/using-matchers#arrays-and-iterables