# Interview Scheduler

The Interview Scheduler is a single page app that allows users (Students) to view, book, edit and cancel appointments with interviewers. 
For each day, there are 5 interview slots to choose from with a total of 25 slots available per week.

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The expected day updates the number of spots available when an interview is booked or canceled.
- The list of days informs the user how many slots are available for each day.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- The frontend of the app is build with react using axios requests to fetch data from an API.
- The project allowed for gaining hands on experience with different development environments, including Storybook, Jest, and Webpack Dev Server.

The app has the following dependencies.

- Axios
- React
- Webpack, Babel
- Sass
- Nodejs
- Express
- Postgresql
- Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

## Setup

Install dependencies with `npm install`.

Dependencies include:

- axios : ^0.24.0
- React : ^16.9.0
- normalize.css : ^8.0.1
- react-dom : ^16.9.0
- react-scripts : 3.0.0
- @testing-library/react-hooks : ^7.0.2
- classnames : ^2.3.1

## Final Product

<img width="1440" alt="Screen Shot 2021-12-14 at 7 38 17 PM" src="https://user-images.githubusercontent.com/82424998/146113554-40b3f36c-8eb6-4ffe-aedf-f49bf0c1c495.png">

<img width="1440" alt="Screen Shot 2021-12-14 at 7 39 34 PM" src="https://user-images.githubusercontent.com/82424998/146113368-cd263ab7-69fc-4712-9743-ebb7233fd279.png">
<img width="1440" alt="Screen Shot 2021-12-14 at 7 38 33 PM" src="https://user-images.githubusercontent.com/82424998/146113467-eb7f0d20-057b-418a-a3d5-4366cfae081b.png">


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
