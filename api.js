const baseUrl = "https://wedev-api.sky.pro/api/v2/Sveta-n/comments";

const tokenURL = "https://wedev-api.sky.pro/api/user/login";

export function getPromise() {

    return fetch( baseUrl,
  {
    method: "GET",
    headers: {

      Authorization: `Bearer ${tokenURL}`,
    }
  })

.then((response) => {

  return response.json();

})

}

export function postPromise({ text, name}) {

  return fetch( baseUrl, {

    method: 'POST',
     
    body: JSON.stringify({

    text: text,

    name: name,

    forceError: true,

    headers: {

      Authorization: `Bearer ${tokenURL}`,
    }

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