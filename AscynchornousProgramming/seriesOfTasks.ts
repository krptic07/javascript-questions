//How would you implement a function to execute an array of asynchronous tasks
//sequentially, collecting both resolved values and errors?

const returnRandomPromise = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const randomValue: number = Math.floor(Math.random() * 10);
    if (randomValue > 5) {
      resolve(randomValue);
    } else {
      reject(`error: Value less than 5, ${randomValue}`);
    }
  });

const promisesArray: (() => Promise<number>)[] = [
  returnRandomPromise,
  returnRandomPromise,
  returnRandomPromise,
  returnRandomPromise,
  returnRandomPromise,
];

const exequtePromiseSequentially = async (
  promisesArray: (() => Promise<number>)[]
) => {
  const responses: number[] = [];
  const errors: string[] = [];
  for (let promise of promisesArray) {
    try {
      const response: number = await promise();
      responses.push(response);
    } catch (err) {
      errors.push(err);
    }
  }
  return { responses, errors };
};

exequtePromiseSequentially(promisesArray)
  .then((response) => console.log(response))
  .catch((err) => {
    throw new Error("error");
  });

const executeRecursively = async (tasks: (() => Promise<number>)[]) => {
  let results: number[] = [];
  let errors: string[] = [];

  const helper = async (ptr: number = 0) => {
    if (ptr === tasks.length) {
      return;
    } else {
      try {
        const response: number = await tasks[ptr]();
        results.push(response);
      } catch (err) {
        errors.push(err);
      } finally {
        await helper(ptr + 1);
      }
    }
  };

  await helper();

  return { results, errors };
};

executeRecursively(promisesArray)
  .then((result) => console.log(result))
  .catch((err) => {
    throw new Error();
  });
