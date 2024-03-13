const listCommentsElement = document.getElementById('list-comments');

export const renderComments = ({comments, initEventListeners, answerComment}) => {
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
    
    listCommentsElement.innerHTML = commentsHtml;   
    
    initEventListeners({comments, initEventListeners, answerComment});     
    answerComment();
    };