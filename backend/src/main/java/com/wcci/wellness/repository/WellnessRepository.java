package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wcci.wellness.entity.Wellness;


public interface WellnessRepository extends JpaRepository<Wellness, Long> {

}
