package com.example.gachi.service.chat;

import com.example.gachi.model.ChatRoom;
import com.example.gachi.model.ChatRoomJoin;
import com.example.gachi.model.User;
import com.example.gachi.repository.ChatRoomJoinRepository;
import com.example.gachi.repository.ChatRoomRepository;
import com.example.gachi.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomJoinService {
    private final ChatRoomJoinRepository chatRoomJoinRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserService userService;

    public List<ChatRoomJoin> findByUser(User user) {
        return chatRoomJoinRepository.findByUser(user);
    }

    @Transactional
    public Long newRoom(HashMap<String, Object> paramMap) {
        Long uid = Long.valueOf(String.valueOf(paramMap.get("uid")));
        User user = userService.getUserById(uid);

        ChatRoom newChatRoom = ChatRoom.builder()
//                .userId(uid)
                .user(user)
                .name(String.valueOf(paramMap.get("chatRoomName")))
                .build();
        newChatRoom = chatRoomRepository.save(newChatRoom);

        ChatRoomJoin newChatRoomJoin = ChatRoomJoin.builder()
                .chatRoom(newChatRoom)
                .user(user)
                .build();
//        newChatRoomJoin = chatRoomJoinRepository.save(newChatRoomJoin);
        chatRoomJoinRepository.save(newChatRoomJoin);

        return newChatRoom.getId();
    }

//    @Transactional(readOnly = true)
//    public Long check(String user1,String user2){
//        User userFirst = userService.findUserByEmailMethod(user1);
//        List<ChatRoomJoin> listFirst = chatRoomJoinRepository.findByUser(userFirst);
//        Set<ChatRoom> setFirst = new HashSet<>();
//        for(ChatRoomJoin chatRoomJoin : listFirst){
//            setFirst.add(chatRoomJoin.getChatRoom());
//        }
//        User userSecond = userService.findUserByEmailMethod(user2);
//        List<ChatRoomJoin> listSecond = chatRoomJoinRepository.findByUser(userSecond);
//        for(ChatRoomJoin chatRoomJoin : listSecond){
//            if(setFirst.contains(chatRoomJoin.getChatRoom())){
//                return chatRoomJoin.getChatRoom().getId();
//            }
//        }
//        return 0L;
//    }
//
//    @Transactional
//    public void createRoom(String user, ChatRoom chatRoom){
//        ChatRoomJoin chatRoomJoin = new ChatRoomJoin(userService.findUserByEmailMethod(user),chatRoom);
//        chatRoomJoinRepository.save(chatRoomJoin);
//    }
//
//    @Transactional(readOnly = true)
//    public List<ChatRoomJoin> findByChatRoom(ChatRoom chatRoom) {
//        return chatRoomJoinRepository.findByChatRoom(chatRoom);
//    }
//
//    @Transactional
//    public void delete(ChatRoomJoin chatRoomJoin) {
//        chatRoomJoinRepository.delete(chatRoomJoin);
//    }
//
//    public String findAnotherUser(ChatRoom chatRoom, String name) {
//        List<ChatRoomJoin> chatRoomJoins = findByChatRoom(chatRoom);
//        for(ChatRoomJoin chatRoomJoin : chatRoomJoins){
//            if(!name.equals(chatRoomJoin.getUser().getUsername())){
//                return chatRoomJoin.getUser().getUsername();
//            }
//        }
//        return name;
//    }
}
