let url = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/9.3.2',
    Accept: 'application/json',
    Authorization: 'Basic c3RyaW5nOnN0cmluZw=='
  },
  body: '{"userName":"invalid","password":"P@ssw0rd123"}'
};

// Автотест для проверки генерация token c ошибкой
function testGenerateTokenError() {
  fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Всё ok');
      }
    })
    .then(json => {
      if (json.token) {
        console.log('Тест пройден: Токен успешно сгенерирован');
      } else {
        console.error('Тест не пройден: Токен не был сгенерирован');
      }
    })
    .catch(err => console.error('Тест не пройден: Ошибка - ' + err));
}

// Запуск теста
testGenerateTokenError();