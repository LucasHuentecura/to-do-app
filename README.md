# ToDoApp
>[!NOTE]
>Este proyecto fué generado utilizando [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Descripción del proyecto
Es una aplicación de lista de tareas simple pero robusta.Con la finalidad de mostrar gestión de estado reactiva con Signals y la persistencia de datos con localStorage.

![image alt](https://github.com/LucasHuentecura/to-do-app/blob/9813b8b54578c7200df8fdc118fb761039b66cad/Capturas/Captura%20ToDoApp%201.png)
![image alt](https://github.com/LucasHuentecura/to-do-app/blob/32757594940b9586dd57a44e188bfcea7c0aff57/Capturas/Captura%20ToDoApp%202.png)
![image alt](https://github.com/LucasHuentecura/to-do-app/blob/32757594940b9586dd57a44e188bfcea7c0aff57/Capturas/Captura%20ToDoApp%203.png)

### Características destacadas
- ***Gestión de estado reactiva:*** Implementada utilizando el modelo de Signals de Angular.
- ***Persistencia de datos:*** Las tareas se guardan automáticamente en el localStorage del navegador.
- ***Separación de responsabilidades:*** Uso de un Service dedicado para manejar la lógica de datos (CRUD) y la interacción con localStorage.
- ***Indicador de pendientes:*** Muestra el número de tareas incompletas en tiempo real (usando computed signals).

## Tecnologías utilizadas
- ***Angular:*** Framework principal.
- ***Angular Signals:*** Para la gestión de estado reactiva en el TodoService.
- ***TypeScript:*** Lenguaje de programación.
- ***HTML/CSS:*** Estructura y estilos de la aplicación.
- ***localStorage:*** Mecanísmo de almacenamiento persistente del navegador.
- ***Angular CLI:*** Herramienta de linea de comandos para el desarrollo.

## Estructura del proyecto
src/app/ <br>
├─ models/ <br>
│   └── todo.model.ts  # (Definición de la interfaz Todo) <br>
├─ services/ <br>
│   └── todo.service.ts # (Manejo de la lógica de negocio y localStorage) <br>
└─ app.component.ts    # (Componente principal) <br>

## Principios de diseño aplicados
- ***Separación de intereses (SoC):*** El TodoService es el único responsable de la manipulación del array de tarreas y la interacción con localStorage.
- ***Inmutabilidad:*** Todas las operaciones de actualización de tareas (addTodo, toggleCompleted, deleteTodo) utilizan el método signal.update(), que garantiza que el estado de la señal cambie de forma inmutable.
- ***Rendimiento:*** Uso ed trackBy en las listas (*ngFor) para optimizar el rendimiento de la renderización del DOM.
- ***Uso de effect():*** Implementación del effect() en el servicio para sincronizar el estado reactivo (todosSignal) con el almacenamiento (localStorage).
