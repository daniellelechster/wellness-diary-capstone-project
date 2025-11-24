package com.wcci.wellness.repository;

import com.wcci.wellness.entity.Meditation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface MeditationRepository extends JpaRepository<Meditation, Long> {
    Meditation findByCreatedAt(LocalDate createdAt);
}
