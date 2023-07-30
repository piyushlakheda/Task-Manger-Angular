import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { EditTodoComponent } from './MyComponents/edit-todo/edit-todo.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'edit-todo/:id', component: EditTodoComponent }, 
  { path: '', redirectTo: '/todos', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
