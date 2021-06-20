const answers = [];
const choice = document.querySelectorAll(".questions");
const count = document.querySelector("#count");
const correct = document.querySelector("#correct");
const wrong = document.querySelector("#wrong");

//! Event Listener
// Load answers
window.addEventListener("load", () => {
    fetch("data/answers.json")
        .then((response) => response.json())
        .then((data) => {
            data.answers.forEach((item) => {
                answers.push(item);
            });
        });
});

choice.forEach((item) => {
    item.addEventListener("click", showAnswers);
});

//! function
function showAnswers(answer) {
    let answer_value = answer.srcElement.value;
    let answer_question_id = answer.srcElement.id;
    let answer_question_group = answer.srcElement.name;

    for (i = 0; i < choice.length; i++) {
        if (choice[i].type === "radio") {
            if (choice[i].checked && choice[i].value == answer_value) {
                checkAnswers(answer_question_id, answer_value, answer_question_group);
            }
        }
    }
}

function checkAnswers(answer_question_id, answer_value, answer_question_group) {
    let index = Number.parseInt(answer_question_group) - 1;

    if (answer_value === answers[index].answer) {
        count.textContent++;
        correct.textContent++;
        document.getElementById(answer_question_id).parentElement.classList.add("success");
    } else {
        count.textContent--;
        wrong.textContent++;
        document.getElementById(answer_question_id).parentElement.classList.add("fail");
    }

    disableRadioButtons(answer_question_group);
}

function disableRadioButtons(e) {
    let items = document.getElementsByName(e);

    items.forEach((item) => {
        item.disabled = true;
    });
}