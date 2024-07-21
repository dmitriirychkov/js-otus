let url = 'https://bookstore.demoqa.com/Account/v1/User';

let createUserOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ userName: 'user88', password: 'P@ssw0rd123' })
};

let loginUserOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ userName: 'user88', password: 'wrongPassword' })
};

// Автотест для создания пользователя
fetch(url, createUserOptions)
  .then(res => res.json())
  .then(json => {
    console.log('Ответ', json);
    if (json.userID) {
      console.log('Пользователь успешно создан');
    } else {
      console.error('Не удалось создать пользователя');
    }

    // Подождать несколько секунд перед повторным вводом логина
    setTimeout(() => {
      // Автотест для повторного ввода логина с невалидным паролем
      fetch(url, loginUserOptions)
        .then(res => res.json())
        .then(json => {
          console.log('Вход в систему:', json);
          if (json.code === '1207') {
            console.log('Паролем не верный, отказ во входе в систему');
          } else {
            console.error('Ошибка! Пароль введён не верно!');
          }
        })
        .catch(err => console.error('Логин не верный:', err));
    }, 5000); // Задержка в 5 секунд
  })
  .catch(err => console.error('Ошибка создания пользователя:', err));
