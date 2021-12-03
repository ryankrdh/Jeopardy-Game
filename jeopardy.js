'use strict';

// Learned how to show/hide loading page: https://www.geeksforgeeks.org/how-to-show-page-loading-div-until-the-page-has-finished-loading/
$(document).on('readystatechange', function () {
  if (document.readyState !== 'complete') {
    // if the page isn't loaded yet, play the loading page.
    $('body').css('display', '');
    $('.loader').show();
    $('.loaderText').show();
  } else {
    $('.loader').hide();
    $('.loaderText').hide();
    myFunction();
    $('body').show();
  }
});

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
  getCategoryIds(categories); // calls this function with the parameter of 6 randomized categories.
}

async function getCategoryIds(categories) {
  // this function will grab the 6 randomized categories and filter and randomize the data.
  for (let categoryId of categories) {
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${categoryId}` },
    });
    let eachCategory = res.data.clues;
    let filteredQuestionData = eachCategory.map((categoryInfo) => ({
      // filtering the data to the ones we need only.
      title: res.data.title,
      question: categoryInfo.question,
      answer: categoryInfo.answer,
    }));
    // shuffle and condense the data.
    // Using Fisher-Yates shuffle algorithm: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let randomizeAndFilter = _.shuffle(filteredQuestionData).splice(0, 5);
    questions.push(randomizeAndFilter);
  }
  console.log(questions);
  fillCategoriesTable(categories);
  clickHandler(questions);
}

// Creating the table
function myFunction() {
  $('body').prepend('<button class="restart">Restart Game</button>'); // restart button
  $('body').prepend(`<table class="jeopardyTable"></table>`);
  $('.restart').on('click', function () {
    location.reload();
  });
  let $table = $(
    `<thead>
            <tr class="categoryRow">
                <td id="0-C"></td>
                <td id="1-C"></td>
                <td id="2-C"></td>
                <td id="3-C"></td>
                <td id="4-C"></td>
                <td id="5-C"></td>
            </tr>
        </thead>
        <tbody>
            <tr class="clues1Row">
                <td id="0-0"><b>?</b></td>
                <td id="1-0"><b>?</b></td>
                <td id="2-0"><b>?</b></td>
                <td id="3-0"><b>?</b></td>
                <td id="4-0"><b>?</b></td>
                <td id="5-0"><b>?</b></td>
            </tr>
                <td id="0-1"><b>?</b></td>
                <td id="1-1"><b>?</b></td>
                <td id="2-1"><b>?</b></td>
                <td id="3-1"><b>?</b></td>
                <td id="4-1"><b>?</b></td>
                <td id="5-1"><b>?</b></td>
            <tr class="clues2Row">
                <td id="0-2"><b>?</b></td>
                <td id="1-2"><b>?</b></td>
                <td id="2-2"><b>?</b></td>
                <td id="3-2"><b>?</b></td>
                <td id="4-2"><b>?</b></td>
                <td id="5-2"><b>?</b></td>
            </tr>
            <tr class="clues3Row">
                <td id="0-3"><b>?</b></td>
                <td id="1-3"><b>?</b></td>
                <td id="2-3"><b>?</b></td>
                <td id="3-3"><b>?</b></td>
                <td id="4-3"><b>?</b></td>
                <td id="5-3"><b>?</b></td>
            </tr>
            <tr class="clues4Row">
                <td id="0-4"><b>?</b></td>
                <td id="1-4"><b>?</b></td>
                <td id="2-4"><b>?</b></td>
                <td id="3-4"><b>?</b></td>
                <td id="4-4"><b>?</b></td>
                <td id="5-4"><b>?</b></td>
            </tr>
        </tbody>
        `
  );
  $('.jeopardyTable').append($table);
  getRandomCategories();
}

async function fillCategoriesTable(categories) {
  // this function will use the categories array and call the category names using AJAX
  categories.forEach(async function (item, i) {
    let res = await axios.get('https://jservice.io/api/category', {
      params: { id: `${item}` },
    });
    let categoryReceived = res.data.title;
    $(`#${i}-C`).append(`${categoryReceived}`);
  });
}

function clickHandler(questions) {
  // this will show questions or answers on click depending on the status.
  $('td').on('click', function (evt) {
    // this if statement checks to see if the question is already showing, if it is, it will show the answer
    // console.log(evt.target);
    if (evt.target.classList.value === 'showing') {
      let evtId = evt.target.id;
      let categoryId = evtId.charAt(0);
      let cluesId = evtId.charAt(2);
      let questionId = Object.values(questions[categoryId][cluesId])[2];
      if (questionId === '' || questionId === '=') {
        // This is in case the API question data is empty.
        questionId = 'bonus points!(API did not hold any answers)';
      }
      $(evt.target).empty();
      $(evt.target).append(`${questionId}`);
      evt.target.classList.add('showing');
    } else {
      // this will show the question if it hasn't been showing yet.
      let evtId = evt.target.id;
      let categoryId = evtId.charAt(0);
      let cluesId = evtId.charAt(2);
      let questionId = Object.values(questions[categoryId][cluesId])[1];
      if (questionId === '' || questionId === '=') {
        // This is in case the API question data is empty.
        questionId = 'bonus points!(API did not hold any questions)';
      }
      $(evt.target).empty();
      $(evt.target).append(`${questionId}`);
      evt.target.classList.add('showing');
    }
  });
}

function setupAndStart() {
  $('.restart').on('click', function () {
    // document.body.innerHTML = '';
    document.reload();
  });
}

// QUESTION: how to get rid of type error when clicked on ?
