package com.wcci.wellness.repository;

import com.wcci.wellness.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByCreatedAt(LocalDate createdAt);
}
