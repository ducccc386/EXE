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
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Cấu hình CORS để React truy cập được
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        // API đăng ký/đăng nhập phải mở hoàn toàn
                        .requestMatchers("/api/auth/**").permitAll()

                        // Các API xem danh sách (cho HomePage)
                        .requestMatchers(HttpMethod.GET, "/api/tutors/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/subjects/**").permitAll()

                        // Phân quyền dựa trên Authority (Khớp trực tiếp với role_name trong SQL)
                        .requestMatchers("/api/tutor-profile/**").hasAuthority("TUTOR")
                        .requestMatchers("/api/jobs/**").hasAnyAuthority("PARENT", "ADMIN")
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")

                        .anyRequest().authenticated())
                // Vì bạn chưa dùng JWT hoàn chỉnh, tạm thời dùng session hoặc permitAll để test
                // flow
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Đổi từ BCrypt sang NoOp
        return org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance();
    }
}