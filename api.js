export function getPromise() {
    return fetch('https://wedev-api.sky.pro/api/v1/Sveta-n/comments',
  {
    method: "GET",
  })

.then((response) => {

  return response.json();

})
}