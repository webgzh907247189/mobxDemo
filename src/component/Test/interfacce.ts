import storeObj from '../../store/store'
let { listStore,filterListStore} = storeObj

interface FooterInterface{
    filterListStore
}

interface ListStoreInterface{
    listStore
}

interface TodoList{
    listStore,
    filterListStore
}
export {FooterInterface,ListStoreInterface,TodoList}