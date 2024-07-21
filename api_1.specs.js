let url = 'https://bookstore.demoqa.com/Account/v1/User';
// Автотест для проверки успешной создания рандомного пользователя
function generateRandomUser() {
  const randomNum = Math.floor(Math.random() * 1000000);
  return {
    userName: `user${randomNum}`,
    password: `P@ssw0rd${randomNum}`
  };
}

let user = generateRandomUser();

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/9.3.2',
    Accept: 'application/json',
    Authorization: 'Basic c3RyaW5nOnN0cmluZw=='
  },
  body: JSON.stringify(user)
};

fetch(url, options)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Не удалось создать пользователя: ' + res.status);
    }
  })
  .then(json => console.log('Пользователь успешно создан:', json))
  .catch(err => console.error('Ошибка:', err));
