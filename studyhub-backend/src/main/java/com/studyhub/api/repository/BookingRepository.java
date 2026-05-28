package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studyhub.api.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Tìm hợp đồng của phụ huynh
    List<Booking> findByParentId(Long parentId);

    // Tìm hợp đồng của gia sư
    List<Booking> findByTutorProfileId(Long tutorProfileId);
}