import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { FormsModule } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Inyección de dependencias usando inject()
  private todoService = inject(TodoService);

  // Utilizar la señal 'todos' del servicio
  public todos = this.todoService.todos;
  public pendingCount = this.todoService.pendingCount;

  newTodoText: string = '';

  // --- Métodos de Interacción ---

  addTodo(): void {
    this.todoService.addTodo(this.newTodoText);
    this.newTodoText = ''; // Limpiar el campo de entrada
  }

  toggle(id: number): void {
    this.todoService.toggleCompleted(id);
  }

  delete(id: number): void {
    this.todoService.deleteTodo(id);
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
  }

  // Para el trackBy en *ngFor
  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
}
