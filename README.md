# Course management

## Story

Our life is based on continuous learning. You still meet with new things in Angular, so it’s highly recommended to store materials and articles about that, which you will mark after watching or reading. In this assignment, you will have to create a courses management system - your collection will contain all the materials you want to follow and do in the future. You are going to make a page with courses about new technologies, programming practice, videos, etc.

The data on view should change immediately (in real time). If you change something manually in the database, the change should be visible on the page without site refresh.

## What are you going to learn?

- reactive programming - RxJS library
- practice another way to gather inputs from user - reactive forms 
- forms validation
- Firebase Authentication
- Firebase - Realtime Database
- Working with @angular/fire library
- practice custom template pipes

## Tasks

1. Display course data, stored in real time database in organised way.
    - Courses are divided by *difficulty* level and *category*.
    - List can be filtered by course status (done, to do, in progress).
    - Each course has the possibility to view, edit, delete and create- so create proper routing.
    - Each course has a key, name, description, published status, difficulty, category, and created at date.

2. After clicking view button, next page will show course details.
    - There is list of lessons, each containing title, order number, description, url and estimated duration [in seconds].
    - Search field will allow to filter by description.
    - When user type in desired value, elements are shown with short delay.
    - Estimated duration should be converted to time represented by hours and minutes HH:mm.

3. Edit button opens modal with input fields, all are required, all are visibly changing look when value is invalid. Save button should update existing data on used backend as a service:
    - Course form consist with below fields:
- Name: single line text
- Category: select between options
- Difficulty level: select between options
- Description: text field
- Created at: date field
- Status: select between options
    - Provide validation for each input.

4. Create button which will redirect to component responsible for adding video:
    - Use the same component for adding video as for edit video.
    - If form at the beginning is empty, display `add course` button.
    - If video is provided then the `edit course` button should be the only way to submit the form.

5. From the list of courses, user can delete record:
    - Display bin icon on the courses list, user can delete course.
    - After click on delete icon, the confirmation modal should appear, to confirm operation (use NgxBootstrapConfirm, see the link in the background materials section).

6. Edit lesson button in course details opens modal with input fields, all are required, all are visibly changing look when value is invalid. Save button should update existing data on used backend as a service.
    - Lesson form should consist of below inputs:
- Title: single line text
- Order: number
- Description: text field
- Url: string field
- Estimated duration: number [in seconds]
    - Provide validation for each input

7. For each course, the `add lesson` button should be visible.
    - After clicking on the `add lesson` button, the modal with form appears.
    - New lesson should be connected with the selected course, where the user clicks the `add lesson` icon.
    - Use the same component for adding video as for edit video.

8. Users should have the possibility to remove lessons from the course.
    - Use a similar confirmation modal as in remove course.

9. Write several scenarios for checking if written forms validate data properly:
    - Check if the add course form works correctly, test each validation case.
    - Check if adding lessons to course works correctly, test each validation case.

## General requirements

None

## Hints

Use your skills with any of the designing programs - Figma, Adobe Xd - layout is up to you. Focus on tasks listed above but don’t let it be ugly ;) Remember, that many users will use such an app on mobile devices.

You'll find a way to cope with this in an easiest way by installing the Bootstrap library.

## Background materials

- <i class="far fa-exclamation"></i>[Angular Firebase Realtime Database](https://bezkoder.com/angular-10-firebase-crud/#AngularFireDatabase_for_Object)
- <i class="far fa-exclamation"></i> [AngularFire Quickstart](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md)
- [Building a web application with Angular and Firebase](https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase)
- [NgxBootstrapConfirm](https://www.npmjs.com/package/ngx-bootstrap-confirm)
