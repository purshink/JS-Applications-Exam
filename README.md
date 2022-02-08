# JS-Applications-Exam
Online Books Library App

You are assigned to implement a Web application (SPA) using JavaScript. The application should dynamically display content, based on user interaction and support user-profiles and CRUD operations, using a REST service.

1. Overview
Implement a front-end app (SPA) for viewing and managing books. The application allows visitors to browse through the posts catalog. Users may register with an email and password which allows them to create their own books. Post authors can also edit or delete their own publications at any time.
2. Technical Details
You are provided with the following resources:
Project scaffold: A package.json file, containing a list of common dependencies. You may change the included libraries to your preference. The sections devDependencies and scripts of the file are used by the automated testing suite, altering them may result in incorrect test operation.
To initialize the project, execute the command npm install via the command-line terminal.
HTML and CSS files: All views (pages) of the application, including sample user-generated content, are included in the file index.html, which links to CSS and other static files. Each view is in a separate section of the file, which can be identified by a unique class name or id attribute. Your application may use any preferred method (such as a templating library or manual visibility settings) to display only the selected view and to navigate between views upon user interaction.
Local REST service: A special server, which contains sample data and supports user registration and CRUD operations via REST requests is included with the project. Each section of this document (where applicable) includes details about the necessary REST endpoints, to which requests must be sent, and the shape of the expected request body.
For more information on how to use the included server, see Appendix A: Using the Local REST Service at the end of this document.
 Automated tests: A complete test suite is included, which can be used to test the correctness of your solution. Your work will be assessed, based on these tests.
For more information on how to run the tests, see Appendix B: Running the Test Suite at the end of this document.

Do not use CDN for loading the dependencies because it can affect the tests in a negative way!
Note: When creating HTML Elements and displaying them on the page, adhere as close as possible to the provided HTML samples. Changing the structure of the document may prevent the tests from running correctly, which will adversely affect your assessment grade. You may add attributes (such as class and dataset) to any HTML Element, as well as change "href" attributes on links and add/change the method and action attributes of HTML Forms, to facilitate the correct operation of a routing library or another method of abstraction. You may also add hidden elements to help you implement certain parts of the application requirements.
3. Application Requirements
Navigation Bar (5 pts)
Implement a NavBar for the app: navigation links should correctly change the current screen (view).
Navigation links should correctly change the current page (view). Guests (un-authenticated visitors) can see the links to the Dashboard, as well as the links to the Login and Register pages. The logged-in user navbar should contain the links to Dashboard page, My Books page, the Add Book page, Welcome, {user’s email address}, and a link for the Logout action.
User navigation example:



Guest navigation example: 


Login User (5 pts)
The included REST service comes with the following premade user accounts, which you may use for development:
{ "email": "peter@abv.bg", "password": "123456" }
{ "email": "john@abv.bg", "password": "123456" }
The Login page contains a form for existing user authentication. By providing an email and password the app should login a user in the system if there are no empty fields.

Send the following request to perform login:
Method: POST
URL: /users/login
Required headers are described in the documentation. The service expects a body with the following shape:
{
  email,
  password
}
Upon success, the REST service will return the newly created object with an automatically generated _id and a property accessToken, which contains the session token for the user – you need to store this information using sessionStorage or localStorage, in order to be able to perform authenticated requests.
If the login was successful, redirect the user to the Dashboard page. If there is an error, or the validations don’t pass, display an appropriate error message, using a system dialog (window.alert).
Register User (10 pts)
By given email, password app should register a new user in the system. All fields are required – if any of them is empty, display an error.

Send the following request to perform registration:
Method: POST
URL: /users/register
Required headers are described in the documentation. The service expects a body with the following shape:
{
  email,
  password
}
Upon success, the REST service will return the newly created object with an automatically generated _id and a property accessToken, which contains the session token for the user – you need to store this information using sessionStorage or localStorage, in order to be able to perform authenticated requests.
If the registration was successful, redirect the user to the Dashboard page. If there is an error, or the validations don’t pass, display an appropriate error message, using a system dialog (window.alert).
Logout (5 pts)
The logout action is available to logged-in users. Send the following request to perform logout:
Method: GET 
URL: /users/logout
Required headers are described in the documentation. Upon success, the REST service will return an empty response. Clear any session information you’ve stored in browser storage.
If the logout was successful, redirect the user to the Dashboard page.
Add Book Screen (15 pts)
The Create page is available to logged-in users. It contains a form for adding a new book. Check if all the fields are filled before you send the request.

To create a post, send the following request:
Method: POST
URL: /data/books
Required headers are described in the documentation. The service expects a body with the following shape:
{
  title,
  description,
  imageUrl,
  type
}
Required headers are described in the documentation. The service will return the newly created record. Upon success, redirect the user to the Dashboard page.
Dashboard (15 pts)
This page displays a list of all books in the system. Clicking on the details button in the cards leads to the details page for the selected book. This page should be visible to guests and logged-in users.

If there are no books, the following view should be displayed:

Send the following request to read the list of ads:
Method: GET
URL: /data/books?sortBy=_createdOn%20desc
Required headers are described in the documentation. The service will return an array of books.
Book Details (10 pts)
All users should be able to view details about books. Clicking the Details link in of a book card should display the Details page. If the currently logged-in user is the creator, the Edit and Delete buttons should be displayed, otherwise they should not be available. The view for the creators should look like:

The view for guests should look like:

Send the following request to read a single book:
Method: GET
URL: /data/books/:id
Where :id is the id of the desired card. Required headers are described in the documentation. The service will return a single object.
Edit Book Screen (15 pts)
The Edit page is available to logged-in users and it allows authors to edit their own book. Clicking the Edit link of a particular book on the Details page should display the Edit page, with all fields filled with the data for the book. It contains a form with input fields for all relevant properties. Check if all the fields are filled before you send the request. 
 
To edit a post, send the following request:
Method: PUT
URL: /data/books/:id
Where :id is the id of the desired card.
The service expects a body with the following shape:
{
  title,
  description,
  imageUrl,
  type
}
Required headers are described in the documentation. The service will return the modified record. Note that PUT requests do not merge properties and will instead replace the entire record. Upon success, redirect the user to the Details page for the current book.
Delete Book (10 pts)
The delete action is available to logged-in users, for books they have created. When the author clicks on the Delete action on any of their book, a confirmation dialog should be displayed, and upon confirming this dialog, the book should be deleted from the system and user should be redirect to the Dashboard page.
To delete a book, send the following request:
Method: DELETE
URL: /data/books/:id
Where :id is the id of the desired book. Required headers are described in the documentation. The service will return an object, containing the deletion time. Upon success, redirect the user to the Dashboard page.
My Books (10 pts)
Each logged-in user should be able to view his own books by clicking [My Books]. Here should be listed all books added by the current user.

If there are no books, the following view should be displayed:

Send the following request to read the list of ads:
Method: GET
URL: /data/books?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc
Where {userId} is the id of the currently logged-in user. Required headers are described in the documentation. The service will return an array of books.
BONUS: Like a book (10 Pts)
Every logged-in user should be able to like other books, but not his own. By clicking on the [Like] button, the counter of each book increases by 1.
The view when the user did not press [Like] button should look like:
When the user Liked the book the [Like] button should not be available and the counter should be increased by 1.
Creator should not be able to see the [Like] button. The view should look like:

Guest should not be able to see the [Like] button. The view for guests should look like:

Send the following request to add a like:
Method: POST
URL: /data/likes
The service expects a body with the following shape:

{
  bookId
}
Required headers are described in the documentation. The service will return the newly created record.
Send the following request to get total likes count for a book:
Method: GET
URL: /data/likes?where=bookId%3D%22{bookId}%22&distinct=_ownerId&count
Where {bookId} is the id of the desired book. Required headers are described in the documentation. The service will return the total likes count.
Send the following request to get like for a book from specific user:
Method: GET
URL:/data/likes?where=bookId%3D%22{bookId}%22%20and%20_ownerId%3D%22{userId}%22&count
Where {bookId} is the id of the desired book and {userId} is the id of the currently logged-in user.
Required headers are described in the documentation. The service will return either 0 or 1. Depends on that result the [Like] button should be displayed or not. 
4. Submitting Your Solution
Place in a ZIP file your project folder. Exclude the node_modules, server and tests folders. Upload the archive to Judge.



It will take several minutes for Judge to process your solution!

5. Appendix A: Using the Local REST Service
Starting the Service
The REST service will be in a folder named “server” inside the provided resources archive. It has no dependencies and can be started by opening a terminal in its directory and executing:
node server.js
If everything initialized correctly, you should see a message about the host address and port on which the service will respond to requests.
Sending Requests
To send a request, use the hostname and port, shown in the initialization log and resource address and method as described in the application requirements. If data needs to be included in the request, it must be JSON-encoded, and the appropriate Content-Type header must be added. Similarly, if the service is to return data, it will be JSON-encoded. Note that some requests do not return a body and attempting to parse them will throw an exception.
Read requests, as well as login and register requests do not require authentication. All other requests must be authenticated.
Required Headers
To send data to the server, include a Content-Type header and encode the body as a JSON-string:
Content-Type: application/json
{JSON-encoded request body as described in the application requirements}
To perform an authenticated request, include an X-Authorization header, set to the value of the session token, returned by an earlier login or register request:
X-Authorization: {session token}
Server Response
Data response:
HTTP/1.1 200 OK
Access-Contrl-Allow-Origin: *
Content-Type: application/json
{JSON-encoded response data}
Empty response:
HTTP/1.1 204 No Content
Access-Contrl-Allow-Origin: *
Error response:
HTTP/1.1 400 Request Error
Access-Contrl-Allow-Origin: *
Content-Type: application/json
{JSON-encoded error message}
More Information
You can find more details on the GitHub repository of the service.
6. Appendix B: Running the Test Suite
Project Setup
The tests require a web server to deliver the content of the application. There is a development web server included in the project scaffold, but you may use whatever server you are familiar with. Note that specialized tools like BrowserSync may interfere with the tests. To initialize the project with its dependencies, open a terminal in the folder, containing the file package.json and execute the following:
npm install
Note that if you changed the section devDependencies of the project, the tests may not initialize properly.

Executing the Tests
Before running the test suite, make sure a web server is operational, and the application can be found at the root of its network address. To start the included dev-server, open a terminal in the folder containing package.json and execute:
npm run start
This is a one-time operation unless you terminate the server at any point. It can be restarted with the same command as above.
To execute the tests, open a new terminal (do not close the terminal, running the web server instance) in the folder containing package.json and execute:
npm run test

Test results will be displayed in the terminal, along with detailed information about encountered problems. You can perform this operation as many times as it is necessary by re-running the above command.
Debugging Your Solution
If a test fails, you can view detailed information about the requirements that were not met by your application. Open the file e2e.test.js in the folder tests and navigate to the desired section as described below.
This first step will not be necessary if you are using the included web server. Make sure the application host is set correctly:

The value for host must be the address where your application is being served. Make sure that entering this address in a regular internet browser shows your application.
To make just a single test run, instead of the full suite (useful when debugging a single failing test), find the test and append .only after the it reference:

On slower machines, some of the tests may require more time to complete. You can instruct the tests to run more slowly by slightly increasing the values for interval and timeout:

Note that interval values greater than 500 and timeout values greater than 10000 are not recommended.
If this doesn’t make the test pass, set the value of DEBUG to true and run the tests again – this will launch a browser instance and allow you to see what is being tested, what the test sees and where it fails (or hangs):

If the actions are happening too fast, you can increase the value of slowMo. If the browser hangs, you can just close it and abort any remaining tests by focusing the terminal window and pressing [Ctrl+C] followed by the letter "y" and [Enter].
The final thing to look for is the exact row where the test fails:

