import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from './todo-service.service';
import { todoModel } from './todo.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  todos:todoModel[];
  
  constructor(private todoSer : TodoServiceService, private alertCtrl: AlertController, private router : Router) {
    
   }

  ngOnInit() {
    
  }

ionViewWillEnter(){
  const gotTodo = this.todoSer.getTodos();
  this.todos=gotTodo;
  }

ionViewWillLeave(){
  const gotTodo =this.todoSer.getTodos();
  this.todos=gotTodo;
  }

onAddClick()
  {
    console.log(this.todos);
    this.alertCtrl.create({
      header:"Please, provide the input",
      inputs: [
        {
          name: 'Title',
          type: 'text',
          placeholder: 'Title',
        },
        {
          name: 'Description',
          type: 'text',
          placeholder: 'description'
        }],
        buttons:[{
          text:'Cancel',
          role:'cancel'
        },
      {
        text:'Ok',
        handler:(aData)=> {
         let id:string=aData.Title;
         let name:string=id;
         let description:string=aData.Description;
         if(!name || !description)
         {
           this.alertCtrl.create({
            header:"Caution !!",
            message:"Do Not leave the fields empty",
            buttons:[{
              text:'Ok'
          }]
           }).then(alert => {alert.present()});
           return;
         }
          let newTodo  = {id:id,name:name,description:description,completed:false};
      this.todoSer.addTodo(newTodo);
       const gotTodo= this.todoSer.getTodos();;
       //console.log("from firt page " + gotTodo)
       this.todos=gotTodo;
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    })
  }


}
