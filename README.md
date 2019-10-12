# hackathon-JS_12-13.10.2019

# макет под проект 
https://www.draw.io/?state=%7B%22ids%22:%5B%2215K5L7gnLM3ou7BduhjT9BRnTrYPj7K4X%22%5D,%22action%22:%22open%22,%22userId%22:%22116717985815687969025%22%7D#G15K5L7gnLM3ou7BduhjT9BRnTrYPj7K4X

# ссылка на задание https://trello.com/invite/b/mxCgcsUq/4585bc0ac2fdf4bcd6a82c225b4c6376/message-board

---------------------------- отображение главной страницы ----------

базовый url для запроса --- https://dash-ads.goit.co.ua/api/v1

Методы для всплывающих оповещений, должны появляться при добавлении, удалении --- axios.getΩhttps://sciactive.com/pnotify/ )

Полуение всех обьявлений в нашей базе, для отрисовки на стартовой страницы axios.get(https://dash-ads.goit.co.ua/api/v1/ads/all)
Получаем массыв с возможностью добавления дополнительных параметров 

        "totalDocs": 50,
        "limit": 10, --- максимальное количество объявлений при первом запросе 
        "hasPrevPage": false, --- наличие возможности перейти на предведущую страницу (нужно для отображения кнопки "вперед" или "назад")
        "hasNextPage": true,  --- наличие возможности перейти на предведущую страницу (нужно для отображения кнопки "вперед" или "назад")
        "page": 1, --- страница 
        "totalPages": 5, --- всего страниц 
        "pagingCounter": 1, --- сколько всего страниц отображается 
        "prevPage": null, --- наличие предведущей страницы 
        "nextPage": 2, --- какая следующая страница
        
Получение обьявления по  id --- axios.get(https://dash-ads.goit.co.ua/api/v1/ads/{ // указываем id обьявления 5d8cdf235c35f91a27d75b8f' }) , у каждого обьявления есть id который можно использовать для отображении расшыренной информации дпри клике на карточку с товаром 

Выбор лимита выдачи обявлений --- axios.get('https://dash-ads.goit.co.ua/api/v1/ads/all?limit={ лимит }&page={ номер страрницы  }')

Получение обьявлений по категориям axios.get('https://dash-ads.goit.co.ua/ads/all?category=${ номер категории }&page=${ номер страницы }')


---------------------------- авторизация  ----------

регистрация юзера --- axios.post('https://dash-ads.goit.co.ua/auth/register`, {
      email: email,
      password: password,
      name: name,
    })

при регистрации пользователя в ответ получаем обьект в котором будет вся служебная информация про юзера ! все его обьявления и его избранные, а так же token



вход для зарегистрированных юзеров --- axios.post(`https://dash-ads.goit.co.ua/auth/login`, {
    email: "test9@gmail.com",
    password: "qwerty"
})

в ответ получаем такой же обьект как и при регистрации + обязательно указать email и login при запросе иначе будет ошибка, также ошибка будет при не правильном вводе 

выход пользователя axios.post(`https://dash-ads.goit.co.ua/auth/logout`, 
    { email: email,
      password: password,
    }, {
      headers: {
      Authorization: token,
        })

обязательно указать обьект с email и password который вводили для входа в приложение и передать token, произойдет розлогирование
и старый token больше не будет подходить для входа


---------------------------- добавление обьявлений  ----------


карточка для добавления товара ---  axios.post(`https://dash-ads.goit.co.ua/ads`, {
    images : '',
    title: '',
    category: '',
    price: ',
    pho: '',
    description : ''
    }, {
        headers: {
          Authorization: this.userToken,
        },
      })  одна для всех с обязательными полями для заполнения, при добавлении обьявления оно автоматически будет лежать вверху общего поиска


удаление обьявления --- axios.delete(`https://dash-ads.goit.co.ua/ds/${adId}`, {
        headers: {
          Authorization: token,
        },
      });
передаем token юзера и по нему удаляем 
