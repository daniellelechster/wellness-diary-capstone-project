package com.wcci.wellness.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Journal;
import com.wcci.wellness.repository.JournalRepository;
import com.wcci.wellness.service.JournalService;

@Service
public class JournalServiceImpl implements JournalService {

    private final JournalRepository journalRepository;

    public JournalServiceImpl(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }

    @Override
    public Journal createJournal(Journal journal) {
        if (journal.getCreatedAt() == null) {
            journal.setCreatedAt(LocalDateTime.now());
        }

        return journalRepository.save(journal);
    }

    @Override
    public List<Journal> getAllJournals() {
        return journalRepository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Journal getJournalById(Long id) {
        return journalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal not found with id: " + id));
    }

    @SuppressWarnings("null")
    @Override
    public void deleteJournal(Long id) {
        journalRepository.deleteById(id);
    }

    @Override
    public Journal updateJournal(Long id, Journal updated) {
        @SuppressWarnings("null")
        Journal existing = journalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal not found with id: " + id));

        existing.setText(updated.getText());
        existing.setPrompt(updated.getPrompt() == null ? existing.getPrompt() : updated.getPrompt());

        return journalRepository.save(existing);
    }
}
