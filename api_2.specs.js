let url = 'https://bookstore.demoqa.com/Account/v1/User';

let options = (userName) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/9.3.2',
    Accept: 'application/json',
    Authorization: 'Basic c3RyaW5nOnN0cmluZw=='
  },
  body: JSON.stringify({
    userName: userName,
    password: "P@ssw0rd123"
  })
});

async function createUser(userName) {
  try {
    let response = await fetch(url, options(userName));
    let json = await response.json();
    return { status: response.status, json: json };
  } catch (err) {
    console.error('error:', err);
    return null;
  }
}

async function runTests() {
  const userName = "user7";

  // Первый тест: успешное создание пользователя
  let firstResponse = await createUser(userName);
  if (firstResponse && firstResponse.status === 201) {
    console.log("Тест пройден: Пользователь успешно создан");
  } else {
    console.error("Тест не пройден: создание пользователя не удалось.", firstResponse);
    return; // Прекратить выполнение, если первый тест не прошел
  }

  // Задержка перед вторым тестом
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Второй тест: попытка создать пользователя с таким же логином
  let secondResponse = await createUser(userName);
  if (secondResponse && secondResponse.status === 406 && secondResponse.json.code === "1204") {
    console.log("Тест пройден: Пользователь уже существует");
  } else {
    console.error("Тест не пройден", secondResponse);
  }
}

// Запуск тестов
runTests();
