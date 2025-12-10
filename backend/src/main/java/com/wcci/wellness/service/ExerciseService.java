package com.wcci.wellness.service;

import java.time.LocalDate;
import java.util.List;

import com.wcci.wellness.entity.Exercise;

public interface ExerciseService {

    Exercise getExerciseById(Long id);    

    List<Exercise> getExercisesByDate(LocalDate date);

    List<Exercise> getAllExercises();

    Exercise saveExercise(Exercise exercise);

    void deleteExercise(Long id);
}
