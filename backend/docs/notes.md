# Important Notes

- The emoji 🌍 before any endpoint means its a public endpoint and anyone can use it without giving any token

- The emoji 🔒 before any endpoint means its secure endpoint which requires a Bearer token in the request header in the following form:

```ts
{
  authorization: 'Bearer <token>'
}
```

- If response body is not mentioned in any API doc, in that case it will be of the following form:

```ts
{
  message: string
}
```

- In case of any error, response body will always be in the following form:

```ts
{
  message: string
}
```

- The APIs follows the same status codes as recommended by web standards.. e.g. 401 - Unauthorize, 404 - not found, 201 - created, etc