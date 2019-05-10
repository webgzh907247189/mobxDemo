// import {listStore,filterListStore} from '../../store/store'
// let { listStore,filterListStore} = storeObj

interface FooterInterface {
  filterListStore: {
    isShow: string
    toDoList: Array<object>
    activedTodos: () => any
    didedTodos: () => any
    allTodos: () => any
  }
}

interface ListStoreInterface {
  listStore: {
    num: number
    todos: Array<object>
    addList: (value: string) => any
    addListAsync: (value: string) => any
    itemFilterMobx: (itemId: number) => any
  }
}

interface TodoList {
  filterListStore: {
    isShow: string
    toDoList: Array<object>
    activedTodos: () => any
    didedTodos: () => any
    allTodos: () => any
  }
  listStore: {
    num: number
    todos: Array<object>
    addList: (value: string) => any
    addListAsync: (value: string) => any
    itemFilterMobx: (itemId: number) => any
  }
}

interface TodoListInterface {
  isActive: boolean
  title: string
  id: number
}

interface TodoItemInterFace {
  item: {
    isActive: boolean
    title: string
    id: number
  }
  actionFilter: {
    itemFilterMobx: (itemId: number) => any
  }
}
export {
  FooterInterface,
  ListStoreInterface,
  TodoList,
  TodoListInterface,
  TodoItemInterFace
}
