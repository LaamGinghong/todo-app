export interface TodoOptions {
  id: number
  text: string
  complete: boolean
}

class Model {
  todoList: TodoOptions[]

  onTodoListChanged: ((todoList: TodoOptions[]) => void) | undefined

  constructor() {
    this.todoList = JSON.parse(localStorage.getItem('todoList')!) ?? []
  }

  add = (text: string): void => {
    const todo: TodoOptions = {
      id: (this.todoList[this.todoList.length - 1]?.id ?? 0) + 1,
      text,
      complete: false,
    }
    this.todoList.push(todo)
    this.common()
  }

  edit = (id: number, text: string): void => {
    const todo = this.todoList.find((item) => item.id === id)!
    todo.text = text
    this.common(false)
  }

  delete = (id: number): void => {
    const index = this.todoList.findIndex((item) => item.id === id)
    this.todoList.splice(index, 1)
    this.common()
  }

  toggle = (id: number): void => {
    const todo = this.todoList.find((item) => item.id === id)!
    todo.complete = !todo.complete
    this.common()
  }

  common = (change = true): void => {
    change && this.onTodoListChanged!(this.todoList)
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }

  bindTodoListChanged = (callback: (todoList: TodoOptions[]) => void): void => {
    this.onTodoListChanged = callback
  }
}

export default Model
