package com.studyhub.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studyhub.api.entity.JobPost;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Integer> {
    List<JobPost> findByStatus(String status);
}
