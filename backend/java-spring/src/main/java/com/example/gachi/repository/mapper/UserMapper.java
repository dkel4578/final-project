package com.example.gachi.repository.mapper;

import com.example.gachi.model.User;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface UserMapper {
    Optional<User> selectUser(HashMap<String, Object> map);
    Optional<List<User>> selectUserList();
}
