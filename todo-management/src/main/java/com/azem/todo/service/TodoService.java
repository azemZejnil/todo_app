package com.azem.todo.service;

import com.azem.todo.dto.TodoDto;
import com.azem.todo.entity.Todo;

import java.util.List;

public interface TodoService {

    TodoDto addTodo(TodoDto todoDto);

    TodoDto getTodo(Long id);
    List<TodoDto> getTodos();

    TodoDto updateTodo(TodoDto todoDto, Long id);

    void deleteTodo(Long id);

    TodoDto completeTodo(Long id);

    TodoDto uncompleteTodo(Long id);
}
