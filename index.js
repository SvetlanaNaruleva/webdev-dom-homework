"use strict";
// Код писать здесь
const nameElement = document.querySelector(".add-form-name");
const textElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
const commentsElements = document.querySelectorAll(".comment");
const listCommentsElement = document.getElementById('list-comments');
const likeButtonsElements = document.querySelectorAll('.likes');
const containerPreloader = document.getElementById('container-preloader');
  const containerPreloaderPost = document.getElementById('container-preloader-post');
const addForm = document.querySelector('.add-form');

// переносим данные из разметки в JS
let comments = [
// {
//   name: "Глеб Фокин",
//   time: "12.02.22 12:18",
//   comment: "Это будет первый комментарий на этой странице",
//   likes: 3,
//   isLiked: false
// },
// {
//   name: "Варвара Н.",
//   time: "13.02.22 19:22",
//   comment: "Мне нравится как оформлена эта страница! ❤️",
//   likes: 75,
//   isLiked: false
// },
];



containerPreloader.textContent = 'Пожалуйста подождите, идет загрузка комментариев...';
containerPreloaderPost.style.display = 'none';


//   // API Получить список комментариев c Get
const fetchPromiseGet = () => {

const promiseFetch = fetch('https://wedev-api.sky.pro/api/v1/Sveta-n/comments',
  {
    method: "GET",
  })
//console.log(promiseFetch);

.then((response) => {

  //console.log(response);
  return response.json();

})
.then((responseData) => {
    console.log(responseData);
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
    renderComments();
    
  })
};
fetchPromiseGet();


//функция добвления обрабочика клика
const initEventListeners = () => {
const likesElements = document.querySelectorAll(".like-button");
for (const likesElement of likesElements) {    
  likesElement.addEventListener('click', (event) => {
    event.stopPropagation();
    const index = likesElement.dataset.index;

    console.log(comments[index].likes);
    if (comments[index].isLiked) {
      comments[index].isLiked = false;
      comments[index].likes--;
      
    } else {
      comments[index].isLiked = true;
      comments[index].likes++;
    }

    renderComments();

  });
}
};

// уязвимость 
function sanitize(text) {
    return text.replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>");
  };


// рендер
const renderComments = () => {
const commentsHtml = comments.map((comment, index) => {
  return ` <li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.time}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.comment}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comments[index].likes}</span>
          <button data-index= "${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li> `
}).join("");

listCommentsElement.innerHTML = commentsHtml;   

initEventListeners();     
answerComment();
};

// renderComments();


// функция добавления нового комментария
function addNewComment() {
 // добавление нового
  // comments.push({
  // name: nameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  // time: new Date().toLocaleString(),
  // comment: textElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  // likes: 0,
  // isLiked: ''
  // });
  // renderComments();
  postPromiseFetch();
};

// Добавить новый комментарий, метод POST
  
function postPromiseFetch() {
  const fetchPromisePost = fetch("https://wedev-api.sky.pro/api/v1/Sveta-n/comments", {

    method: 'POST',
     
    body: JSON.stringify({

    text: textElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),

    name: nameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),

    forceError: true

})

}).then((response) => {

console.log(response);

if (response.status === 201) {
  return response.json();
}else if (response.status === 500) {
  throw new Error("Сервер упал")
}else if (response.status === 400) {
  throw new Error("Недопустие количество символов")
}

// return response.json()

})
.then(() => {

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

function inputValid() {
    if (nameElement.value === "" || textElement.value === "") {
      buttonElement.disabled = true;
      nameElement.placeholder = "";
      textElement.placeholder = "";
} else {
    nameElement.placeholder = "";
    textElement.placeholder = "";
}
  nameElement.addEventListener("input", inputValid);
  textElement.addEventListener("input", inputValid);
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


// // ответ на комментарий
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