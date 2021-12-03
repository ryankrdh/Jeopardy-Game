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

async function getRandomCategories() {
  // randomizes the list of categories and passes the 6 random categories into getCategoriesIds
  for (let i = 0; i < numberOfCategories; i++) {
    let numberRandomizer = Math.floor(Math.random() * 18418 + 1); // This will generate a random number from 1 to 18418. (max. number of categories.)
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${numberRandomizer}` },
    });
    categories.push(res.data.id);
  }
  //   console.log(categories);
  getCategoryIds(categories); // calls this function with the parameter of 6 randomized categories.
}

async function getCategoryIds(categories) {
  // this function will grab the 6 randomized categories and filter and randomize the data.
  //   console.log(`getCategoryIds function: ${categories}`);
  for (let categoryId of categories) {
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${categoryId}` },
    });
    let eachCategory = res.data.clues;
    let filteredQuestionData = eachCategory.map((categoryInfo) => ({
      // filtering the data to the ones we need only.
      //   QUESTIONS: how do I make the key value pairs for question, answer, and showing all in clues? See example at top
      title: res.data.title,
      question: categoryInfo.question,
      answer: categoryInfo.answer,
      showing: null,
    }));
    // console.log('Not shuffled');
    // console.log(filteredQuestionData);
    // shuffle and condense the data.
    let randomizeAndFilter = _.shuffle(filteredQuestionData).splice(0, 5); // Using Fisher-Yates shuffle algorithm
    questions.push(randomizeAndFilter);
  }
  console.log('shuffled and condensed');
  console.log(questions);
  fillTable(questions);
  //   console.log(questions);

  //   console.log(questions);
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

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(questions) {
  //   console.log(questions[0].title);
  questions.forEach(function (item, i) {
    console.log(Object.values(item[i]));
  });
  //   for (let i = 0; i < numberOfCategories; i++) {
  //     $('.tableHead').append(`<tr>${questions[0]}</tr>`);
  //   }
}

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

//
//
//
getRandomCategories();
fillTable();
