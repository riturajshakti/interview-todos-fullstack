import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [
    {
      _id: 'abc',
      task: 'hi there',
      done: true
    }
  ],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload)
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(e => e._id !== action.payload._id)
    },
    toggleTodo: (state, action) => {
      const todos = [...state.todos]
      const todo = todos.find(e => e._id === action.payload._id)
      todo.done = !todo.done;
      state.todos = todos
    },
  },
})

export const { setTodos, addTodo, deleteTodo, toggleTodo } = todosSlice.actions

export default todosSlice.reducer