package com.wcci.wellness.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Meditation;
import com.wcci.wellness.repository.MeditationRepository;
import com.wcci.wellness.service.MeditationService;

@Service
public class MeditationServiceImpl implements MeditationService {

    private final MeditationRepository meditationRepository;

    public MeditationServiceImpl(MeditationRepository meditationRepository) {
        this.meditationRepository = meditationRepository;
    }

    // @SuppressWarnings("null")
    @Override
    public Meditation getMeditationById(Long id) {
        return meditationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meditation entry not found with id: " + id));
    }

    @Override
    public List<Meditation> getMeditationsByDate(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        return meditationRepository.findAllByCreatedAtBetween(start, end);
    }

    @Override
    public List<Meditation> getAllMeditations() {
        return meditationRepository.findAll();
    }

    @Override
    public Meditation saveMeditation(Meditation meditation) {
        meditation.setMinutes(Math.max(0, meditation.getMinutes()));
        meditation.setCompleted(meditation.getMinutes() > 0);
        if (meditation.getCreatedAt() == null) {
            meditation.setCreatedAt(LocalDateTime.now());
        }
        return meditationRepository.save(meditation);
    }


    @Override
    public Meditation logMinutes(LocalDate date, int minutes) {
        List<Meditation> meditations = getMeditationsByDate(date);
        if (meditations.isEmpty()) {
            Meditation newMeditation = new Meditation();
            newMeditation.setText("Meditation");
            newMeditation.setMinutes(Math.max(0, minutes));
            newMeditation.setCreatedAt(LocalDateTime.now());
            newMeditation.setCompleted(newMeditation.getMinutes() > 0);
            return meditationRepository.save(newMeditation);
        } else {
            Meditation meditation = meditations.get(0); // update first entry
            meditation.setMinutes(Math.max(0, meditation.getMinutes() + minutes));
            meditation.setCompleted(meditation.getMinutes() > 0);
            return meditationRepository.save(meditation);
        }
    }

    @Override
    public Meditation toggleCompleted(LocalDate date) {
        List<Meditation> meditations = getMeditationsByDate(date);
        if (meditations.isEmpty()) {
            throw new RuntimeException("No meditations found for date: " + date);
        }
        Meditation meditation = meditations.get(0);
        meditation.setCompleted(!meditation.isCompleted());
        if (!meditation.isCompleted()) {
            meditation.setMinutes(0);
        }
        return meditationRepository.save(meditation);
    }

    @Override
    public void deleteMeditation(long id) {
        meditationRepository.deleteById(id);        
    }
}

