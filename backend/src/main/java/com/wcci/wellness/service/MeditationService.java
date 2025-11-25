package com.wcci.wellness.service;

import com.wcci.wellness.entity.Meditation;
import java.time.LocalDate;

public interface MeditationService {

    Meditation getMeditationById(Long id);

    Meditation getMeditationByDate(LocalDate date);

    Meditation logMinutes(LocalDate date, int minutes);

    Meditation toggleCompleted(LocalDate date);

    Meditation saveMeditation(Meditation meditation);
}
