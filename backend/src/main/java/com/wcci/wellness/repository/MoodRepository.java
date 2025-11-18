package com.wcci.wellness.repository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wcci.wellness.entity.Mood;


public interface MoodRepository extends JpaRepository<Mood, Long> {
    List<Mood> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
