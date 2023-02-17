const CONFIG_API = {
  url: "https://sb-cats.herokuapp.com/api/2/tatarnikovatatiana",
  // url: "https://cats.petiteweb.dev/api/single/tatarnikovatatiana",
  headers: {
    "Content-type": "application/json",
  },
};

export class API {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _onResponse(res) {
    // обрабатываем ответ от сервера
    return res.ok
      ? res.json()
      : Promise.reject({ ...res, message: "Ошибка сервера" });
  }
  getAllCats() {
    // у сервера запрашиваем всех котов
    return fetch(`${this._url}/show`, {
      method: "GET",
    }).then(this._onResponse);
  }
  addNewCat(data) {
    // добавляем в базу нового кота
    return fetch(`${this._url}/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this._onResponse);
  }

  deleteCatById(idCat) {
    return fetch(`${this._url}/delete/${idCat}`, {
      method: "DELETE",
    }).then(this._onResponce);
  }
}

export const api = new API(CONFIG_API);
