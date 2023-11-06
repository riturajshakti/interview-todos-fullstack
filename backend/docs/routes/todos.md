# ✅ 🔒 POST `/todos`

## Request Body

```ts
{
  task: string,
}
```

## Response Body

```ts
{
  todo?: Todo
}
```

## Description

- Creates a new todo and returns its details

---

# 🔒 GET `/todos`

## Response Body

```ts
{
  todos: Todo[]
}
```

## Description

- Returns all the todos of this user

---

# 🔒 PATCH `/todos/:id`

## Request Body

```ts
{
  task?: string,
  done?: boolean,
}
```

## Description

- Update a given todo
- The given todo must belong of this user only

---

# 🔒 DELETE `/todos/:id`

## Description

- Deletes a given todo
- The given todo must belong of this user only