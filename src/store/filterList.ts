import { spy, observable, action, computed } from 'mobx'
import { listStore } from './list'
import { ALL, ACTIVE, DIDED } from '../util/config'
import { ListInterface } from './interface'
// useStrict(true);

spy(e => {
  // console.log(e, 'e')
})

class FilterListStore {
  @observable isShow: string = ALL

  @action.bound
  activedTodos(): void {
    this.isShow = ACTIVE
  }

  @action.bound
  didedTodos(): void {
    this.isShow = DIDED
  }

  @action.bound
  allTodos(): void {
    this.isShow = ALL
  }

  @computed get toDoList(): Array<object> {
    if (this.isShow === ACTIVE) {
      return listStore.todos.filter((todo: ListInterface) => todo.isActive)
    } else if (this.isShow === DIDED) {
      return listStore.todos.filter((todo: ListInterface) => !todo.isActive)
    } else {
      return listStore.todos
    }
  }
}

const filterListStore = new FilterListStore()
export { filterListStore }
