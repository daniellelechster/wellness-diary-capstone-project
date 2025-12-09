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
    public ResponseEntity<Exercise> getExerciseById(@PathVariable("id") Long id) {
        Exercise exercise = exerciseService.getExerciseById(id);        
            return ResponseEntity.ok(exercise);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Exercise>> getExercisesByDate(@PathVariable("date") String date) {
        LocalDate exerciseDate = LocalDate.parse(date);
        List<Exercise> exercises = exerciseService.getExercisesByDate(exerciseDate);
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @PostMapping
    public ResponseEntity<Exercise> addExercise(@RequestBody Exercise exercise) {        
        Exercise savedExercise = exerciseService.saveExercise(exercise);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable("id") Long id,
                                                   @RequestBody Exercise exercise) {
        Exercise existing = exerciseService.getExerciseById(id);
        existing.setText(exercise.getText());
        existing.setMinutes(Math.max(0, exercise.getMinutes()));
        existing.setCompleted(existing.getMinutes() > 0);
        Exercise updated = exerciseService.saveExercise(existing);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete an exercise (frontend can call this when removing one)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable("id") Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();

    }
}
