package com.wcci.wellness.service.impl;

import com.wcci.wellness.entity.Journal;
import com.wcci.wellness.repository.JournalRepository;
import com.wcci.wellness.service.JournalService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JournalServiceImpl implements JournalService {

    private final JournalRepository journalRepository;

    public JournalServiceImpl(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }

    @Override
    public Journal createJournal(Journal journal) {
        // ensure createdAt is set when creating
        if (journal.getCreatedAt() == null) {
            journal.setCreatedAt(LocalDateTime.now());
        }
        return journalRepository.save(journal);
    }

    @Override
    public List<Journal> getAllJournals() {
        return journalRepository.findAll();
    }

    @Override
    public Journal getJournalById(Long id) {
        return journalRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Journal not found with id: " + id));
}

    @Override
    public void deleteJournal(Long id) {
        journalRepository.deleteById(id);
    }

    @Override
    public Journal updateJournal(Long id, Journal updated) {
        Journal existing = journalRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Journal not found with id: " + id));

        // update fields we allow to change
        existing.setText(updated.getText());
        existing.setPrompt(updated.getPrompt() == null ? existing.getPrompt() : updated.getPrompt());
        // keep createdAt unchanged (creation time)
        return journalRepository.save(existing);
    }
}
