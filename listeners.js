import {renderComments} from "./render.js"

//функция добвления обрабочика клика
export const initEventListeners = ({comments, initEventListeners, answerComment}) => {
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
    
        renderComments({comments, initEventListeners, answerComment});
    
      });
    }
    };

   // функция добавления нового комментария
// function addNewComment() {

//     postPromiseFetch();
  
//   };

