import {getPromise, postPromise} from "./api.js";
import {renderComments} from "./render.js";
import { normalizeComments } from "./helpers.js";


"use strict";
// переносим данные из разметки в JS
export let comments = [];

export function setComments(newComments) {
  comments = newComments;
}

// API Получить список комментариев c Get
export const fetchPromiseGet = () => {

  getPromise().then((responseData) => {
    // console.log(responseData);
    const appComments = normalizeComments(responseData.comments)
    // получили данные и рендерим их в приложении
    comments = appComments;
    //console.log(comments)
    renderComments({comments});
    
  }).catch((error) => {
    if (error.message === "Сервер упал") {
      alert("Сервер упал, попробуй еще раз")
    }
    if (error.message === 'Failed to fetch') {
      alert('Интернет не работает, попробуйте позже');
    }
    console.warn(error);
  })
};
fetchPromiseGet();

console.log("It works!");