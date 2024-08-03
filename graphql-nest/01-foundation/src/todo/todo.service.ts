import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false},
    { id: 2, description: 'Piedra del Tiempo', done: false},
    { id: 3, description: 'Piedra del Espacio', done: false},
  ];

  create({ description }: CreateTodoDto): Todo {

    const todo = new Todo();
    todo.id = Math.max( ...this.todos.map( todo => todo.id), 0) + 1;
    todo.description = description;

    this.todos.push( todo );

    return todo;
  }

  findAll():Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find( todo => todo.id === id);
    if ( !todo ) throw  new NotFoundException(`TODO with id ${ id } dotn found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto):Todo {
    //Variables recividas
    const { done , description } = updateTodoDto;
    //Buscar todo
    const todo = this.findOne(id)
    if ( done !== undefined) todo.done = done;
    if ( description ) todo.description = description;

    this.todos = this.todos.map( dbTodo =>{
      if( dbTodo.id === id ) return todo
      return dbTodo
    })
    
    return todo;
  }

  remove(id: number) {
    //Buscar si existe el id
    this.findOne(id);
    //Elimina el item
    this.todos = this.todos.filter( todo => {
      return todo.id !== id
    });
  }
}
