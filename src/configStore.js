import { observable, useStrict, action, computed } from 'mobx';
import { ALL,ACTIVE,DIDED } from './util/config';
// useStrict(true);

class Store {
    @observable num = 1;
    @observable isShow = ALL

    @observable todos = [
        {title: 'mobx案列',isActive: true, id: 0}
    ];
    
    @action.bound
    addList(value){
        this.todos = [...this.todos, {title: value, isActive: true ,id: this.num++}]
    };

    @action.bound
    itemFilterMobx(itemId){
        this.todos = this.todos.map((item,index)=>{
            if(item.id == itemId){
                item.isActive = !item.isActive;
            }
            return item
        })
    }

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
            return  this.todos;  
        }else if(this.isShow == ACTIVE){
            return this.todos.filter((todo) => todo.isActive);
        }else if(this.isShow == DIDED){
            return this.todos.filter((todo) => !todo.isActive);
        }
    }
}

const store = new Store();
export default store;

