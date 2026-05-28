package com.studyhub.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Bật tính năng Message Broker cho WebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Cấu hình cổng kết nối WebSocket từ Frontend/Postman
        // Cho phép kết nối trực tiếp hoặc qua fallback SockJS
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*");
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Kích hoạt một broker ảo với tiền tố /topic để quản lý các phòng chat
        registry.enableSimpleBroker("/topic");

        // Tiền tố dành cho các hàm xử lý nhận tin nhắn trong Controller (Ví dụ:
        // /app/chat.send)
        registry.setApplicationDestinationPrefixes("/app");
    }
}