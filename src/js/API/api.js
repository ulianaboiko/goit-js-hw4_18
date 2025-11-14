const API_URL = "http://localhost:3000/students";

// Функція для отримання всіх студентів
export const getStudents = () => {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      return response.json();
    })
    .catch((err) => console.error(err));
};

// Функція для додавання нового студента
export const addStudent = (student) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  };
  return fetch(API_URL, options)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log("Створено нового студента", data);
    })
    .catch((err) => console.error(err));
};

// Функція для оновлення студента
export const updateStudent = (id, updatedStudent) => {
  const studentUrl = `${API_URL}/${id}`;

  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent),
  };

  return fetch(studentUrl, options)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      response.json();
    })
    .then((data) => console.log("Ресурс оновлено", data))
    .catch((err) => console.error(err));
};

// Функція для видалення студента
export const deleteStudent = (id) => {
  const studentUrl = `${API_URL}/${id}`;
  const options = {
    method: "DELETE",
  };

  fetch(studentUrl, options)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      console.log(`Ресурс з id-${id} видалено`);
    })
    .catch((err) => console.error(err));
};
