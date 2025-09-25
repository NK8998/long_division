const findClosestRoot = (digit, root = 0) => {
  while (root * root <= digit) {
    root++;
  }
  return root - 1;
};

const findMatchingNum = (target, start = 0) => {
  let original = start;
  let num = 0;

  while (start * num <= target) {
    start++;
    num++;
  }

  const adjustedNum = num - 1;
  return { num: adjustedNum, _divisor: original + adjustedNum };
};

const getDroppedNum = (rem, num) => {
  const stringNum = String(num);
  return Number(
    String(rem) +
      (num === 0 ? "00" : stringNum.length < 2 ? "0" + stringNum : stringNum)
  );
};

const sqrt = (num) => {
  const sArray = String(num);
  const pairArr = [];
  for (let i = sArray.length - 1; i >= 0; ) {
    pairArr.unshift(Number((sArray[i - 1] ?? "00") + sArray[i]));
    i -= 2;
  }

  const result = [];
  let remainder = 0; // drop and concat with remainder from previos operation
  let quotient = 0;
  let droppedNum = 0;
  let divisor = 0;

  quotient = findClosestRoot(pairArr[0]);
  remainder = pairArr[0] - quotient * quotient;
  result.push(quotient);

  let i = 0;
  while (true) {
    if (i > 14) break;
    i++;

    droppedNum = getDroppedNum(remainder, pairArr[i] ?? 0);

    const start = quotient * 20;
    const { num, _divisor } = findMatchingNum(droppedNum, start);

    divisor = _divisor;
    quotient = Number(String(quotient) + String(num));
    remainder = droppedNum - divisor * num;

    if (i === pairArr.length) result.push(".");
    result.push(num);
  }

  return Number(result.join(""));
};

const logger = (func) => {
  return (...args) => {
    let start = performance.now();
    func.apply(this, args);
    let end = performance.now();

    console.log(end - start);
  };
};

const func1 = () => console.log(Math.sqrt(144));
logger(func1)();

const func2 = () => console.log(sqrt(144));
logger(func2)();
