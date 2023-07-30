import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { EditTodoComponent } from './MyComponents/edit-todo/edit-todo.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'edit-todo/:id', component: EditTodoComponent }, // Add this route for edit-todo component
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
