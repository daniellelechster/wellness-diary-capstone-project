package com.wcci.wellness.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        return exerciseRepository.findAllByCreatedAtBetween(start, end);
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise saveExercise(Exercise exercise) {
        // Clamp minutes and sync completed flag
        exercise.setMinutes(Math.max(0, exercise.getMinutes()));
        exercise.setCompleted(exercise.getMinutes() > 0);
        return exerciseRepository.save(exercise);
    }

    @Override
    public Exercise logMinutes(LocalDate date, int minutes) {
        // If you still want a helper to add minutes to the first exercise of the day
        List<Exercise> exercises = getExercisesByDate(date);
        if (exercises.isEmpty()) {
            Exercise newExercise = new Exercise(false, "", Math.max(0, minutes));
            newExercise.setCreatedAt(LocalDateTime.now());
            newExercise.setCompleted(newExercise.getMinutes() > 0);
            return exerciseRepository.save(newExercise);
        } else {
            Exercise exercise = exercises.get(0); // pick first entry
            exercise.setMinutes(Math.max(0, exercise.getMinutes() + minutes));
            exercise.setCompleted(exercise.getMinutes() > 0);
            return exerciseRepository.save(exercise);
        }
    }

    @Override
    public Exercise toggleCompleted(LocalDate date) {
        List<Exercise> exercises = getExercisesByDate(date);
        if (exercises.isEmpty()) {
            throw new RuntimeException("No exercises found for date: " + date);
        }
        Exercise exercise = exercises.get(0); // toggle first entry
        boolean newCompleted = !exercise.isCompleted();
        exercise.setCompleted(newCompleted);
        if (!newCompleted) {
            exercise.setMinutes(0);
        }
        return exerciseRepository.save(exercise);
    }

    // ✅ Delete by id
    @Override
    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}