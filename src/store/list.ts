import { observable, action, computed } from 'mobx'
// useStrict(true);

import { ListInterface } from './interface'

function fetchDate(value: string, num: number, cb: Function) {
  fetch(`/api/data?value=${value}&num=${num}`)
    .then(function(res) {
      return res.json()
    })
    .then(data => {
      cb(data)
    })
}

class ListStore {
  @observable num: number = 1

  @observable todos: Array<object> = [
    { title: 'mobx案列', isActive: true, id: 0 }
  ]

  @action.bound
  addList(value: string): void {
    this.todos = [
      ...this.todos,
      { title: value, isActive: true, id: this.num++ }
    ]
  }
  @computed get addListLength(): number {
    return this.todos.length
  }

  @action.bound
  addListAsync(value: string): void {
    fetchDate(value, this.num++, data => {
      this.todos.push(data) // {title: '我是异步追加的', isActive: true ,id: 100000}
    })
  }

  @action.bound
  itemFilterMobx(itemId: number): void {
    this.todos = this.todos.map((item: ListInterface, index: number) => {
      if (item.id === itemId) {
        item.isActive = !item.isActive
      }
      return item
    })
  }
}

const listStore = new ListStore()
export { listStore }
