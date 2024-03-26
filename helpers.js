export function sanitize(text) {
    return text
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  };

export function normalizeComments(comments) {
    return comments.map((comment) => {
        return {
          name: comment.author.name,
          time: new Date().toLocaleString(),
          comment: comment.text,
          likes: comment.likes,
          isliked: false,
        }
      });
}