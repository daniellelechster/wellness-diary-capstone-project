package com.wcci.wellness.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wcci.wellness.entity.Journal;
import com.wcci.wellness.service.JournalService;

@CrossOrigin(origins = "http://localhost:3000") // allow frontend dev server
@RestController
@RequestMapping("/api/wellness/journal")
public class JournalController {

    private final JournalService journalService;

    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Journal>> getAllJournals() {
        return ResponseEntity.ok(journalService.getAllJournals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Journal> getJournalById(@PathVariable("id") Long id) {
        Journal journal = journalService.getJournalById(id);
        if (journal != null) {
            return ResponseEntity.ok(journal);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Journal> saveJournal(@RequestBody Journal journal) {
        Journal savedJournal = journalService.createJournal(journal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedJournal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJournal(@PathVariable("id") Long id) {
        journalService.deleteJournal(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Journal> updateJournal(
            @PathVariable("id") Long id,
            @RequestBody Journal updatedJournal) {
        return ResponseEntity.ok(journalService.updateJournal(id, updatedJournal));
    }
}
