import { observable, useStrict, action, computed } from 'mobx';
import {listStore} from './list'
import { ALL,ACTIVE,DIDED } from '../util/config';
// useStrict(true);

class FilterListStore {
    @observable isShow = ALL

    @action.bound
    activedTodos() {
        this.isShow = ACTIVE;
    }

    @action.bound
    didedTodos() {
        this.isShow = DIDED;
    }

    @action.bound
    allTodos() {
        this.isShow = ALL;
    }

    @computed get toDoList(){
        if(this.isShow == ALL){
            return  listStore.todos;  
        }else if(this.isShow == ACTIVE){
            return listStore.todos.filter((todo) => todo.isActive);
        }else if(this.isShow == DIDED){
            return listStore.todos.filter((todo) => !todo.isActive);
        }
    }
}

const filterListStore = new FilterListStore();
export {filterListStore}
