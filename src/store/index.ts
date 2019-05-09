import { listStore, filterListStore } from './store'
const store = Object.assign({}, listStore, filterListStore)

export default store
