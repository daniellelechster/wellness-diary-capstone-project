package com.wcci.wellness.service;

import com.wcci.wellness.entity.Meditation;
import java.time.LocalDate;
import java.util.List;

public interface MeditationService {

    Meditation getMeditationById(Long id);

    Meditation getMeditationByDate(LocalDate date);

    List<Meditation> getAllMeditations();

    Meditation saveMeditation(Meditation meditation);

    Meditation logMinutes(LocalDate date, int minutes);

    Meditation toggleCompleted(LocalDate date);
}
