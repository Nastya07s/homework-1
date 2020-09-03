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

console.log(difference([1, 2, 3], [100, 2, 1, 10]));
