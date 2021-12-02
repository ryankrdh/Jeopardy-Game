// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

//
//
//
//
//
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

//
//
//
//

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

// getCategoryIds();

// function getCategory(catId) {}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

// async function fillTable() {}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

// function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

// function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

// function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

// async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
