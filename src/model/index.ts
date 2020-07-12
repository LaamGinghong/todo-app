export interface TodoOptions {
  id: number
  text: string
  complete: boolean
}

class Model {
  todoList: TodoOptions[] = []

  onTodoListChanged: ((todoList: TodoOptions[]) => void) | undefined

  add = (text: string): void => {
    const todo: TodoOptions = {
      id: (this.todoList[this.todoList.length - 1]?.id ?? 0) + 1,
      text,
      complete: false,
    }
    this.todoList.push(todo)
    this.onTodoListChanged!(this.todoList)
  }

  edit = (id: number, text: string): void => {
    const todo = this.todoList.find((item) => item.id === id)!
    todo.text = text
  }

  delete = (id: number): void => {
    const index = this.todoList.findIndex((item) => item.id === id)
    this.todoList.splice(index, 1)
    this.onTodoListChanged!(this.todoList)
  }

  toggle = (id: number): void => {
    const todo = this.todoList.find((item) => item.id === id)!
    todo.complete = !todo.complete
    this.onTodoListChanged!(this.todoList)
  }

  bindTodoListChanged = (callback: (todoList: TodoOptions[]) => void): void => {
    this.onTodoListChanged = callback
  }
}

export default Model
