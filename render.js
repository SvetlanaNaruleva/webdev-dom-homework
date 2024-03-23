const listCommentsElement = document.getElementById('list-comments');

export const renderComments = ({comments, initEventListeners, answerComment}) => {
    const appElement = document.getElementById("app");
    const commentsHtml = comments
    .map((comment, index) => {
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

    const appHtml = `<div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
    </div>
  </div>`
    
    listCommentsElement.innerHTML = commentsHtml;   

    appElement.innerHTML = appHtml; 
    
    initEventListeners({comments, initEventListeners, answerComment});     
    answerComment();
    };