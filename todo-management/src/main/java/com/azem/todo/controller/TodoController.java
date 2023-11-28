package com.azem.todo.controller;

import com.azem.todo.dto.TodoDto;
import com.azem.todo.entity.Todo;
import com.azem.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){
        TodoDto savedTodoDto = todoService.addTodo(todoDto);
        return new ResponseEntity<>(savedTodoDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long id) {
        TodoDto todoDto = todoService.getTodo(id);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getTodos() {
        List<TodoDto> todos = todoService.getTodos();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable Long id) {
        TodoDto updatedTodoDto = todoService.updateTodo(todoDto, id);
        return ResponseEntity.ok(updatedTodoDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Todo deleted successfuly");
    }

    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable Long id) {
        TodoDto updatedTodo = todoService.completeTodo(id);
        return ResponseEntity.ok(updatedTodo);
    }

    @PatchMapping("{id}/uncomplete")
    public ResponseEntity<TodoDto> uncompleteTodo(@PathVariable Long id) {
        TodoDto updatedTodo = todoService.uncompleteTodo(id);
        return ResponseEntity.ok(updatedTodo);
    }
}
