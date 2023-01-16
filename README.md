# nodejs-CRUD-API
 Simple CRUD REST-api on Typescript using Node.js with no external dependencies
## How to install
 Install 18 LTS version of Node.js.

 `git clone --branch dev-task3 https://github.com/KuzikevichDavid/nodejs-CRUD-API <path_where_to_clone>`

 `npm i`

 Change file `.env` to set value of envirenment variable `TASK3_REST_API_PORT`. 
## CLI Commands
 - `npm run start:dev` - application is run in development mode using nodemon
 - `npm run start:prod` - starts the build process and then runs the bundled file
 - `npm run start:multi` - do the same that `start:prod`'s do with a load balancer(using Round-robin algorithm)
 - `npm run test` - starts tests scenarios
## API documentation

### Endpoint: `api/users`

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create record about new user and store it in database

`PUT api/users/${userId}` - to update existing user 

`DELETE api/users/${userId}` - to delete existing user from database

### User's mandatory fields

`username` — user's name (string, **required**)

`age` — user's age (number, **required**)

`hobbies` — user's hobbies (array of strings or empty array, **required**)

### Get users
* **URL:**
	`/api/users`
* **Method:**
	GET
*  **URL Params**:
	None
* **Data Params**:
	None
* **Success Response:**
    * **Code:** 200 
    **Content:**
        ```
        [
        	{
        		"id": "string",
        		"name": "string",
        		"age": 0,
        		"hobbies": ["string"]
        	}
        ]
        ```
### Get user
* **URL:**
	`/api/users/{id}`
* **Method:**
	GET
*  **URL Params**:
	`{id}` - id of user in format `uuid` version 4. Example `ea4ccdc6-a059-46b0-a9c0-45e77ffca7fd`
* **Data Params**:
	None
* **Success Response:**
    * **Code:** 200 
    **Content:**
        ```
        {
        	"id": "string",
        	"name": "string",
        	"age": 0,
        	"hobbies": ["string"]
        }
        ```
* **Error Response:**
    * **Code:** 404 "NOT FOUND"
    **Content:** `{  "code": "404", "message": "User with {id} not found" }`

	**OR**

	* When URL Param `{id}` is not correct `uuid` 
	**Code:** 400 "BAD REQUEST"
    **Content:** `{ "code": "400", "message": "{id} isn't valid 'id' string"}`
	
### Create user
* **URL:**
	`/api/users`
* **Method:**
	POST
*  **URL Params**:
	None
* **Data Params**:
	JSON in format:
    ```
    {
		"name": "Jon", // required
		"age": 15, // required
		"hobbies": ["skating"] // requred or empty array
	}
	```
* **Success Response:**
	* **Code:** 201 
    **Content:** created user in JSON
	    ```
    	{
    		"id": "ea4ccdc6-a059-46b0-a9c0-45e77ffca7fd",
    		"name": "Jon",
    		"age": 15,
    		"hobbies": ["skating"]
    	}
    	```
* **Error Response:**
	* When `Data params` is incorrect
	**Code:** 400 "BAD REQUEST"
    **Content:** `{ "code": "400", "message": "Request body does not contain required fields"}`
	OR
	* When `Data params` is empty or incorrect JSON
	**Code:** 400 "BAD REQUEST"
    **Content:** `{ "code": "400", "message": "Request body incorrect"}`
### Update user
* **URL:**
	`/api/users/{id}`
* **Method:**
	PUT
*  **URL Params**:
	`{id}` - id of user in format `uuid` version 4. Example `ea4ccdc6-a059-46b0-a9c0-45e77ffca7fd`
* **Data Params**:
	JSON in format:
    ```
    {
		"name": "string", 
		"age": 0, 
		"hobbies": ["string"] // or empty array
	}
	```
* **Success Response:**
	* **Code:** 200
    **Content:** updated user in JSON format
	    ```
    	{
    		"id": "ea4ccdc6-a059-46b0-a9c0-45e77ffca7fd",
    		"name": "Jon",
    		"age": 15,
    		"hobbies": ["skating"]
    	}
* **Error Response:**
	* When `Data params` is empty or incorrect JSON
	**Code:** 400 "BAD REQUEST"
    **Content:** `{ "code": "400", "message": "Request body incorrect"}`
    OR
    * When user with URL Param `{id}` is not exists
	**Code:** 404 "NOT FOUND" 
    **Content:** `{ "code": "404", "message": "User with {id} not found"}`
	OR
	* When URL Param `{id}` is not correct `uuid`
	**Code:** 400 "BAD REQUEST" 
    **Content:** `{ "code": "400", "message": "{id} isn't valid 'id' string"}`
	OR
	* **Code:** 400 "BAD REQUEST" 
    **Content:** `{ "code": "400", "message": "field '{username}' is not correct"}`
	OR
	* **Code:** 400 "BAD REQUEST"
    **Content:** `{ "code": "400", "message": "field '{age}' is not correct"}`
	OR
	* **Code:** 400 "BAD REQUEST"
    **Content:** `{ "code": "400", "message": "field '{hobby}' is not correct"}`
### Delete user
* **URL:**
	`/api/users/{id}`
* **Method:**
	DELETE
*  **URL Params**:
	`{id}` - id of user in format `uuid` version 4. Example `ea4ccdc6-a059-46b0-a9c0-45e77ffca7fd`
* **Data Params**:
	None
* **Success Response:**
	* **Code:** 204
    **Content:**
	    None
* **Error Response:**
    * When user with URL Param `{id}` is not exists
	**Code:** 404 "NOT FOUND" 
    **Content:** `{ "code": "404", "message": "User with {id} not found"}`
	OR
	* When URL Param `{id}` is not correct `uuid`
	**Code:** 400 "BAD REQUEST" 
    **Content:** `{ "code": "400", "message": "{id} isn't valid 'id' string"}`
