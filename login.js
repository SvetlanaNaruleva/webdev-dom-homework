import { loginUser, setToken, setUser, token } from "./api.js";
import { fetchPromiseGet, renderApp } from "./index.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `<h1>Страница входа</h1>
    <div class="add-form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин" />
        <input
          type="password"
          id="password-input"
          class="input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button" id="login-button">Войти</button>
    </div>`

    appElement.innerHTML = loginHtml;

    const buttonGet = document.getElementById("login-button");
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");

buttonGet.addEventListener("click", () => {
  if (!loginInput.value || !passwordInput.value) {
    alert("Пожалуйста, заполните все поля.");
    return;
}
    loginUser({
        login: loginInput.value,
        password: passwordInput.value
    }).then((responseData) => {
        // console.log(token);
        setToken(responseData.user.token);
        setUser(responseData.user.name);
        console.log(token);
    }).then(() => {
        renderApp();
    }).catch((error) => {
      if (error.message === "Сервер упал") {
        alert("Сервер упал, попробуй еще раз")
      }
      if (error.message === "Неправильный логин или пароль") {
        alert("Неправильный логин или пароль")
      }
      if (error.message === 'Failed to fetch') {
        alert('Интернет не работает, попробуйте позже');
      }
      console.warn(error);
    })
});
};