package com.RoleBackend.RoleBackend.mapper;

import com.RoleBackend.RoleBackend.dto.UserResponse;
import com.RoleBackend.RoleBackend.entity.Role;
import com.RoleBackend.RoleBackend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "roles", source = "roles", qualifiedByName = "roleSetToStringList")
    UserResponse userToUserResponse(User user);

    @Named("roleSetToStringList")
    default List<String> roleSetToStringList(Set<Role> roles) {
        if (roles == null) {
            return null;
        }
        return roles.stream()
                .map(Role::getName)
                .collect(Collectors.toList());
    }
}
