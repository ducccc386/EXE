package com.studyhub.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecutiryConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Tắt để gọi API từ React dễ dàng
                .authorizeHttpRequests(auth -> auth
                        // Các API công khai
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tutors/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/subjects/**").permitAll()

                        // Các API cần đăng nhập (Ví dụ)
                        .requestMatchers("/api/tutor-profile/**").hasRole("TUTOR")
                        .requestMatchers("/api/jobs/**").hasAnyRole("PARENT", "ADMIN")

                        // Tất cả các request còn lại phải đăng nhập
                        .anyRequest().authenticated())
                // Tạm thời dùng HTTP Basic để test trên Postman hoặc disable nếu chưa làm Login
                // xong
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Bắt buộc phải có cái này để mã hóa mật khẩu khi lưu vào DB
        return new BCryptPasswordEncoder();
    }
}
