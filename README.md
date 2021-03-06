# Interview Scheduler

One page app to schedule appointments between students and mentors.

* [Live demo of app](https://interview-scheduler-dk.netlify.app/) on Netlify
* API endpoints on Heroku — [Days](https://scheduler-api-lhl-dk.herokuapp.com/api/days) | [Appointments](https://scheduler-api-lhl-dk.herokuapp.com/api/appointments) | [Interviewers](https://scheduler-api-lhl-dk.herokuapp.com/api/interviewers)


## Screenshots

*Navigating days*

!["Navigating days"](https://github.com/dariakiseleva/interview-scheduler/blob/master/docs/changing-days.gif?raw=true)

*Deleting an appointment*

!["Navigating days"](https://github.com/dariakiseleva/interview-scheduler/blob/master/docs/deleting-appointment.gif?raw=true)

*Creating an appointment*

!["Navigating days"](https://github.com/dariakiseleva/interview-scheduler/blob/master/docs/creating-appointment.gif?raw=true)

*Editing an appointment*

!["Navigating days"](https://github.com/dariakiseleva/interview-scheduler/blob/master/docs/editing-appointment.gif?raw=true)

## Setup
* Clone the [scheduler-api](https://github.com/dariakiseleva/scheduler-api) backend server, follow instructions in that README, and finally run the server with `npm start`
* Clone this repo
* Install dependencies with `npm install`
* Run the server with `npm start`
* `npm test` to run the tests
* `npm run storybook` to see components in Storybook

## Stack
**Front-End:** React, Axios, JavaScript, JSX, HTML, Sass

**Back-End:** Node.js, PostgreSQL

**Testing:** Storybook, Jest, Testing library, Cypress

## Dependencies
* Axios
* classnames
* Normalize.css
* React
* React-dom
* React-scripts
* react-test-renderer
* SASS
* Storybook
* Jest
* Testing-library
* Cypress
* React-test-renderer
* babel/core
* babel-loader

