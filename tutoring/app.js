// Initialize the tutoring system
const tutoringSystem = new ExtendedTutoring();

// Tab functionality
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");

  // Update dropdowns when switching tabs
  updateUserDropdowns();
}

// Update all user dropdowns
function updateUserDropdowns() {
  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];
  const dropdowns = ["userSelect", "matchUser", "fromUser", "toUser"];

  dropdowns.forEach((dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.innerHTML = '<option value="">Select User</option>';
      allUsers.forEach((user, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${user.fullName} (${user.role})`;
        option.dataset.role = user.role;
        dropdown.appendChild(option);
      });
    }
  });
}

// User registration
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  try {
    if (role === "student") {
      tutoringSystem.addStudent(name, surname, email);
    } else {
      tutoringSystem.addTeacher(name, surname, email);
    }

    showMessage("User registered successfully!", "success");
    this.reset();
    displayUsers();
    updateUserDropdowns();
  } catch (error) {
    showMessage("Error registering user: " + error.message, "error");
  }
});

// Display users
function displayUsers() {
  const usersList = document.getElementById("usersList");
  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];

  usersList.innerHTML = "";

  allUsers.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
            <h4>${user.fullName}</h4>
            <p>Email: ${user.email}</p>
            <span class="role-badge role-${user.role}">${user.role}</span>
            <div class="courses-list">
                ${user.courses
                  .map(
                    (course) =>
                      `<div class="course-item">
                        <span>${course.course}</span>
                        <span class="level-badge">Level ${course.level}</span>
                    </div>`
                  )
                  .join("")}
            </div>
        `;
    usersList.appendChild(userCard);
  });
}

// Course management
document.getElementById("courseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userIndex = document.getElementById("userSelect").value;
  const courseName = document.getElementById("courseName").value;
  const courseLevel = parseInt(document.getElementById("courseLevel").value);

  if (userIndex === "") {
    showMessage("Please select a user", "error");
    return;
  }

  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];
  const user = allUsers[userIndex];

  try {
    user.addCourse(courseName, courseLevel);
    showMessage("Course added successfully!", "success");
    this.reset();
    displayUsers();
    displayCourses();
  } catch (error) {
    showMessage("Error adding course: " + error.message, "error");
  }
});

// Display courses
function displayCourses() {
  const coursesDisplay = document.getElementById("coursesDisplay");
  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];

  coursesDisplay.innerHTML = "<h3>All Courses</h3>";

  allUsers.forEach((user) => {
    if (user.courses.length > 0) {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";
      courseCard.innerHTML = `
                <h4>${user.fullName} (${user.role})</h4>
                ${user.courses
                  .map(
                    (course) =>
                      `<div class="course-item">
                        <span>${course.course}</span>
                        <span class="level-badge">Level ${course.level}</span>
                    </div>`
                  )
                  .join("")}
            `;
      coursesDisplay.appendChild(courseCard);
    }
  });
}

// Find matches
function findMatches() {
  const userIndex = document.getElementById("matchUser").value;
  const matchResults = document.getElementById("matchResults");

  if (userIndex === "") {
    showMessage("Please select a user", "error");
    return;
  }

  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];
  const selectedUser = allUsers[userIndex];

  matchResults.innerHTML = "<h3>Match Results</h3>";

  if (selectedUser.role === "student") {
    const matchedTeachers = tutoringSystem.getTeacherForStudent(selectedUser);

    if (matchedTeachers.length === 0) {
      matchResults.innerHTML += "<p>No matching teachers found.</p>";
    } else {
      matchedTeachers.forEach((teacher) => {
        const matches = ExtendedUser.match(teacher, selectedUser);
        const matchCard = document.createElement("div");
        matchCard.className = "match-card";
        matchCard.innerHTML = `
                    <h4>Teacher: ${teacher.fullName}</h4>
                    <p>Email: ${teacher.email}</p>
                    <p>Matching Courses:</p>
                    ${matches
                      .map(
                        (match) =>
                          `<div class="course-item">
                            <span>${match.course}</span>
                            <span class="level-badge">Level ${match.level}</span>
                        </div>`
                      )
                      .join("")}
                `;
        matchResults.appendChild(matchCard);
      });
    }
  } else {
    const matchedStudents = tutoringSystem.getStudentsForTeacher(selectedUser);

    if (matchedStudents.length === 0) {
      matchResults.innerHTML += "<p>No matching students found.</p>";
    } else {
      matchedStudents.forEach((student) => {
        const matches = ExtendedUser.match(selectedUser, student);
        const matchCard = document.createElement("div");
        matchCard.className = "match-card";
        matchCard.innerHTML = `
                    <h4>Student: ${student.fullName}</h4>
                    <p>Email: ${student.email}</p>
                    <p>Matching Courses:</p>
                    ${matches
                      .map(
                        (match) =>
                          `<div class="course-item">
                            <span>${match.course}</span>
                            <span class="level-badge">Level ${match.level}</span>
                        </div>`
                      )
                      .join("")}
                `;
        matchResults.appendChild(matchCard);
      });
    }
  }
}

// Message system
document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fromIndex = document.getElementById("fromUser").value;
  const toIndex = document.getElementById("toUser").value;
  const messageText = document.getElementById("messageText").value;

  if (fromIndex === "" || toIndex === "") {
    showMessage("Please select both sender and recipient", "error");
    return;
  }

  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];
  const fromUser = allUsers[fromIndex];
  const toUser = allUsers[toIndex];

  try {
    tutoringSystem.sendMessages(fromUser, [toUser], messageText);
    showMessage("Message sent successfully!", "success");
    this.reset();
    displayMessages();
  } catch (error) {
    showMessage("Error sending message: " + error.message, "error");
  }
});

// Display messages
function displayMessages() {
  const messagesDisplay = document.getElementById("messagesDisplay");
  const allUsers = [...tutoringSystem.students, ...tutoringSystem.teachers];

  messagesDisplay.innerHTML = "<h3>All Messages</h3>";

  allUsers.forEach((user) => {
    if (user.messages.length > 0) {
      const messageCard = document.createElement("div");
      messageCard.className = "message-card";
      messageCard.innerHTML = `
                <h4>Messages for ${user.fullName}</h4>
                ${user.messages
                  .map(
                    (message) =>
                      `<div style="background: #f7fafc; padding: 10px; margin: 5px 0; border-radius: 5px;">
                        ${message}
                    </div>`
                  )
                  .join("")}
            `;
      messagesDisplay.appendChild(messageCard);
    }
  });
}

// Utility function to show messages
function showMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className =
    type === "success" ? "success-message" : "error-message";
  messageDiv.textContent = text;

  const activeTab = document.querySelector(".tab-content.active");
  activeTab.insertBefore(messageDiv, activeTab.firstChild);

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  updateUserDropdowns();
  displayUsers();
  displayCourses();
});
