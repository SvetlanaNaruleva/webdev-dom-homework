import { format } from "date-fns";

export function sanitize(text) {
    return text
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      // .trim() // для удаления пробелов в начале и конце строки
      .replaceAll(" ", ""); //для удаления всех пробелов внутри строки
  };

export function normalizeComments(comments) {
    return comments.map((comment) => {
        return {
          name: comment.author.name,
          // time: new Date().toLocaleString(),
          time: format(new Date(comment.date), 'yyyy-MM-dd HH:mm:ss'),
          comment: comment.text,
          likes: comment.likes,
          isliked: false,
        }
      });
}