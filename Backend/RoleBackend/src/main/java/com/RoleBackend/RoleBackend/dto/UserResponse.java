package com.RoleBackend.RoleBackend.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private List<String> roles;
}
