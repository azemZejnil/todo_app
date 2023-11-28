package com.azem.todo.service.impl;

import com.azem.todo.dto.TodoDto;
import com.azem.todo.entity.Todo;
import com.azem.todo.repository.TodoRepository;
import com.azem.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImplementation implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = modelMapper.map(todoDto, Todo.class);
        Todo savedTodo = todoRepository.save(todo);
        return modelMapper.map(savedTodo, TodoDto.class);
    }

    @Override
    public TodoDto getTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public List<TodoDto> getTodos() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        Todo updatedTodo =todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        todo.setCompleted(Boolean.TRUE);
        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public TodoDto uncompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
        todo.setCompleted(Boolean.FALSE);
        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }
}
