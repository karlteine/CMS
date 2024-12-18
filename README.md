## Features 💡

### Student Features 👩‍🎓

- Students can browse and view a list of available courses.
- Students can enroll in courses.

### Instructor Features 👨‍🏫

- Instructors can create new courses.
- Instructors can view the courses.

### General Features 🔑

- Allows users to log in, sign up, and log out of the system.
- Users can view, edit, and change their password.

## Get started 🚀

1. Clone the Repository

   ```bash
   git clone https://github.com/karlteine/CMS.git
   ```
2. Go to the directory

   ```bash
   cd ~/CMS
   ```

3. Install dependencies

   ```bash
   npm install
   ```
4. Connect your mongodb to the project

   Add your mongodb URI into mongodb.connect.js


5. Start the app

    ```bash
    node app.js
    ```
## API Documentation 📚

### 1. **User Routes**

These routes handle user authentication (sign-up, login) and dashboard access for students and instructors.

| HTTP Method | Route                          | Description                                           | Controller Action                |
|-------------|--------------------------------|-------------------------------------------------------|-----------------------------------|
| `GET`       | `/signup`                      | Render the sign-up form                               | `userController.signupForm`      |
| `POST`      | `/signup`                      | Handle the sign-up form submission                    | `userController.signup`          |
| `GET`       | `/login`                       | Render the login form                                 | `userController.loginForm`       |
| `POST`      | `/login`                       | Handle login form submission                          | `userController.login`           |
| `GET`       | `/student/dashboard`           | Render the student dashboard (accessible by students only) | `courseController.getAllCourses` |
| `GET`       | `/instructor/dashboard`        | Render the instructor dashboard (accessible by instructors only) | `courseController.getAllCourses` |

### 2. **Course Routes**

These routes handle course viewing and enrollment actions for students.

| HTTP Method | Route                      | Description                             | Controller Action             |
|-------------|----------------------------|-----------------------------------------|-------------------------------|
| `GET`       | `/course/:id`              | View a specific course by ID            | `courseController.viewCourse`  |
| `POST`      | `/enroll/:id`              | Enroll a student in a course by ID      | `courseController.enrollCourse` |

### 3. **Course Creation Routes**

These routes are for instructors to create new courses.

| HTTP Method | Route                      | Description                             | Controller Action                |
|-------------|----------------------------|-----------------------------------------|----------------------------------|
| `GET`       | `/course-creation`         | Show the course creation form           | `createCourseController.getForm` |
| `POST`      | `/course-creation`         | Handle the course creation form submission | `createCourseController.createCourse` |

### 4. **Profile Routes**

These routes allow users (students and instructors) to view and manage their profiles.

| HTTP Method | Route                          | Description                             | Controller Action               |
|-------------|--------------------------------|-----------------------------------------|---------------------------------|
| `GET`       | `/profile`                     | Retrieve the user's profile             | `profileController.getProfile`  |
| `GET`       | `/profile/edit`                | Show the profile edit form              | `profileController.editProfile` |
| `POST`      | `/profile/edit`                | Submit the profile edit form            | `profileController.updateProfile` |
| `GET`       | `/profile/change-password`     | Show the change password form           | `profileController.renderChange` |
| `POST`      | `/profile/change-password`     | Submit the change password form         | `profileController.changePassword` |
| `GET`       | `/logout`                      | Logout the current user                 | `profileController.logout`      |

### 5. **Main Routes**

These are general routes for rendering home and contact pages, and handling user authentication.

| HTTP Method | Route        | Description                                   | Controller Action             |
|-------------|--------------|-----------------------------------------------|-------------------------------|
| `GET`       | `/`          | Render the home page                          | `navigationController.getUser` |
| `GET`       | `/signup`    | Render the sign-up page                       | `navigationController.getUser` |
| `GET`       | `/contact`   | Render the contact page                       | `navigationController.getUser` |
| `GET`       | `/search`   | Render the search page                       | `navigationController.getAllCourses` |
| `GET`       | `/search`   | Filter the courses based on query                  | `navigationController.filteredCourses` |
