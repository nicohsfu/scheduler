# Interview Scheduler by Nico Hernandez

Interview Scheduler is a single-page React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience.

# Technical Specifications
- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Cypress, Testing Library

# Setup

Note: The application uses data from [here](https://github.com/lighthouse-labs/scheduler-api).

## Install dependencies with 

```sh
npm install
```

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

# Demo / Screenshots

## Booking an appointment

![booking](https://github.com/nicohsfu/scheduler/blob/master/docs/booking.png?raw=true)

## Deleting an appointment

![deleting](https://github.com/nicohsfu/scheduler/blob/master/docs/deleting.png?raw=true)

## Handling errors when the user does not provide a name/select an interviewer

![error-handling](https://github.com/nicohsfu/scheduler/blob/master/docs/error-handling.png?raw=true)