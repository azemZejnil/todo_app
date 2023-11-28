package com.azem.todo.service;

import com.azem.todo.dto.LoginDto;
import com.azem.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login(LoginDto loginDto);
}
