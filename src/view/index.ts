import { TodoOptions } from '../model'

class View {
  private static createElement(tag: string, className = '') {
    const element = document.createElement(tag)
    element.setAttribute('class', className)
    return element
  }

  private static getElement(selector: string) {
    return document.querySelector(selector) as HTMLElement
  }

  private app: HTMLDivElement

  private title: HTMLElement

  private todoList: HTMLUListElement

  private button: HTMLButtonElement

  private input: HTMLInputElement

  private form: HTMLFormElement

  constructor() {
    this.app = View.getElement('#root') as HTMLDivElement

    /* 标题 */
    this.title = View.createElement('h1', 'title')
    this.title.textContent = 'Todo App'

    /* 列表 */
    this.todoList = View.createElement('ul') as HTMLUListElement

    /* 表单 */
    this.form = View.createElement('form') as HTMLFormElement
    this.input = View.createElement('input', 'input') as HTMLInputElement
    this.button = View.createElement('button', 'button') as HTMLButtonElement
    this.input.setAttribute('placeholder', '添加待办事项')
    this.input.setAttribute('type', 'text')
    this.input.setAttribute('name', 'todo')
    this.button.textContent = '添加'

    /* 组装 */
    this.form.append(this.input, this.button)
    this.app.append(this.title, this.form, this.todoList)
  }

  get todoText(): string {
    return this.input.value
  }

  private resetInput = (): void => {
    this.input.value = ''
  }

  displayTodoList = (todoList: TodoOptions[]): void => {
    /*
    每次更新节点前都先将当前所有节点删除
     */
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }
    if (todoList.length) {
      const doms = todoList.map((todo) => {
        const li = View.createElement('li', 'todo-item')
        li.id = `${todo.id}`

        const checkbox = View.createElement('input', 'checkbox') as HTMLInputElement
        checkbox.type = 'checkbox'
        checkbox.checked = todo.complete

        const span = View.createElement('span', 'todo-item-inner')
        span.textContent = todo.text
        span.contentEditable = `${true}`

        const button = View.createElement('button', 'delete button')
        button.textContent = '删除'

        li.append(checkbox, span, button)
        return li
      })
      this.todoList.append(...doms)
    } else {
      const tip = View.createElement('p') as HTMLParagraphElement
      tip.textContent = '当前没有待办事项，是否添加？'
      this.todoList.append(tip)
    }
  }

  bindAddTodo = (handler: (text: string) => void): void => {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      if (this.todoText) {
        handler(this.todoText)
        this.resetInput()
      }
    })
  }

  bindDeleteTodo = (handler: (id: number) => void): void => {
    this.todoList.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement
      if (target.classList.contains('delete')) {
        const id = +target.getAttribute('id')!
        handler(id)
      }
    })
  }

  bindToggleTodo = (handler: (id: number) => void): void => {
    this.todoList.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement
      if (target.type === 'checkbox') {
        const id = +target.parentElement!.getAttribute('id')!
        handler(id)
      }
    })
  }
}

export default View
