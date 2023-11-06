# ✅ 🌍 POST `/login`

## Request Body

```ts
{
  email: string,
  password: string,
  remember?: boolean
}
```

## Response Body

```ts
{
  token: string
}
```

## Description

- Returns login token if the credentials are correct
- If `remember` is `true`, then the JWT won't have any expiry, else, the expiry is 24 hours