package com.wcci.wellness.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wcci.wellness.entity.Meditation;

@Repository
public interface MeditationRepository extends JpaRepository<Meditation, Long> {
    Meditation findByCreatedAt(LocalDate createdAt);
}
