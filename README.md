BRIEF DESCRIPTION 

Web application built in NodeJS. 

This application uses Express + EJS (presentation tier). 

There is only one view /views/index.ejs which can show as a home page, and can show the result of the query. The /routes/index.js can receive two requests, one for the home page, and other one to show the result of the query. The second one get the user name from the request.query to do a HTTPS Request to GitHub API. 

The result of the call to the API is a JSON. With that JSON, it counts the number of appearances for each language. With this information, it decides which language is the most used (may have several favourites). 
  
TASKS TO RUN IT 

There is a folder called github-users-web.  

To run this application, you need NodeJS and follow next steps: 

1. npm install 
2. npm start 
3. The web application will start on port 3000. To try it you should use next URL: http://localhost:3000 