package com.wcci.wellness.service;

import java.util.List;

import com.wcci.wellness.entity.Journal;

public interface JournalService {
    Journal createJournal(Journal journal);

    List<Journal> getAllJournals();

    Journal getJournalById(Long id);

    void deleteJournal(Long id);
}