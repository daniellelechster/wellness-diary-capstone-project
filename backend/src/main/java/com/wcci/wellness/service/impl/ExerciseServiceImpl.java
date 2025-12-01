package com.wcci.wellness.service.impl;

import java.time.LocalDate;
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

    @SuppressWarnings("null")
    @Override
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise entry not found with id: " + id));
    }

    @Override
    public Exercise getExerciseByDate(LocalDate date) {
        Exercise exercise = exerciseRepository.findByCreatedAt(date);
        if (exercise == null) {
            exercise = new Exercise(false, "", 0);
            exercise.setCreatedAt(date);
            exercise = exerciseRepository.save(exercise);
        }
        return exercise;
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise saveExercise(Exercise exercise) {
        Exercise existing = exerciseRepository.findByCreatedAt(exercise.getCreatedAt());
        if (existing != null) {
            existing.setMinutes(exercise.getMinutes());
            existing.setCompleted(exercise.isCompleted());
            existing.setText(exercise.getText());
            return exerciseRepository.save(existing);
        } else {
            return exerciseRepository.save(exercise);
        }
    }

    @Override
    public Exercise logMinutes(LocalDate date, int minutes) {
        Exercise exercise = getExerciseByDate(date);
        exercise.setMinutes(exercise.getMinutes() + minutes);
        return exerciseRepository.save(exercise);
    }

    @Override
    public Exercise toggleCompleted(LocalDate date) {
        Exercise exercise = getExerciseByDate(date);
        exercise.setCompleted(!exercise.isCompleted());
        return exerciseRepository.save(exercise);
    }
}
