# Roche coding challenge

[Challenge description](/challenge/README.md)


###### INSTALL

* git clone https://gitlab.com/fedeiglesias/roche-coding-challenge.git
* cd roche-coding-challenge
* npm install


---


###### RUN & FUN

###### For developement

* npm run dev
* Enter with browser to http://localhost:3000
  - By default run in port 3000. You can change port and add aditional parameters to **webpack-dev-server** in package.json > scripts > start. For more information go to webpack documentation.
  - You need to change process.env.DEV_API_ENDPOINT in webpack.config.js to your point to json data.

###### For production

* npm run build
* npm run start
* Enter with browser to http://localhost:5000
  - By default run in port 5000. You can change port and add aditional parameters to **serve** in package.json > scripts > start. For more information go to serve documentation.
  - You need to change process.env.PROD_API_ENDPOINT in webpack.config.js to your point to json data.

###### For testing

* npm run test

---

###### Libs used

* **React:** Library for building user interfaces.
* **Redux:** Predictable state container for JavaScript Apps.
* **Redux-observable**: Middleware for action side effects in Redux using "Epics"
* **Reselect**: Simple “selector” library for Redux.
* **Ramda**: Practical functional Javascript
* **Axios**: Promise based HTTP client for the browser and node.js
* **Styled-components**: Use tagged template literals to style your components.
* **Polished**: A lightweight toolset for writing styles in JavaScript
* **Jest:** Zero configuration testing platform
* **Enzyme:** javaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
* **Typescript**:  A superset of JavaScript that compiles to clean JavaScript
