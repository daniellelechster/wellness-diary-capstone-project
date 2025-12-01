package com.wcci.wellness.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wcci.wellness.entity.Exercise;
import com.wcci.wellness.service.ExerciseService;

@RestController
@RequestMapping("/api/wellness/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        Exercise exercise = exerciseService.getExerciseById(id);
        if (exercise != null) {
            return ResponseEntity.ok(exercise);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<Exercise> getExerciseByDate(@PathVariable String date) {
        LocalDate exerciseDate = LocalDate.parse(date);
        Exercise exercise = exerciseService.getExerciseByDate(exerciseDate);
        return ResponseEntity.ok(exercise);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @PostMapping
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        Exercise savedExercise = exerciseService.saveExercise(exercise);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExercise);
    }

    @PutMapping
    public ResponseEntity<Exercise> createOrUpdateExercise(@RequestBody Exercise exercise) {
        Exercise savedExercise = exerciseService.saveExercise(exercise);
        return ResponseEntity.status(HttpStatus.OK).body(savedExercise);
    }
}
