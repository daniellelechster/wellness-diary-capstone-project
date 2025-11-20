package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wcci.wellness.entity.Mood;


public interface MoodRepository extends JpaRepository<Mood, Long> {

}
