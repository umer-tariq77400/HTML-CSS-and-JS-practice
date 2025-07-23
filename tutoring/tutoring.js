class User {
  constructor({ name, surname, email, role }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.courses = [];
    this.messages = [];
  }

  // A function to add a course and level to the object(teacher as instructor or student as looking for a instructor for it)
  addCourse(course, level) {
    this.courses.push({ course, level });
  }

  // Remove unwanted courses
  removeCourse(course) {
    let index = this.courses.findIndex((c) => c.course === course);
    if (index !== -1) {
      this.courses.splice(index, 1);
    }
  }

  editCourse(course, level) {
    for (let c of this.courses) {
      if (c.course === course) {
        c.level = level;
        return;
      }
    }
    console.error(`Course ${course} not found.`);
  }

  sendMessage(from, message) {
    this.messages.push(`-> ${from.email} -> ${this.email}: ${message}`);
  }

  showMessagesHistory() {
    for (let message of this.messages) {
      console.log(message);
    }
  }
}

class ExtendedUser extends User {
  constructor({ name, surname, email, role }) {
    super({ name, surname, email, role });
  }
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
  set fullName(name) {
    let parts = name.split(" ");
    if (parts.length === 2) {
      this.name = parts[0];
      this.surname = parts[1];
    } else {
      console.error(
        "Full name must contain exactly two parts: name and surname."
      );
    }
  }

  static match(teacher, student, course) {
    if (teacher.role !== "teacher" || student.role !== "student") {
      console.error("Invalid roles for matching.");
      return null;
    }
    if (course) {
      let match = teacher.courses.find((c) => c.course === course);
      if (match) {
        return { course: match.course, level: match.level };
      } else {
        console.error(
          `Course ${course} not found for teacher ${teacher.fullName}`
        );
        return undefined;
      }
    } else {
      let matches = [];
      for (let studentCourse of student.courses) {
        let match = teacher.courses.find(
          (c) => c.course === studentCourse.course
        );
        if (match && match.level >= studentCourse.level) {
          matches.push({ course: match.course, level: match.level });
        }
      }
      return matches;
    }
  }
}

class Teacher extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "teacher" });
  }
}

class Student extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "student" });
  }
}

class Tutoring {
  constructor() {
    this.students = [];
    this.teachers = [];
  }

  getStudentByName(name, surname) {
    let student = this.students.find(
      (student) => student.name === name && student.surname === surname
    );
    if (student) {
      return student;
    }
    return undefined;
  }

  getTeacherByName(name, surname) {
    let teacher = this.teachers.find(
      (teacher) => teacher.name === name && teacher.surname === surname
    );
    if (teacher) {
      return teacher;
    }
    return undefined;
  }

  getStudentsForTeacher(teacher) {
    let matchedStudents = [];
    for (let student of this.students) {
      let match = ExtendedUser.match(teacher, student);
      if (match && match.length > 0) {
        matchedStudents.push(student);
      }
    }
    return matchedStudents;
  }

  getTeacherForStudent(student) {
    let matchedTeachers = [];
    for (let teacher of this.teachers) {
      let match = ExtendedUser.match(teacher, student);
      if (match && match.length > 0) {
        matchedTeachers.push(teacher);
      }
    }
    return matchedTeachers;
  }

  addStudent(name, surname, email) {
    this.students.push(
      new Student({ name: name, surname: surname, email: email })
    );
  }

  addTeacher(name, surname, email) {
    this.teachers.push(
      new Teacher({ name: name, surname: surname, email: email })
    );
  }
}

class ExtendedTutoring extends Tutoring {
  constructor() {
    super();
  }

  // Method that will send a message from one user to all the users in to array
  sendMessages(from, to, message) {
    if (from === "undefined") {
      console.error("Not a valid student/teacher");
      return null;
    }

    if (to.length === 0) {
      console.error("No user given to send message to");
    }

    for (let user of to) {
      user.sendMessage(from, message);
    }
  }
}
