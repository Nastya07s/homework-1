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

console.log(fibonacci(610));
