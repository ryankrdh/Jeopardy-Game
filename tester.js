//  https://jservice.io/api/category?id=18418
//
//
//
//
//

// async function getRandomCategories() {
//   let numberRandomizer = Math.floor(Math.random() * 18418 + 1); // This will generate a random number from 1 to 18418. (max. number of categories.)

//   //   let res = await axios.get('https://jservice.io/api/category', {
//   //     params: { id: `${numberRandomizer}` },
//   //   });
//   let res = await axios.get('https://jservice.io/api/random', {
//     params: { count: 5 },
//   });
//   let dataTest = res.data;
//   let randomTester = Math.floor(Math.random() * dataTest.length);
//   console.log(dataTest.length);
//   console.log(randomTester);
//   console.log(res.data);
//   console.log(res.data.title);
// }

async function getRandomCategories2() {
  let res = await axios.get('https://jservice.io/api/clues?category=2');
  console.log(res);
  for (let subData of res.data) {
    console.log(subData.answer);
  }
  let categoryData = res.data.map((categoryData) => ({
    title: categoryData.title,
    question: categoryData.question,
    answer: categoryData.answer,
  }));
  console.log(categoryData.title);
  return categoryData;
}

getRandomCategories2();
// getRandomCategories();

const numberOfCategories = 6;
const numberOfQuestions = 5;
let categories = [];

// **** There is a random method for JeopardyAPI. But the assessment claimed that I should figure out how to randomize it manually. The following commented out function is the JeopardyAPI random method:
// let res = await axios.get('https://jservice.io/api/random', {
//     params: { count: 6 },
//   });

async function getRandomCategories() {
  for (let i = 0; i < numberOfCategories; i++) {
    let numberRandomizer = Math.floor(Math.random() * 18418 + 1); // This will generate a random number from 1 to 18418. (max. number of categories.)
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${numberRandomizer}` },
    });
    categories.push(res.data.id);
  }
  //   console.log(categories);
  getCategoryIds(categories);
}

async function getCategoryIds(categories) {
  console.log(`getCategoryIds function: ${categories}`);
  for (let categoryId of categories) {
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${categoryId}` },
    });
    // console.log(res.data.clues);
    for (let i = res.data.clues.length - 1; i < 5; i++) {
      console.log(res.data.clues);
    }
    // for (let i = res.data.length)
    // for (let subData of res.data.clues) {
    //   console.log(subData.answer);
    // }
    // let clueRandomizer = Math.floor(Math.random() * 18418 + 1)
    // let categoryGroup = res.data.map((title) => ({
    //   title: categoryGroup.title,
    //   clues: categoryGroup.
    // }));
  }
  /** Return object with data about a category:
   *
   *  Returns { title: "Math", clues: clue-array }
   *
   * Where clue-array is:
   *   [
   *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
   *      {question: "Bell Jar Author", answer: "Plath", showing: null},
   *      ...
   *   ]
   */
}

getRandomCategories();
