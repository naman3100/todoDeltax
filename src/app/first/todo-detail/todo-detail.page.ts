import { Component, OnInit, Input } from '@angular/core';
import { todoModel } from '../todo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from '../todo-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {
  loadedtodo : todoModel;
  constructor(private activatedRoute: ActivatedRoute, private todoSrv: TodoServiceService, private router : Router, private alertCtrl: AlertController) { }

   ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      if(!paramMap.has('todoId')){
        this.router.navigate(['/first']);
        return;
      }
      const todoId = paramMap.get('todoId');
      const todo = await this.todoSrv.getOneTodo(todoId)
      this.loadedtodo=todo;
    });
  }

  onDeleteTodo()
  {
    this.alertCtrl.create({
      header:"Are You Sure",
      message:"Do you want to delete the Todo?",
      buttons:[{
        text:'Cancel',
        role:'cancel'
      },
    {
      text:'Delete',
      handler:async ()=> {
        await this.todoSrv.deleteTodo(this.loadedtodo.id);
        this.router.navigate(['/first']);
      }
    }]
    }).then(alertEl => {alertEl.present();
    })
  
  }


}
