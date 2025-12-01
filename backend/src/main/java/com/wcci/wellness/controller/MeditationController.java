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

    @GetMapping("/{id}")
    public ResponseEntity<Meditation> getMeditationById(@PathVariable("id") Long id) {
        Meditation meditation = meditationService.getMeditationById(id);
        if (meditation != null) {
            return ResponseEntity.ok(meditation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<Meditation> getMeditationByDate(@PathVariable("date") String date) {
        LocalDate meditationDate = LocalDate.parse(date);
        Meditation meditation = meditationService.getMeditationByDate(meditationDate);
        return ResponseEntity.ok(meditation);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Meditation>> getAllMeditations() {
        return ResponseEntity.ok(meditationService.getAllMeditations());
    }

    @PostMapping
    public ResponseEntity<Meditation> saveMeditation(@RequestBody Meditation meditation) {
        Meditation savedMeditation = meditationService.saveMeditation(meditation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMeditation);
    }

    @PutMapping
    public ResponseEntity<Meditation> createOrUpdateMeditation(@RequestBody Meditation meditation) {
        Meditation savedMeditation = meditationService.saveMeditation(meditation);
        return ResponseEntity.status(HttpStatus.OK).body(savedMeditation);
    }
}
