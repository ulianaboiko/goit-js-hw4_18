// Функція для отримання всіх студентів
export const getStudents = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      response.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};
