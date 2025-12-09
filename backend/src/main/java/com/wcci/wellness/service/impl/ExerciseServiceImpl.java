package com.wcci.wellness.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Exercise;
import com.wcci.wellness.repository.ExerciseRepository;
import com.wcci.wellness.service.ExerciseService;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise entry not found with id: " + id));
    }

    // ✅ Return all exercises for a given date
    @Override
    public List<Exercise> getExercisesByDate(LocalDate date) {
        ZoneId zone = ZoneId.systemDefault();
        OffsetDateTime start = date.atStartOfDay(zone).toOffsetDateTime();
        OffsetDateTime end = date.plusDays(1).atStartOfDay(zone).toOffsetDateTime();
        return exerciseRepository.findAllByCreatedAtBetween(start, end);
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise saveExercise(Exercise exercise) {        
        exercise.setMinutes(Math.max(0, exercise.getMinutes()));
        exercise.setCompleted(exercise.getMinutes() > 0);
        return exerciseRepository.save(exercise);
    }

    // ✅ Delete by id
    @Override
    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}