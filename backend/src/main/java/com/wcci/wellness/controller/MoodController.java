package com.wcci.wellness.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wcci.wellness.entity.Mood;
import com.wcci.wellness.service.MoodService;

import java.util.List;

@RestController
@RequestMapping("/api/wellness/mood")
public class MoodController {
    
    private MoodService moodService;

    public MoodController(MoodService moodService) {
        this.moodService = moodService;
    }
    
    @PostMapping
    public ResponseEntity<Mood> saveMood(@RequestBody Mood mood) {
    Mood savedMood = moodService.saveMood(mood);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMood);
}
    @GetMapping("/all")
    public ResponseEntity<List<Mood>> getAllMoods() {
        return ResponseEntity.ok(moodService.getAllMoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mood> getMoodById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(moodService.getMoodById(id));
    }
}