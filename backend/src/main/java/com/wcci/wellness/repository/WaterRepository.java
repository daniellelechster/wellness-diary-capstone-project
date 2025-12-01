package com.wcci.wellness.repository;

import com.wcci.wellness.entity.Water;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface WaterRepository extends JpaRepository<Water, Long> {
    Water findByCreatedAt(LocalDate date);
}
