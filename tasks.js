function fibonacci(endNumber) {
  if (endNumber < 0) return 'Число не должно быть меньше 0';
  if (endNumber === 0) return 0;
  if (endNumber === 1) return 1;
  const numsFibonacci = [0, 1];
  while (numsFibonacci[numsFibonacci.length - 1] < endNumber) {
    const addend1 = numsFibonacci[numsFibonacci.length - 1];
    const addend2 = numsFibonacci[numsFibonacci.length - 2];
    const nextNumber = addend1 + addend2;

    if (nextNumber >= endNumber) break;

    numsFibonacci.push(nextNumber);
  }
  return numsFibonacci;
}

function difference(firstArray, secondArray) {
  const union = (setA, setB) => {
    setB.forEach((el) => setA.add(el));
    return setA;
  };
  const setA = new Set(firstArray.flat(Infinity));
  const setB = new Set(secondArray.flat(Infinity));
  return [...union(setA, setB)];
}

function difference1(firstArray, secondArray) {
  const newFirstArray = firstArray.flat(Infinity);
  const newSecondArray = secondArray.flat(Infinity);
  const result = [...newFirstArray];
  newSecondArray.forEach((el) => {
    if (!newFirstArray.includes(el)) result.push(el);
  });
  return result;
}

function caseInsensitiveSearch(text, searchText) {
  const regExp = new RegExp(searchText, 'i');
  return text.search(regExp) === -1 ? 'Not Matched' : 'Matched';
}

function transformObject(object) {
  const keys = Object.keys(object);
  const result = new Map();
  keys.forEach((key) => {
    const value = object[key];
    result.set(value, key)
  });
  return result;
}

console.log(transformObject({ key: { key: 3 } }));

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
  array.reduce(
    (acc, promise) => acc.then(() => promise.then(log)),
    Promise.resolve()
  );
}

async function workWithPromises() {
  const createArrayOfPromises = async (array) => {
    const result = await array.map(async (city) => {
      const res = await fetch(
        `http://geocode.xyz/${city}?json=1&auth=681341605353902759872x127584`
      );
      const data = await res.json();
      return data;
    });
    return result;
  };

  let sities = ['Minsk', 'Madrid', 'Rome'];
  let arrayOfPromises = await createArrayOfPromises(sities);

  let sitiesData = await Promise.all(arrayOfPromises);
  sitiesData.forEach(({ standard: { city, countryname } }) => {
    console.log(`${city} - ${countryname}`);
  });

  console.log('----------------------------------------');

  sities = ['Paris', 'Nice'];
  arrayOfPromises = await createArrayOfPromises(sities);

  const {
    standard: { city, countryname },
  } = await Promise.race(arrayOfPromises);
  console.log(`${city} - ${countryname}`);

  console.log('----------------------------------------');

  sities = ['Moscow', 'Berlin', 'Paris'];

  const promise = new Promise((resolve) => {
    setTimeout(resolve.bind(this, sities), 3000);
  });

  arrayOfPromises = [];
  promise
    .then(async (sities) => {
      console.log('sities: ', sities);
      arrayOfPromises = await createArrayOfPromises(sities);
    })
    .then(async () => {
      sitiesData = await Promise.all(arrayOfPromises);

      sitiesData.forEach(({ standard: { city, countryname } }) => {
        console.log(`${city} - ${countryname}`);
      });
    });
}

// workWithPromises();
