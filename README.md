<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> simple social media app


## Install

```sh
npm install
```

## Run tests

```sh
npm run test
```

## gitignore

* **.env**
    * path: `config/script/.env`
    * usage: 
      - database connection details
      - used in `config/database.js`

* **firebaseServiceAccountKey.json**
    * path: `/config/script/firebaseServiceAccountKey.json`
    * usage: 
      - firebase Auth
      - used in `config/firebaseAdmin.js`     

## API URL
### User
| API Endpoint           | HTTP Method | URL                          | Authorization Header      | Body Parameters                                | Success Response                                                  | Failure Response                                                        |
|------------------------|-------------|------------------------------|---------------------------|------------------------------------------------|------------------------------------------------------------------|-------------------------------------------------------------------------|
| Update User Profile     | POST        | /api/user/updateProfile       | Required (Bearer Token)    | `username`: string, `profileImageUrl`: string  | 200: { message: "User auth handled successfully." }                | 400: { error: "Invalid input data" } <br> 401: { error: "Unauthorized" } <br> 500: { error: "Server Error: An unexpected error occurred" } |

### Feed 
| API Endpoint               | HTTP Method | URL                               | Authorization Header      | Body Parameters                                | Success Response                                                    | Failure Response                                                        |
|----------------------------|-------------|-----------------------------------|---------------------------|------------------------------------------------|--------------------------------------------------------------------|-------------------------------------------------------------------------|
| Create Feed                 | POST        | /api/feed                        | Required (Bearer Token)    | `description`: string, `imageUrls`: array of strings | 201: { message: "Feed created", result: { ... } }                  | 400: { message: "Invalid input data" } <br> 500: { message: "Server error" } |
| Get Feed by ID              | GET         | /api/feed/{feed_id}              | Required (Bearer Token)    | None                                           | 200: { message: "Feed retrieved", result: { ... } }                | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |
| Get All Feeds               | GET         | /api/feed                        | Required (Bearer Token)    | None                                           | 200: { message: "Feeds retrieved", result: [ { ... }, ... ] }       | 500: { message: "Server error" }                                         |
| Update Feed                 | PUT         | /api/feed/{feed_id}              | Required (Bearer Token)    | `description`: string                          | 200: { message: "Feed updated" }                                    | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |
| Delete Feed                 | DELETE      | /api/feed/{feed_id}              | Required (Bearer Token)    | None                                           | 200: { message: "Feed deleted" }                                    | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |
| Like a Feed                 | POST        | /api/feed/{feed_id}/like         | Required (Bearer Token)    | None                                           | 200: { message: "Feed liked" }                                      | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |
| Unlike a Feed               | DELETE      | /api/feed/{feed_id}/like         | Required (Bearer Token)    | None                                           | 200: { message: "Feed unliked" }                                    | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |
| Check Like Status of a Feed | GET         | /api/feed/{feed_id}/like/status  | Required (Bearer Token)    | None                                           | 200: { message: "Like status retrieved", result: true/false }       | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |
| Get Like Count of a Feed    | GET         | /api/feed/{feed_id}/like/count   | Required (Bearer Token)    | None                                           | 200: { message: "Like count retrieved", result: <number> }          | 400: { message: "Invalid feed_id format" } <br> 404: { message: "Feed not found" } <br> 500: { message: "Server error" } |


