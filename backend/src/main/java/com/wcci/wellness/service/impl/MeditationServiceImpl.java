package com.wcci.wellness.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Exercise;
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
        return meditationRepository.save(meditation);
    }

    @Override
    public void deleteMeditation(long id) {
        meditationRepository.deleteById(id);        
    }
}

