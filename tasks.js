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
    result.set(value, key);
  });
  return result;
}

function createPairsFromObject(object) {
  return Object.entries(object);
}

function uncamelize(string, separator = ' ') {
  const charCodeA = 65;
  const charCodeZ = 90;
  const lastLetterCharCode = 122;
  const arrayOfChars = string.split('');

  let result = '';
  for (const char of arrayOfChars) {
    const charCode = char.charCodeAt();

    if (charCode >= lastLetterCharCode) return 'Неверные данные';

    if (charCode >= charCodeA && charCode <= charCodeZ)
      result += separator + String.fromCharCode(charCode + 32);
    else result += char;
  }
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
      const res = fetch(
        `http://geocode.xyz/${city}?json=1&auth=681341605353902759872x127584`
      );
      return (await res).json();
    });
    return result;
  };

  const sendParallelRequests = async () => {
    const sities = ['Minsk', 'Madrid', 'Rome'];
    const arrayOfPromises = await createArrayOfPromises(sities);
    try {
      let sitiesData = await Promise.all(arrayOfPromises);

      sitiesData.forEach(({ standard: { city, countryname } }) => {
        console.log(`${city} - ${countryname}`);
      });
    } catch (e) {
      console.log(e);
    }

    console.log('----------------------------------------');
  };

  const sendRequestPromiseRace = async () => {
    const sities = ['Paris', 'Nice'];
    const arrayOfPromises = await createArrayOfPromises(sities);
    try {
      const {
        standard: { city, countryname },
      } = await Promise.race(arrayOfPromises);
      console.log(`${city} - ${countryname}`);
    } catch (e) {
      console.log(e);
    }
    console.log('----------------------------------------');
  };

  const sendRequestWithDelay = async () => {
    const sities = ['Moscow', 'Berlin', 'Paris'];

    const promise = new Promise((resolve) => {
      setTimeout(resolve.bind(this, sities), 3000);
    });

    const arrayOfPromises = [];
    try {
      sities = await promise;
      console.log('sities: ', sities);
      arrayOfPromises = await createArrayOfPromises(sities);
      sitiesData = await Promise.all(arrayOfPromises);

      sitiesData.forEach(({ standard: { city, countryname } }) => {
        console.log(`${city} - ${countryname}`);
      });
    } catch (e) {
      console.log(e);
    }
  };

  await sendParallelRequests();
  await sendRequestPromiseRace();
  await sendRequestWithDelay();
}

workWithPromises();
