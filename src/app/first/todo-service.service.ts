import { Injectable } from '@angular/core';
import { todoModel } from './todo.model';

import { Storage } from '@ionic/Storage';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  todokey:string="naman";
  private todos: todoModel[] 
  = [
    {id:"1",
    name:"Eat Breakfast",
    description:"Milk, Bread and Cornflakes",
    completed:true
  },{
    id:"2",
    name:"Eat Lunch",
    description:"Rice, Chapatti and Curd",
    completed:false
  },{
    id:"3",
    name:"Eat Snaks",
    description:"Tea and Samosa",
    completed:true
  },{
    id:"4",
    name:"Eat Dinner",
    description:"Paneer, Chapatti and Dal",
    completed:false
  },{
    id:"5",
    name:"Eat Mid Night Pizza",
    description:"Base, Jalapino, Onion, Cheese, Paneer",
    completed:true
  }
]

  constructor(private storage: Storage) {
    this.storage.set(this.todokey,this.todos)
   }

   async getTodos(){
     let getTodo = await this.storage.get(this.todokey);
    // console.log(getTodo)
      return [...getTodo];
  }

 async getOneTodo(todoId:String)
  {
     let todoos =await this.storage.get(this.todokey)
    let oneTodo = todoos.find(todo => {
      return todo.id===todoId
    })
    return {...oneTodo};
  }

  async addTodo(todo: todoModel)
  {
    const gotTodo=await this.storage.get(this.todokey)
    if(gotTodo)
    {
      gotTodo.push(todo)
      await this.storage.set(this.todokey,gotTodo);
    }
    else{
      await this.storage.set(this.todokey,[todo])
    }
  }

  async deleteTodo(todoId:String)
  {
    const getTodo =await this.storage.get(this.todokey);
    const newList = getTodo.filter((todo)=>{
      return todo.id !== todoId;
    })
    await this.storage.set(this.todokey,newList)
}

async updateTodo(updatedTodo:todoModel)
{
  let todos:todoModel[] = await this.getTodos();
  let newTodos:todoModel[] = todos.filter((todo)=>{
    return todo.id !== updatedTodo.id;
  });
  newTodos.push(updatedTodo);
  console.log(newTodos);
  await this.storage.set(this.todokey,newTodos);
}


}

