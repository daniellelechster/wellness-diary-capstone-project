package com.wcci.wellness.repository;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wcci.wellness.entity.Meditation;

@Repository
public interface MeditationRepository extends JpaRepository<Meditation, Long> {
    List<Meditation> findAllByCreatedAtBetween(OffsetDateTime start, OffsetDateTime end);
}
