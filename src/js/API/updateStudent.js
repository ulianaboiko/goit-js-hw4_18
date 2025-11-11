// Функція для оновлення студента
export const updateStudent = (url, id, updatedStudent) => {
  const studentUrl = `${url}/${id}`;

  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent),
  };

  fetch(studentUrl, options)
    .then((response) => {
      if (!response.ok) throw new Error(`Помилка ${response.statusText}`);
      response.json();
    })
    .then((data) => console.log("Ресурс оновлено", data))
    .catch((err) => console.error(err));
};
