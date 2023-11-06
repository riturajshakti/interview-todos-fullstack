# ✅ 🌍 POST `/users`

## Request Body

```ts
{
  name: string,
  email: string,
  password: string
}
```

## Response Body

```ts
{
  user: User
}
```

## Description

- Creates a new user if `email` doesn't exist previously
- Returns user details (without `password`)

---

# ✅ 🔒 GET `/users`

## Response Body

```ts
{
  user: User
}
```

## Description

- Return user details (without `password`)

---

# ✅ 🔒 PATCH `/users`

## Request Body

```ts
{
  name?: string,
  email?: string,
  password?: string
}
```

## Response Body

```ts
{
  token?: string
}
```

## Description

- Update user profile details
- Returns new JWT token if `email`/`password` is changed as per the new credentials (which frontend will update immediately in `localStorage`)
