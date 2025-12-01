package com.wcci.wellness.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wcci.wellness.entity.Exercise;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByCreatedAt(LocalDate createdAt);
}
