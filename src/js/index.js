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
    age: parseInt(form.stAge).value,
    course: form.stCourse.value.trim(),
    skills: form.stSkills.value.split(",").map((s) => s.trim()),
    email: form.stEmail.value.trim(),
    isEnrolled: form.stEnroled.checked,
  };

  addStudent(newStudent)
    .then((data) => renderStudents(data))
    .catch((err) => console.error("Помилка POST:", err));
  form.reset();
};
newStudentForm.addEventListener("submit", handleAddStudent);

const handleUpdateOrDeleteSt = (event) => {
  const id = event.target.dataset.id;

  if (event.target.className === "updateStudent") {
  }

  if (event.target.className === "deleteStudent") {
    deleteStudent(id)
      .then(() => getStudents())
      .then((data) => renderStudents(data));
    return;
  }
};

tableStudents.addEventListener("click", handleUpdateOrDeleteSt);
