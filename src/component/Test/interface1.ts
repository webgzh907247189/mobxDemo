// import storeObj from '../../store/index'
// let { listStore,filterListStore} = storeObj

interface FooterInterface{
    isShow: string,
    toDoList: Array<object>,
    activedTodos: () => any,
    didedTodos: () => any,
    allTodos: () => any
}

interface ListStoreInterface{
    num: number,
    todos: Array<object>,
    addList: () => any,
    addListAsync: () => any,
    itemFilterMobx: () => any
}

interface TodoList{
    isShow: string,
    toDoList: Array<object>,
    activedTodos: () => any,
    didedTodos: () => any,
    allTodos: () => any

    num: number,
    todos: Array<object>,
    addList: () => any,
    addListAsync: () => any,
    itemFilterMobx: () => any
}
export {FooterInterface,ListStoreInterface,TodoList}