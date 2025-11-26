package com.wcci.wellness.service;

import com.wcci.wellness.entity.Exercise;
import java.time.LocalDate;
import java.util.List;

public interface ExerciseService {

    Exercise getExerciseById(Long id);

    Exercise getExerciseByDate(LocalDate date);

    List<Exercise> getAllExercises();

    Exercise saveExercise(Exercise exercise);

    Exercise logMinutes(LocalDate date, int minutes);

    Exercise toggleCompleted(LocalDate date);
}
