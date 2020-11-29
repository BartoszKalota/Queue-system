# Queue system (Workshop-5, Node.js)
A server app (back-end app) for queues management in *e.g.* an office or a department like a city hall. It provides interfaces as server-side rendering (SSR) views for users and agents and API endpoints for an admin. The project is the part of the Coders Lab course.

# Roles
## User
  * User is a client.
  * Can enroll in selected queue.
## Agent
  * Agent is a official.
  * Logs in and out.
  * When logged in, the agent can add / remove a user to / from a queue.
## Admin
  * Adds / removes queues and agents.
  * Assignes / Unassignes agents to / from queues (more than one agent can be assigned to the same queue).

# Simplifications
* Simplifications were implemented according to the workshop guideliness.
* Agent session is created without password authorization.
* Safety issues were omitted. A secret phrase is not encrypted:
```javascript
app.use(session({ secret: 'QUEUE_SESSION' }));
```
* SSR views code is significantly limited (see the 'SSR views' section).
* Admin has no views as an interface (see the 'Admin views' section).

# SSR views
* Views content and its styling is limited to a minimum (according to the workshop guideliness).
* They provide necessary data for request bodies to interact with endpoints.
* Views include JS code requesting API periodically for queues state and update this state (does not handle dynamic data addition or deletion).
## User views
* For the user, there are views for:
  * a main board showing all available queues to enroll (1 queue = 1 official issue or field)
  * successful addition to a queue
  * failed addition to a queue.
* When enrolled, the user receives:
  * the ID
  * the number of people in the queue before the user.
## Agent views
* For the agent, there are views for:
  * a form to log in
  * a main board showing:
    * agent basic information (visible only for the logged in agent)
    * all queues assigned to this agent
    * the number of users in each queue
  * successful operation of addition or deletion of a user
  * failed operation of addition or deletion of a user.
* When logged in:
  * the agent sees the main board
  * each queue has an input to add / remove a user by ID to / from the queue.
## Admin views
* There are no views for the admin.
* Admin interface is available *via* API endpoints (see the 'Endpoints' section).

# Endpoints
* **User** and **agent** endpoints are handled with SSR views that provide all necessary data for request bodies. Therefore, to use the app as a user or an agent:
  * utilize a browser
  * see the 'User endpoints' or 'Agent endpoints' sections, respectively.
* **Admin** endpoints have no SSR views and need a 3rd party app for an interaction. Therefore, to use the app as an admin:
  * utilize the `Postman` app
  * import Postman requests collection file to the `Postman` app (see the 'Information' section)
  * see the 'Admin endpoints' section.
## User endpoints
* Default route: http://localhost:3000/client
* **GET**
  * **/** - render the main view with all available queues
* **POST**
  * **/addToQueue** - add a user to a queue
## Agent endpoints
* Default route: http://localhost:3000/agent
* **GET**
  * **/** - render the login view or the main board depending on the session
* **POST**
  * **/login** - send submitted credentials to log in
  * **/logout** - terminate the session
  * **/addClientToQueue** - add a user to a queue (by user ID)
  * **/removeClientFromQueue** - remove a user from a queue (by user ID)
## Admin endpoints
* Default route: http://localhost:3000/admin
* **PUT**
  * **/queue** - create a new queue
  * **/agent** - create a new agent
* **DELETE**
  * **/queue?id** - remove a queue
  * **/agent?id** - remove an agent
* **POST**
  * **/assignQueue** - assign an agent to a queue
  * **/unassignQueue** - unassign an agent from a queue

# MongoDB
* Database address:
  * `mongodb://localhost:27017/queue`
* Database name:
  * `queue`
* Collections names:
  * `agents`
  * `queues`
## Mongoose models
* In each model, all listed fields are required (unless otherwise stated).
### Agents model
* **name** - `String`
* **position** - `String`
* **active** - `Boolean`
### Queues model
* **name** - `String`
* **members** - `[mongoose.Types.ObjectId]` - users added to a queue
* **agents** - `[mongoose.Types.ObjectId]` - agents assigned to a queue, **not required**

# Information
* **Postman requests collection** useful for interaction with API endpoints (for users, agents and especially admin) is available as a file named `Queue.postman_collection.json`. You can import it to your `Postman` app.
* Server app console prints every API request.

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
    * [Postman](https://www.postman.com/downloads/) app to interact with admin endpoints.
    * [Robo 3T](https://robomongo.org/download) app (without Studio 3T) to interact with MongoDB.
* Run:
```
npm run client
```
to generate JS code for SSR views.
* Next, run:
```
npm run start
```
to start the app.
* Now, you can interact with the server app with a browser and/or the Postman (see the 'Endpoints' section) and monitor database changes with Robo 3T.