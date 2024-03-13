import {getPromise, postPromise} from "./api.js"
import {renderComments} from "./render.js"
import {initEventListeners} from "./listeners.js"
// import {inputValid} from "./helpers.js"


"use strict";
// Код писать здесь
const nameElement = document.querySelector(".add-form-name");
const textElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
const containerPreloader = document.getElementById('container-preloader');
const containerPreloaderPost = document.getElementById('container-preloader-post');

// переносим данные из разметки в JS
let comments = [];


containerPreloader.textContent = 'Пожалуйста подождите, идет загрузка комментариев...';
containerPreloaderPost.style.display = 'none';


// API Получить список комментариев c Get
const fetchPromiseGet = () => {

getPromise().then((responseData) => {
    // console.log(responseData);
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        time: new Date().toLocaleString(),
        comment: comment.text,
        likes: comment.likes,
        isliked: false,
      }
    });
    // получили данные и рендерим их в приложении
    comments = appComments;
    containerPreloader.textContent = '';
    containerPreloaderPost.style.display = 'block';
    //console.log(comments)
    renderComments({comments, initEventListeners, answerComment});
    
  })
};
fetchPromiseGet();


// // функция добавления нового комментария
function addNewComment() {

  postPromiseFetch();

};

// Добавить новый комментарий, метод POST
  
function postPromiseFetch() {

postPromise({

    text: sanitize(textElement.value),

    name: sanitize(nameElement.value)

}).then(() => {

return fetchPromiseGet();

})
.then(() => {
buttonElement.disabled = false;
buttonElement.textContent = 'Написать';
nameElement.value = "";
textElement.value = "";
})
.catch((error) => {
buttonElement.disabled = false;
buttonElement.textContent = 'Написать';

if (error.message === "Сервер упал") {
  alert("Сервер упал, попробуй еще раз")
}
if (error.message === "Недопустие количество символов") {
  alert("Имя и комментарий должны быть не короче 3-х символов")
}
if (error.message === 'Failed to fetch') {
  alert('Интернет не работает, попробуйте позже');
}
console.warn(error);
})
};

//уязвимость 
function sanitize(text) {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
};


// function inputValid() {
//     if (nameElement.value === "" || textElement.value === "") {
//       buttonElement.disabled = true;
//       nameElement.placeholder = "";
//       textElement.placeholder = "";
// } else {
//     nameElement.placeholder = "";
//     textElement.placeholder = "";
// }
//   nameElement.addEventListener("input", inputValid);
//   textElement.addEventListener("input", inputValid);
// };

function inputValid() {
  if (nameElement.value === "" || textElement.value === "") {
    buttonElement.disabled = true;
    nameElement.placeholder = "";
    textElement.placeholder = "";
    return false;
  } else {
    nameElement.placeholder = "";
    textElement.placeholder = "";
    return true;
  }
};


buttonElement.addEventListener("click", () => {
  nameElement.classList.remove("error");
  textElement.classList.remove("error");
  if (nameElement.value === "" || textElement.value === "") {
    nameElement.classList.add("error");
    textElement.classList.add("error");
    return;
  }
  addNewComment();

  buttonElement.disabled = true;
  buttonElement.textContent = 'Еще чуть-чуть и все появится...';

});


// ответ на комментарий
function answerComment() {
const comment = document.querySelectorAll('.comment')
const formElementText = document.querySelector('.add-form-text')
const formElementName = document.querySelector('.add-form-name')
comment.forEach((el, index) => {
el.addEventListener('click', () => {
formElementText.value = `>${comments[index].name} \n ${comments[index].comment}`
})
});
}

console.log("It works!");