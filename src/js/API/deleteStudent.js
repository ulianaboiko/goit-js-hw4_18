// Функція для видалення студента
export const deleteStudent = (url, id) => {
  const studentUrl = `${url}/${id}`;

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
