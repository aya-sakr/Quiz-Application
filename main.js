// select Element
let counter = document.querySelector(".Count span");
let bullets = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit");
let resultContainer = document.querySelector(".result");
let bulletsContainer = document.querySelector(".bullets");
// set options
let currentIndex = 0;
let rightAnswer = 0;

function getData() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonObject = JSON.parse(this.responseText);
      let objLength = jsonObject.length;
      countNum(objLength);
      quesFunction(jsonObject[currentIndex], objLength);

      submitButton.onclick = function () {
        let rAnswer = jsonObject[currentIndex].right_answer;
        currentIndex++;
        getAnswer(rAnswer, objLength);

        // remove quiz-area & answer-area

        quizArea.innerHTML = "";
        answerArea.innerHTML = "";

        quesFunction(jsonObject[currentIndex], objLength);

        checkBullet();
        showData(objLength);
      };
    }
  };

  myRequest.open("GET", "question.json");
  myRequest.send();
}

getData();

function countNum(num) {
  counter.innerHTML = num;
  // creat spans
  for (i = 0; i < num; i++) {
    // creat span
    let bulletsSpan = document.createElement("span");

    // check if its first span
    if (i === 0) {
      bulletsSpan.className = "on";
    }

    // append  bulletsSpan to bullets

    bullets.appendChild(bulletsSpan);
  }
}

function quesFunction(obj, lengthe) {
  if (currentIndex < lengthe) {
    // creat  title (h2)
    let title = document.createElement("h2");

    // creat text of title
    let titleText = document.createTextNode(obj["title"]);

    //append text of title to title
    title.appendChild(titleText);

    //append title to quiz-area
    quizArea.appendChild(title);

    // creat component of answer area

    for (i = 1; i <= 4; i++) {
      // creat  main div

      let mainDiv = document.createElement("div");
      // creat class to mainDiv
      mainDiv.className = "answer";

      // creat input

      let radioInput = document.createElement("input");

      // set name + id + type for input

      radioInput.type = "radio";
      radioInput.name = "question";
      radioInput.id = `answer-${i}`;
      radioInput.dataset.answer = obj[`answer-${i}`];

      // creat lable
      let theLable = document.createElement("label");

      // add for Attribute
      theLable.htmlFor = `answer-${i}`;

      // creat text of lable
      let lableText = document.createTextNode(obj[`answer-${i}`]);

      // append lableText to lable

      theLable.appendChild(lableText);

      // append lable + input to mainDiv
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLable);

      // append mainDiv to answer-are
      answerArea.appendChild(mainDiv);

      //   make first answer checked
      if (i === 1) {
        radioInput.checked = true;
      }
    }
  }
}

// creat function to get answer

function getAnswer(rAnswer, countLength) {
  let answer = document.getElementsByName("question");
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].checked) {
      let choosenAnswer = answer[i].dataset.answer;

      if (rAnswer === choosenAnswer) {
        rightAnswer++;
      }
    }
  }
}

// cj=heck bullets

function checkBullet() {
  let allBullets = document.querySelectorAll(".bullets .spans span");
  Array.from(allBullets).forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showData(count) {
  let resultes;
  if (currentIndex === count) {
    quizArea.remove();
    answerArea.remove();
    submitButton.remove();
    bulletsContainer.remove();
    if (rightAnswer > count / 2 && rightAnswer < count) {
      resultes = `<span class = "good"> good </span> ,${rightAnswer} from ${count}`;
    } else if (rightAnswer === count) {
      resultes = `<span class = "perfect">perfect </span> ,All Answer is good`;
    } else {
      resultes = `<span class = "bad">bad </span> , ${rightAnswer} from ${count}`;
    }

    resultContainer.innerHTML = resultes;
    resultContainer.className = "done";
  }
}

let newDate = new Date("12 31 2023  23:59:59").getTime();
console.log(newDate);

let counterr = new Date().getTime();
let diffDate = newDate - counterr;
console.log(counterr);

let days = Math.floor(diffDate /(1000 * 60 * 60 * 24))
console.log(days)


let hours = Math.floor(diffDate % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
console.log(hours)

let minutes = Math.floor(diffDate %(1000 * 60 *60 ) / (1000 * 60)) 
console.log(minutes)                       

let seconds = Math.floor(diffDate %(1000 *60 ) / 1000)
console.log(seconds)
document.querySelector(".days").innerHTML = days
document.querySelector(".hours").innerHTML = hours
document.querySelector (".minutes").innerHTML = minutes
document.querySelector(".seconds").innerHTML = seconds
