import { Injectable, signal, computed, Injector, inject, effect } from '@angular/core';
import { Todo } from '../models/todo.model';

// Clave para localStorage
const STORAGE_KEY = 'todo-list';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Utilizar 'signals' para el estado reactivo
  private todosSignal = signal<Todo[]>(this.loadFromLocalStorage());

  // Utilizar propiedad solo lectura para el componente
  public todos = computed(() => this.todosSignal());
  public pendingCount = computed(() => this.todosSignal().filter(todo => !todo.completed).length);

  // Inyección de dependencias
  private injector = inject(Injector);

  constructor() {
    // Llamar a la función de efecto en el constructor
    this.setupLocalStorageEffect();
  }

  private setupLocalStorageEffect(): void {
    effect(() => {
      // Cuando 'todosSignal' cambie, guardar en localStorage.
      const currentTodos = this.todos();
      this.saveToLocalStorage(currentTodos);
    }, { injector: this.injector }); // Pasar el inyector
  }

  private loadFromLocalStorage(): Todo[] {
    // Seguridad para SSR
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  private saveToLocalStorage(todos: Todo[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }

  // --- Métodos CRUD ---

  addTodo(text: string): void {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };

    this.todosSignal.update(todos => [...todos, newTodo]);
  }

  toggleCompleted(id: number): void {
    this.todosSignal.update(todos => todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  deleteTodo(id: number): void {
    this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
  }

  clearCompleted(): void {
    this.todosSignal.update(todos => todos.filter(todo => !todo.completed));
  }

}
