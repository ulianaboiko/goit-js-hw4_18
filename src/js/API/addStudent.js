// Функція для додавання нового студента
export const addStudent = (student, url) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  };
  fetch(url, options)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log("Створено нового студента", data);
    })
    .catch((err) => console.error(err));
};
