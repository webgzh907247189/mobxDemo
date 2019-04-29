import { observable, action, computed } from 'mobx';
import {listStore} from './list'
import { ALL,ACTIVE,DIDED } from '../util/config';
import {listInterface} from './interface'
// useStrict(true);

class FilterListStore {
    @observable isShow: string = ALL

    @action.bound
    activedTodos(): void {
        this.isShow = ACTIVE;
    }

    @action.bound
    didedTodos(): void {
        this.isShow = DIDED;
    }

    @action.bound
    allTodos(): void {
        this.isShow = ALL;
    }

    @computed get toDoList(): Array<object>{
        if(this.isShow == ALL){
            return  listStore.todos;  
        }else if(this.isShow == ACTIVE){
            return listStore.todos.filter((todo: listInterface) => todo.isActive);
        }else if(this.isShow == DIDED){
            return listStore.todos.filter((todo: listInterface) => !todo.isActive);
        }
    }
}

const filterListStore = new FilterListStore();
export {filterListStore}
