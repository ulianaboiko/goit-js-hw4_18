import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./API/api";

import Handlebars from "handlebars";
import studentSource from "bundle-text:../student.hbs";
const studentTempl = Handlebars.compile(studentSource);

const newStudentForm = document.querySelector(".add-student-form");
const getBtn = document.querySelector("#get-students-btn");
const tableStudents = document.querySelector(".students");

// Функція для відображення студентів у таблиці
const renderStudents = (students) => {
  tableStudents.innerHTML = studentTempl({ students });
};

getBtn.addEventListener("click", () =>
  getStudents()
    .then((data) => renderStudents(data))
    .catch((err) => console.error(err))
);

const handleAddStudent = (event) => {
  event.preventDefault();

  const form = event.target;
  const newStudent = {
    name: form.stName.value.trim(),
    age: parseInt(form.stAge.value),
    course: form.stCourse.value.trim(),
    skills: form.stSkills.value.split(",").map((s) => s.trim()),
    email: form.stEmail.value.trim(),
    isEnrolled: form.stEnroled.checked,
  };

  form.reset();
  addStudent(newStudent)
    .then(() => getStudents())
    .then((data) => renderStudents(data))
    .catch((err) => console.error("Помилка POST:", err));
};
newStudentForm.addEventListener("submit", handleAddStudent);

const handleUpdateOrDeleteSt = (event) => {
  const id = event.target.dataset.id;
  if (!id) return;

  if (event.target.className === "updateStudent") {
    getStudents()
      .then((list) => list.find((st) => st.id == id))
      .then((student) => {
        if (!student) return;

        const name = prompt("Введіть нове ім'я:", student.name);
        const age = prompt("Введіть новий вік:", student.age);
        const course = prompt("Введіть новий курс:", student.course);
        const skills = prompt(
          "Введіть нові навички через кому:",
          student.skills
        );
        const email = prompt("Введіть новий email:", student.email);
        const isEnrolled = confirm("Студент активний? (Ok-так, Cancel-ні)");

        const updatedStudent = {
          name: name ?? student.name,
          age: age ? parseInt(age) : student.age,
          course: course ?? student.course,
          skills: skills
            ? skills.split(",").map((s) => s.trim())
            : student.skills,
          email: email ?? student.email,
          isEnrolled: isEnrolled,
        };
        return updateStudent(id, updatedStudent);
      })
      .then(() => getStudents())
      .then((data) => renderStudents(data))
      .catch((err) => console.error(`Помилка Patch ${err}`));

    return;
  }

  if (event.target.className === "deleteStudent") {
    deleteStudent(id)
      .then(() => getStudents())
      .then((data) => renderStudents(data))
      .catch((err) => console.error(`Помилка Delete ${err}`));
    return;
  }
};

tableStudents.addEventListener("click", handleUpdateOrDeleteSt);
