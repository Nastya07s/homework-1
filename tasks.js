function fibonacci(endNumber) {
  if (endNumber === 0) return [];
  const numsFibonacci = [0, 1];
  while (numsFibonacci[numsFibonacci.length - 1] !== endNumber) {
    const addend1 = numsFibonacci[numsFibonacci.length - 1];
    const addend2 = numsFibonacci[numsFibonacci.length - 2];
    numsFibonacci.push(addend1 + addend2);
  }
  numsFibonacci.pop();
  return numsFibonacci;
}

function difference(firstArray, secondArray) {
  const union = (setA, setB) => {
    setB.forEach((el) => setA.add(el));
    return setA;
  };
  const setA = new Set(firstArray.flat(Infinity));
  const setB = new Set(secondArray.flat(Infinity));
  return union(setA, setB);
}

function caseInsensitiveSearch(text, searchText) {
  const regExp = new RegExp(searchText, 'i');
  return text.search(regExp) === -1 ? 'Not Matched' : 'Matched';
}

function transformObject(object) {
  const keys = Object.keys(object);
  const result = {};
  keys.forEach((key) => {
    const value = object[key];
    result[value] = key;
  });
  return result;
}

function createPairsFromObject(object) {
  return Object.entries(object);
}

function uncamelize(string, separator = ' ') {
  let result = '';
  string.split('').forEach((char) => {
    const charCode = char.charCodeAt();
    if (charCode > 64 && charCode < 91) {
      result += separator + String.fromCharCode(charCode + 32);
    } else result += char;
  });
  return result;
}

function countOccurrence(string, substring) {
  const regExp = new RegExp(substring, 'g');
  return string.match(regExp).length;
}

function makeFlatAndSort(array) {
  const flattenDeep = (arr) => {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
      []
    );
  };
  return flattenDeep(array).sort((a, b) => a - b);
}

function deleteNullAndUndefined(array, callback) {
  const newArray = array.filter(Boolean);
  setTimeout(callback.bind(this, newArray), 5000);
}

function returnPromiseAfterDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 6000);
  });
}

function resolveSeriesPromises(array) {
  const log = (result) => console.log(result);
  array.reduce((acc, promise) => acc.then(() => promise.then(log)), Promise.resolve());
}

resolveSeriesPromises([
  new Promise((resolve) => {
    setTimeout(resolve.bind(this, 1), 1000);
  }),
  new Promise((resolve) => {
    setTimeout(resolve.bind(this, 6), 6000);
  }),
]);
