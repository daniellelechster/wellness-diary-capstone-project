package com.wcci.wellness.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wcci.wellness.entity.Meditation;
import com.wcci.wellness.service.MeditationService;

@RestController
@RequestMapping("/api/wellness/meditation")
public class MeditationController {

    private final MeditationService meditationService;

    public MeditationController(MeditationService meditationService) {
        this.meditationService = meditationService;
    }

    // ✅ Get meditation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Meditation> getMeditationById(@PathVariable("id") Long id) {
        Meditation meditation = meditationService.getMeditationById(id);
        return ResponseEntity.ok(meditation);
    }

    // ✅ Get all meditations for a given date (returns a list now)
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Meditation>> getMeditationsByDate(@PathVariable("date") String date) {
        LocalDate meditationDate = LocalDate.parse(date);
        List<Meditation> meditations = meditationService.getMeditationsByDate(meditationDate);
        return ResponseEntity.ok(meditations);
    }

    // ✅ Default GET → today’s meditations
    @GetMapping
    public ResponseEntity<List<Meditation>> getTodaysMeditations() {
        LocalDate today = LocalDate.now();
        List<Meditation> meditations = meditationService.getMeditationsByDate(today);
        return ResponseEntity.ok(meditations);
    }

    // ✅ Get all meditations (all dates)
    @GetMapping("/all")
    public ResponseEntity<List<Meditation>> getAllMeditations() {
        return ResponseEntity.ok(meditationService.getAllMeditations());
    }
    
    // ✅ Add a new meditation
    @PostMapping
    public ResponseEntity<Meditation> addMeditation(@RequestBody Meditation meditation) {        
        Meditation savedMeditation = meditationService.saveMeditation(meditation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMeditation);
    }

    // ✅ Update an existing meditation
    @PutMapping("/{id}")
    public ResponseEntity<Meditation> updateMeditation(@PathVariable("id") Long id,
                                                       @RequestBody Meditation meditation) {
        Meditation existing = meditationService.getMeditationById(id);
        existing.setText(meditation.getText());
        existing.setMinutes(Math.max(0, meditation.getMinutes()));
        existing.setCompleted(existing.getMinutes() > 0);
        Meditation updated = meditationService.saveMeditation(existing);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a meditation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeditation(@PathVariable("id") Long id) {
        meditationService.deleteMeditation(id);
        return ResponseEntity.noContent().build();
    }
}