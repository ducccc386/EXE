package com.studyhub.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.TutorProfile;

public interface TutorProfileRepository extends JpaRepository<TutorProfile, Long> {
    Optional<TutorProfile> findByUserId(Long userId);
}
