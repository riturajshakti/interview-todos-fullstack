# Steps to run frontend locally

- update your env to add backend URL
- switch to the project root folder in your cmd
- run `npm install`
- run `npm run dev`
- Make sure to also run the backend (next section)

# Steps to run backend locally

- update your env to add MongoDB URL
- switch to the project root folder in your cmd
- run `npm install`
- run `npm run dev`
- You can import `thunder-client.json` or `postman.json` collection (both are given in the project folder) to test for the APIs Request-Response
- Make sure to also run the frontend (previous section)

> **NOTE:** The `url` environment variable should have value `http://localhost:5000/api` in postman or thunder-client

- For more details about the APIs request response structure, go through the `docs` folder located at the root of this project