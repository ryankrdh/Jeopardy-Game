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

// async function getRandomCategories2() {
//   let res = await axios.get('https://jservice.io/api/clues?category=13615');
//   console.log(res.data);
//   for (let subData of res.data) {
//     console.log(subData.answer);
//   }
//   let categoryData = res.data.map((categoryData) => ({
//     title: categoryData.title,
//     question: categoryData.question,
//     answer: categoryData.answer,
//   }));
//   console.log(categoryData.title);
//   return categoryData;
// }

// getRandomCategories2();
// getRandomCategories();

const numberOfCategories = 6;
const numberOfQuestions = 5;
let categories = [];
let questions = [];
// **** There is a random method for JeopardyAPI. But the assessment claimed that I should figure out how to randomize it manually. The following commented out function is the JeopardyAPI random method:
// let res = await axios.get('https://jservice.io/api/random', {
//     params: { count: 6 },
//   });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// const result = shuffle([1, 2, 3, 4, 5]);
// console.log(result);

async function getRandomCategories() {
  // randomizes the list of categories and passes the 6 random categories into getCategoriesIds
  for (let i = 0; i < numberOfCategories; i++) {
    let numberRandomizer = Math.floor(Math.random() * 18418 + 1); // This will generate a random number from 1 to 18418. (max. number of categories.)
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${numberRandomizer}` },
    });
    categories.push(res.data.id);
  }
  console.log(categories);
  getCategoryIds(categories);
}

async function getCategoryIds(categories) {
  //   console.log(`getCategoryIds function: ${categories}`);
  for (let categoryId of categories) {
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${categoryId}` },
    });
    let eachCategory = res.data.clues;
    let randomizedQuestions = _.shuffle(eachCategory).splice(0, 5); // Using Fisher-Yates shuffle algorithm
    // for (let eachCategory of returnedRandomizedCategory) {
    //   let shuffleEachCategory = shuffle(eachCategory);
    //   console.log(eachCategory);
    // }
    // console.log('test');
    // console.log(result1);
    // for (let eachCategory of returnedRandomizedCategory) {
    //   for (let i = eachCategory.length - 1; i > 0; i--) {
    //     let randomFiveQuestions = [];
    //   }
    //   questions.push(eachCategory);
    // }
    // console.log(questions);
    // for (let i = 0; i < 5; i++) {
    //   console.log(res.data.clues);
    // }
    // for (let i = res.data.length)
    // for (let subData of res.data.clues) {
    //   console.log(subData.answer);
    // }
    // let clueRandomizer = Math.floor(Math.random() * 18418 + 1)
    // let categoryGroup = res.data.map((title) => ({
    //   title: categoryGroup.title,
    //   clues: categoryGroup.
    // }));
    console.log(randomizedQuestions);
    questions.push(randomizedQuestions);
  }
  console.log(questions);
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

function errorCatch(questions) {
  try {
    clickHandler(questions);
  } catch (e) {
    alert('Make sure to click on the box properly!');
  }
}
errorCatch(questions);
