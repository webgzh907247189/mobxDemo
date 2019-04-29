import { observable, useStrict, action, computed } from 'mobx';
// useStrict(true);

function fetchDate(value,num,cb){
    fetch(`/api/data?value=${value}&num=${num}`)
    .then(function(res) {
        return res.json();
    })
    .then(data => {
            cb(data)
        }
    )
}

class ListStore {
    @observable num = 1;

    @observable todos = [
        {title: 'mobx案列',isActive: true, id: 0}
    ];

    @action.bound
    addList(value){
        this.todos = [...this.todos, {title: value, isActive: true ,id: this.num++}]
    };
    @computed get addListLength(){
        return this.todos.length
    }

    @action.bound
    addListAsync(value){
        fetchDate(value,this.num++,(data) => {
            this.todos.push(data)  //{title: '我是异步追加的', isActive: true ,id: 100000}
            console.log(this.todos)
        })
    }

    @action.bound
    itemFilterMobx(itemId){
        this.todos = this.todos.map((item,index)=>{
            if(item.id == itemId){
                item.isActive = !item.isActive;
            }
            return item
        })
    }
}

const listStore = new ListStore();
export {listStore}
