package com.wcci.wellness.service;

import java.time.LocalDate;
import java.util.List;

import com.wcci.wellness.entity.Meditation;

public interface MeditationService {

    Meditation getMeditationById(Long id);

    List<Meditation> getMeditationsByDate(LocalDate date);

    List<Meditation> getAllMeditations();

    Meditation saveMeditation(Meditation meditation);

    Meditation logMinutes(LocalDate date, int minutes);

    Meditation toggleCompleted(LocalDate date);

    void deleteMeditation(long id);
}
