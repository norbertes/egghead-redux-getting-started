const addCounter = (list) => {
  return [...list, 0];
};

const removeCounter = (list, idx) => {
  return [
    ...list.slice(0, idx),
    ...list.slice(idx+1)
  ];
};

const incrementCounter = (list, idx) => {
  // A
  //const newArr = [...list];
  //newArr[idx]++;
  //return newArr;

  // B
  return [
    ...list.slice(0, idx),
    list[idx] + 1,
    ...list.slice(idx+1)
  ]
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};


const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};


const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log('tests passed');
