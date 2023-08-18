package com.example.gachi.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter); //Emitter 저장
    void saveEventCache(String emitterId, Object event); //이벤트 저장
    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(String userId); //해당 회원과 관련된 모든 Emitter 찾음
    Map<String, Object> findAllEventCacheStartWithByMemberId(String userId); // 해당 회원과 관련된 모든 Emitter를 지움
    void deleteById(String id);
    void deleteAllEmitterStartWithId(String userId);
    void deleteAllEventCacheStartWithId(String userId);
}
