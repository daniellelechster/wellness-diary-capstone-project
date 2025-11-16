package com.wcci.wellness.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wellness")
public class MoodController {
    
    private final MoodService moodService;

    @Autowired
    public MoodController(MoodService moodService) {
        this.moodService = moodService;
    }

    @GetMapping("/moods")
    public ResponseEntity<List<Mood>> getAllMoods() {
        return ResponseEntity.ok(moodService.getAllMoods());
    }

    @GetMapping("/moods/{id}")
    public ResponseEntity<Mood> getMoodById(@PathVariable Long id) {
        return ResponseEntity.ok(moodService.getMoodById(id));
    }

    @PostMapping("/moods")
    public ResponseEntity<Mood> createMood(@RequestBody Mood mood) {
        return ResponseEntity.ok(moodService.createMood(mood));
    }

    @PutMapping("/moods/{id}")
    public ResponseEntity<Mood> updateMood(@PathVariable Long id, @RequestBody Mood mood) {
        return ResponseEntity.ok(moodService.updateMood(id, mood));
    }

    @DeleteMapping("/moods/{id}")
    public ResponseEntity<Void> deleteMood(@PathVariable Long id) {
        moodService.deleteMood(id);
        return ResponseEntity.noContent().build();
    }
}