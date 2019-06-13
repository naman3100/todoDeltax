import { Component, OnInit, Input } from '@angular/core';
import { todoModel } from '../todo.model';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
@Input() todo:todoModel;

  constructor(private todoSrv: TodoServiceService) { }

  ngOnInit() {}

 onChangeState()
  {
   // let gotTodo =await this.todoSrv.getOneTodo(this.todo.id);
   // gotTodo.completed = !gotTodo.completed;
  this.todoSrv.updateOneTodo(this.todo.id);
  }

}
