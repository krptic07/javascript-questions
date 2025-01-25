// Run N async tasks in series

const runTasksInSeries = async (tasks) => {
  let results = [];
  for (let i = 0; i < tasks.length; i++) {
    try {
      const result = await tasks[i]();
      results.push(results.join("") + result);
    } catch (err) {
      console.log(err);
    }
  }
  return results;
};

const task1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000));
const task2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2 completed"), 500));
const task3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3 completed"), 1500));

runTasksInSeries([task1, task2, task3])
  .then((results) => console.log("All tasks completed:", results))
  .catch((err) => console.log("Error occurred:", err));
