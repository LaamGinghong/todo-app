import Model, { TodoOptions } from '../model'
import View from '../view'

class Controller {
  private model: Model

  private view: View

  constructor(model: Model, view: View) {
    this.model = model
    this.view = view

    this.onTodoListChanged(this.model.todoList)

    /* 绑定事件 */
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)
    this.view.bindToggleTodo(this.handleToggle)
    this.model.bindTodoListChanged(this.onTodoListChanged)
  }

  onTodoListChanged = (todoList: TodoOptions[]): void => {
    this.view.displayTodoList(todoList)
  }

  handleAddTodo = (text: string): void => {
    this.model.add(text)
  }

  handleEditTodo = (id: number, text: string): void => {
    this.model.edit(id, text)
  }

  handleDeleteTodo = (id: number): void => {
    this.model.delete(id)
  }

  handleToggle = (id: number): void => {
    this.model.toggle(id)
  }
}

export default Controller
