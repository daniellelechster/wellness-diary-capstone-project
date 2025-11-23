package com.wcci.wellness.controller;

import com.wcci.wellness.entity.Journal;
import com.wcci.wellness.service.JournalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<Journal> getJournalById(@PathVariable Long id) {
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
    public ResponseEntity<Void> deleteJournal(@PathVariable Long id) {
        journalService.deleteJournal(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Journal> updateJournal(@PathVariable Long id, @RequestBody Journal updated) {
        Journal journal = journalService.getJournalById(id);
        journal.setText(updated.getText());
        Journal saved = journalService.createJournal(journal);
        return ResponseEntity.ok(saved);
    }

}
