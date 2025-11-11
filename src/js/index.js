import { getStudents } from "./API/getStudents";
import { addStudent } from "./API/addStudent";
import { updateStudent } from "./API/updateStudent";
import { deleteStudent } from "./API/deleteStudent";

import Handlebars from "handlebars";
import studentSource from "bundle-text:../student.hbs";
const studentTempl = Handlebars.compile(studentSource);

const newStudentForm = document.querySelector(".add-student-form");
const getBtn = document.querySelector("#get-students-btn");
const tableStudents = document.querySelector(".students");

const API_URL = "http://localhost:3000/students";

// Функція для відображення студентів у таблиці
const renderStudents = (students) => {
  students.forEach((student) => {
    tableStudents.innerHTML = studentTempl;
  });
};

getBtn.addEventListener("click", (st) => getStudents(API_URL));

const handleAddSt = (event) => {
  event.preventDefault();

  const form = event.target;
  const newStudent = {
    name: form.stName.value.trim(),
    age: parseInt(form.stAge).value.trim(),
    course: form.stCourse.value.trim(),
    skills: form.stSkills.value,
    email: form.stEmail.value.trim(),
    isEnrolled: form.stEnroled.checked,
  };
  addStudent(newStudent, API_URL);
  form.reset();
};
newStudentForm.addEventListener("submit", handleAddSt);
