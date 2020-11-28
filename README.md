# Queue system (Workshop-5, Node.js)
A server app (back-end app) for queues management in *e.g.* an office or a department like a city hall. It provides interfaces as server-side rendering (SSR) views for users and agents and API endpoints for an admin. The project is the part of the Coders Lab course.

# Roles
## User
  * User is a client and uses SSR views as an interface (see the 'SSR views').
  * This interface shows all available queues (1 queue = 1 official issue or field).
  * **User can enroll in selected queue.**
  * When enrolled the user receives:
    * the ID
    * the number of people in the queue before him.
## Agent
  * Agent is a official and uses SSR views as an interface (see the 'SSR views').
  * Logs in with ID and without a password for simplification (see the 'Simplifications' section).
  * When logged in, his interface shows the main board including:
    * agent basic information (visible only for the logged agent)
    * queues assigned to this agent (an admin assignes queues to agents)
    * the number of users in each queue.
  * **Agent can add / remove a user to / from a queue.** Each queue has mini-form to add / remove a user by ID to / from the queue.
  * Logs out ending the session.
## Admin
  * Admin has no views as an interface but is available *via* API endpoints (see the 'SSR views' section).
  * **Adds / removes queues and agents.**
  * **Assignes / Unassignes agents to / from queues.**
  * More than one agent can be assigned to the same queue.

# Simplifications
* Simplifications were implemented according to the workshop guideliness.
* Agent session is created without password authorization.
* Safety issues were omitted. A secret phrase is not encrypted:
```javascript
app.use(session({ secret: 'QUEUE_SESSION' }));
```
* SSR views code is strongly limited (see the 'SSR views' section).
* Admin has no views as an interface (see the 'SSR views' section).

# SSR views
* odpalenie adresu i obsługa z widoku
* widoki provide dane do request body na potrzeby interakcji z endpointami

* Views content and its styling is limited to a minimum (according to the workshop guideliness).
* They include scripts that request API periodically for queues state and update this state (does not handle dynamic data addition or deletion).
## User views
* For the user, there are views for:
  * available queues to enroll
  * successful addition to a queue
  * failed addition to a queue.
## Agent views
* For the agent, there are views for:
  * a form to log in
  * main board - queues assigned to the logged in agent and his basic information
  * successful operation of addition or deletion of a user
  * failed operation of addition or deletion of a user.
## Admin views
* For the admin, there are no views. You can interact with admin API endpoints with `Postman` app (see the 'Endpoints' section).

# Endpoints
* User and agent endpoints are handled with their views that provide all necessary data for request bodies. To review these data open the Postman requests collection file (see the 'Information' section).
## User endpoints
* Default route: http://localhost:3000/client
* **GET**
  * **/** - render the main view with all available queues
* **POST**
  * **/addToQueue** - add a user to a queue
## Agent endpoints
* Default route: http://localhost:3000/agent
* **GET**
  * **/** - render the login view or the main board depending on existing session
* **POST**
  * **/login** - send submitted credentials to log in
  * **/logout** - terminate the session
  * **/addClientToQueue** - add a user to a queue
  * **/removeClientFromQueue** - remove a user from a queue
## Admin endpoints
* Default route: http://localhost:3000/admin
* **PUT**
  * **/queue** - create a new queue
* **DELETE**
  * **/queue** - remove a queue

(requests collection available, see the 'Information' section).
* The project includes Postman requests collection useful for interaction with API endpoints (see the 'Information' section).

# Information
* **Postman requests collection** useful for interaction with API endpoints (for users, agents and admin) is available as a file named `Queue.postman_collection.json`. You can import it to your `Postman` app.

zbiór console.logów

# Technologies
- TypeScript
- Mongoose
- MongoDB
- Express
- Express Session
- Axios
- JS (ES6)
- WebPack
- Handlebars

# Download and Install
* Use the link from the 'Code' button to download the project.
* In the project directory, type:
```
npm i
```
to install necessary dependencies.
* Install and configure [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) to get this database on your machine.
* Install and launch:
    * [Postman](https://www.postman.com/downloads/) app to interact with admin API endpoints.
    * [Robo 3T](https://robomongo.org/download) app (without Studio 3T) to interact with MongoDB.
* Next, run:
```
npm run start
```
to start the app.
## Utilization
* To use the app as a **user** or an **agent**:
    * open http://localhost:3000 to view it in the browser.

npm run client - potrzebne do wytworzenia kodu klienckiego