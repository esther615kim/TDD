const hof = {};

hof.identity = function (x) {
  return x;
};

hof.identityf = function (args) {
  function insideFunc() {
    return args;
  }
  return insideFunc;
};

hof.add = function (a, b) {
  return a + b;
};

hof.sub = function (a, b) {
  return a - b;
};

hof.mul = function (a, b) {
  return a * b;
};

hof.inc = function (a) {
  return a + 1;
};

hof.addf = function (a) {
  function insideFunc(b) {
    return a + b;
  }
  return insideFunc;
};

hof.curry = function (arg, a) {
  function insideFunc(b) {
    return arg(a, b);
  }
  return insideFunc;
};

hof.liftf = function (func) {
  //   let counter = 0;
  //   let b;

  //   function insideFunc(a) {
  //     counter++;
  //     if (b === undefined) b = a;
  //     if (counter < 2) return insideFunc;
  //     else {
  //       return arg(a, b);
  //     }
  //   }
  //   return insideFunc;

  return (num1) => {
    return (num2) => {
      return func(num1, num2);
    };
  };
};

hof.twice = function (func) {
  return (n) => {
    return func(n, n);
  };
};
hof.once = function (func) {
  let isInvoked = false;
  return (a) => {
    let firstValue;
    if (!isInvoked) {
      isInvoked = true;
      firstValue = func(a);
      return func;
    }
    return firstValue;
  };
};

hof.composeu = function (func1, func2) {
  function insideFunc(num) {
    return func2(func1(num));
  }
  return insideFunc;
};

hof.composeb = function (func1, func2) {
  function insideFunc(num1, num2, num3) {
    return func2(func1(num1, num2), num3);
  }
  return insideFunc;
};

hof.limit = function (func, num) {
  let count = 0;
  function insideFunc(a, b) {
    count++;
    if (count <= num) return func(a, b);
  }
  return insideFunc;
};

hof.from = function (num) {
  return () => {
    return num++;
  };
};

hof.to = function (func, num) {
  return () => {
    const value = func();
    if (value < num) return value;
  };
};

hof.fromTo = function (num1, num2) {
  return () => {
    if (num1 < num2) return num1++;
  };
};

hof.element = function (array, generator) {
  let generatorIsFunction = false;
  let currentElement = 0;
  if (typeof generator === "function") generatorIsFunction = true;
  return () => {
    if (generatorIsFunction) {
      currentElement = generator();
    } else {
      let output = array[currentElement];
      currentElement++;
      return output;
    }
    return array[currentElement];
  };
};

hof.collect = function (func, arr) {
  return () => {
    const currentElement = func();
    if (currentElement !== undefined) arr.push(currentElement);
    return arr[arr.indexOf(currentElement)];
  };
};
