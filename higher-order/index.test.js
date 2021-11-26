const { once } = require("../index");
const hof = require("../index");

describe("Higher Order Functions", () => {
  describe("Identity Functions", () => {
    describe("identity", () => {
      it("returns the first value passed as an argument", () => {
        expect(hof.identity(3)).toBe(3);
        expect(hof.identity("winter")).toBe("winter");
        expect(hof.identity(true)).toBe(true);
        expect(hof.identity(null)).toBe(null);
        expect(hof.identity()).toBe(undefined);
      });
      it("returns the first reference as the one passed as an argument", () => {
        const arr = ["Crono", "Frog", "Robo"];
        expect(hof.identity(arr)).toBe(arr);
      });
    });
    describe("identityf", () => {
      it("returns a function", () => {
        expect(typeof hof.identityf()).toBe("function");
      });
      it("returned function will return initial value", () => {
        const sixtyFour = hof.identityf(64);
        expect(sixtyFour()).toBe(64);
      });
      it("returned function will return initial reference", () => {
        const teas = ["English Breakfast", "Oolong", "Jasmine"];
        const returnedTeas = hof.identityf(teas);
        expect(returnedTeas()).toBe(teas);
      });
    });
  });
  describe("Binary Operations", () => {
    describe("add", () => {
      it("returns total of the two arguments", () => {
        expect(hof.add(56, 5)).toBe(56 + 5);
        expect(hof.add(91, -71)).toBe(91 + -71);
      });
    });
    describe("sub", () => {
      it("returns the difference of the second argument from the first", () => {
        expect(hof.sub(57, 10)).toBe(57 - 10);
      });
    });
    describe("mul", () => {
      it("returns the product of two arguments", () => {
        expect(hof.mul(5, 30)).toBe(5 * 30);
      });
    });

    describe("Functions with multiple invocations", () => {
      describe("inc", () => {
        it("increments the passed argument by 1", () => {
          expect(hof.inc(0)).toBe(1);
          expect(hof.inc(-3)).toBe(-2);
        });
      });
      describe("addf", () => {
        it("returns a function on first invocation", () => {
          expect(typeof hof.addf(3)).toBe("function");
        });
        it("returns the total of both invocations", () => {
          expect(hof.addf(3)(4)).toBe(7);
        });
        it("returned function is reusable", () => {
          const add100 = hof.addf(100);
          expect(add100(5)).toBe(105);
          expect(add100(100)).toBe(200);
          expect(add100(-100)).toBe(0);
        });
      });

      describe("curry", () => {
        it("will take a binary function and a single value as arguments and return a function", () => {
          expect(typeof hof.curry(hof.add, 5)).toBe("function");
        });
        it("second invocation will return the result", () => {
          const timesByThirty = hof.curry(hof.mul, 30);
          expect(timesByThirty(6)).toBe(hof.mul(30, 6));
        });
      });
      describe("liftf", () => {
        it("returns a function on first invocation", () => {
          expect(typeof hof.liftf(hof.add)).toBe("function");
        });
        it("returns a function on second invocation", () => {
          expect(typeof hof.liftf(hof.add)(1)).toBe("function");
        });
        it("returns the result on third invocation (so that the binary function is callable with two invocations)", () => {
          expect(hof.liftf(hof.add)(1)(6)).toBe(hof.add(1, 6));
          expect(hof.liftf(hof.mul)(5)(6)).toBe(hof.mul(5, 6));
        });
      });
      describe("Unary Functions", () => {
        describe("twice", () => {
          it("returns a function on first invocation", () => {
            const double = hof.twice(hof.add);
            expect(typeof double).toBe("function");
          });
          it("returns the value on second invocation", () => {
            const double = hof.twice(hof.add);
            expect(double(3)).toBe(hof.add(3, 3));
          });
        });
      });

      describe(".once function", () => {
        it("returns a function", () => {
          expect(typeof hof.once(() => {})).toBe("function");
        });

        it("the passed function is called once", () => {
          const mock = jest.fn();
          const output = hof.once(mock);

          output(); //
          expect(mock).toHaveBeenCalledTimes(1);
        });

        it("the passed function is not called again", () => {
          const mock = jest.fn();
          const output = hof.once(mock);

          output(); //
          output(); //
          output(); //
          expect(mock).toHaveBeenCalledTimes(1);
        });
      });

      describe("composeu", () => {
        it("returns a function on first invocation", () => {
          const add100 = (x) => x + 100;
          const add50 = (x) => x + 50;
          const add150 = hof.composeu(add100, add50);
          expect(typeof add150).toBe("function");
        });
        it("returns a value of given function on second invocation", () => {
          const square = (x) => x * x;
          const double = (x) => x + x;
          const squareThenDouble = hof.composeu(square, double);
          const doubleThenSquare = hof.composeu(double, square);
          expect(squareThenDouble(5)).toBe(50);
          expect(doubleThenSquare(5)).toBe(100);
        });
      });
      describe("composeb", () => {
        it("returns a function on first invocation", () => {
          const add2NumsMultiplyBy3rd = hof.composeb(hof.add, hof.mul);
          expect(typeof add2NumsMultiplyBy3rd).toBe("function");
        });
        it("on second invocation, takes 3 values, using the first two for function #1 then using that returned value and the third parameter for function #2", () => {
          const add2NumsMultiplyBy3rd = hof.composeb(hof.add, hof.mul);
          expect(add2NumsMultiplyBy3rd(2, 3, 7)).toBe(
            hof.mul(hof.add(2, 3), 7)
          );
        });
      });
      describe("limit", () => {
        it("returns a function on first invocation", () => {
          const addUseOnceOnly = hof.limit(hof.add, 1);
          expect(typeof addUseOnceOnly).toBe("function");
        });
        it("on subsequent uses, returns value of original function when invoked less times than given limit", () => {
          const addUseLiberally = jest.fn(hof.limit(hof.add, 108));
          expect(addUseLiberally(3, 1)).toBe(4);
          expect(addUseLiberally(4, 4)).toBe(8);
          expect(addUseLiberally(0, 15)).toBe(15);
          expect(addUseLiberally(1, 15)).toBe(16);
          expect(addUseLiberally(11, 12)).toBe(23);
          expect(addUseLiberally(4, 38)).toBe(42);
          expect(addUseLiberally).toHaveBeenCalledTimes(6);
        });
        it("returns undefined when invoked more times than given limit", () => {
          const addUseScarcely = jest.fn(hof.limit(hof.add, 3));
          expect(addUseScarcely(3, 1)).toBe(4);
          expect(addUseScarcely).toHaveBeenCalledTimes(1);
          expect(addUseScarcely(4, 4)).toBe(8);
          expect(addUseScarcely).toHaveBeenCalledTimes(2);
          expect(addUseScarcely(0, 15)).toBe(15);
          expect(addUseScarcely).toHaveBeenCalledTimes(3);
          expect(addUseScarcely(1, 15)).toBe(undefined);
          expect(addUseScarcely).toHaveBeenCalledTimes(4);
          expect(addUseScarcely(11, 12)).toBe(undefined);
          expect(addUseScarcely).toHaveBeenCalledTimes(5);
        });
      });
      describe("Generator Functions", () => {
        describe("from", () => {
          it("returns a function on first invocation", () => {
            const index = hof.from();
            expect(typeof index).toBe("function");
          });
          it("returns given value on first call", () => {
            const index = hof.from(0);
            expect(index()).toBe(0);
          });
          it("Subsequent invocations emits consecutive integers", () => {
            const index = hof.from(0);
            expect(index()).toBe(0);
            expect(index()).toBe(1);
            expect(index()).toBe(2);
          });
        });

        describe("to", () => {
          it("returns a function on first invocation", () => {
            const index = hof.to(hof.from(0), 5);
            expect(typeof index).toBe("function");
          });
          it("returns given value on first call", () => {
            const index = hof.to(hof.from(0), 5);
            expect(index()).toBe(0);
          });
          it("Subsequent invocations emits consecutive integers", () => {
            const index = hof.to(hof.from(0), 2);
            expect(index()).toBe(0);
            expect(index()).toBe(1);
          });
          it("exclusively emits undefined when surpassed limit (not inclusive)", () => {
            const index = hof.to(hof.from(0), 2);
            expect(index()).toBe(0);
            expect(index()).toBe(1);
            expect(index()).toBe(undefined);
            expect(index()).toBe(undefined);
          });
          it("exclusively emits undefined when surpassed limit (not inclusive) when generator does not start at 0", () => {
            const index = hof.to(hof.from(1), 3);
            expect(index()).toBe(1);
            expect(index()).toBe(2);
            expect(index()).toBe(undefined);
            expect(index()).toBe(undefined);
          });
        });

        describe("fromTo", () => {
          it("returns a function on first invocation", () => {
            const index = hof.fromTo(0, 5);
            expect(typeof index).toBe("function");
          });
          it("returns given value on first call", () => {
            const index = hof.fromTo(0, 5);
            expect(index()).toBe(0);
          });
          it("Subsequent invocations emits consecutive integers", () => {
            const index = hof.fromTo(0, 2);
            expect(index()).toBe(0);
            expect(index()).toBe(1);
          });
          it("exclusively emits undefined when surpassed limit (not inclusive)", () => {
            const index = hof.fromTo(0, 2);
            expect(index()).toBe(0);
            expect(index()).toBe(1);
            expect(index()).toBe(undefined);
            expect(index()).toBe(undefined);
          });
        });
        describe("element", () => {
          it("on first invocation will return a function", () => {
            const ele = hof.element([], hof.fromTo(0, 1));
            expect(typeof ele).toBe("function");
          });
          it("returns the element at the given index", () => {
            const fbiAgents = [
              "Dale Cooper",
              "Phillip Jeffries",
              "Gordon Cole",
            ];
            const ele = hof.element(fbiAgents, hof.fromTo(1, 4));
            expect(ele()).toBe("Phillip Jeffries");
            expect(ele()).toBe("Gordon Cole");
          });
          it("defaults to the beginning of the index when no generator is given", () => {
            const blackLodge = ["BOB", "MIKE", "The Giant"];
            const ele = hof.element(blackLodge);
            expect(ele()).toBe("BOB");
            expect(ele()).toBe("MIKE");
            expect(ele()).toBe("The Giant");
          });
        });
        describe("collect", () => {
          it("returns a function", () => {
            expect(typeof hof.collect()).toBe("function");
          });
          it("returns a generator that emits the values of the passed generator", () => {
            const gen = hof.collect(hof.fromTo(0, 3), []);
            expect(gen()).toBe(0);
            expect(gen()).toBe(1);
            expect(gen()).toBe(2);
            expect(gen()).toBe(undefined);
          });
          it("collects the generated values in the passed array by mutating it", () => {
            const list = [];
            const gen = hof.collect(hof.fromTo(0, 3), list);
            expect(list).toEqual([]);
            gen();
            expect(list).toEqual([0]);
            gen();
            expect(list).toEqual([0, 1]);
            gen();
            expect(list).toEqual([0, 1, 2]);
            gen();
            expect(list).toEqual([0, 1, 2]);
          });
        });
      });
    }); // end point
