const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const API_URL = "http://localhost:5000/students";

async function fetchStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();

  studentList.innerHTML = "";

  students.forEach((student) => {
    const div = document.createElement("div");
    div.className = "student-card";
    div.innerHTML = `
      <p><strong>Name:</strong> ${student.name}</p>
      <p><strong>Roll No:</strong> ${student.rollNo}</p>
      <p><strong>Department:</strong> ${student.department}</p>
      <p><strong>Year:</strong> ${student.year}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <button onclick="deleteStudent('${student._id}')">Delete</button>
    `;
    studentList.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    rollNo: document.getElementById("rollNo").value,
    department: document.getElementById("department").value,
    year: document.getElementById("year").value,
    email: document.getElementById("email").value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  form.reset();
  fetchStudents();
});

async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  fetchStudents();
}

fetchStudents();