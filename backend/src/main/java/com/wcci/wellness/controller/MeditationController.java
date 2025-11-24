package com.wcci.wellness.controller;

import com.wcci.wellness.entity.Meditation;
import com.wcci.wellness.service.MeditationService;
import java.time.LocalDate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wellness/meditation")
public class MeditationController {

    private final MeditationService meditationService;

    public MeditationController(MeditationService meditationService) {
        this.meditationService = meditationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meditation> getMeditationById(@PathVariable Long id) {
        Meditation meditation = meditationService.getMeditationById(id);
        if (meditation != null) {
            return ResponseEntity.ok(meditation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<Meditation> getMeditationByDate(@PathVariable String date) {
        LocalDate meditationDate = LocalDate.parse(date);
        Meditation meditation = meditationService.getMeditationByDate(meditationDate);
        return ResponseEntity.ok(meditation);
    }

    @PostMapping
        public ResponseEntity<Meditation> saveMeditation(@RequestBody Meditation meditation) {
        Meditation savedMeditation = meditationService.saveMeditation(meditation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMeditation);
    }
}
