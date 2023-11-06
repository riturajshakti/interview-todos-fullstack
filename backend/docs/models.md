# Users

```ts
interface User {
  _id: ObjectId
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
```

# Todos

```ts
interface Todo {
  _id: ObjectId
  task: string
  done?: boolean
  user: ObjectId('User')
  createdAt: Date
  updatedAt: Date
}
```