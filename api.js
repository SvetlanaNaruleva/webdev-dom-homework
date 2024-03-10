export function getPromise() {

    return fetch('https://wedev-api.sky.pro/api/v1/Sveta-n/comments',
  {
    method: "GET",
  })

.then((response) => {

  return response.json();

})

}

export function postPromise({ text, name}) {

  return fetch("https://wedev-api.sky.pro/api/v1/Sveta-n/comments", {

    method: 'POST',
     
    body: JSON.stringify({

    text: text,

    name: name,

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
  
  })
}