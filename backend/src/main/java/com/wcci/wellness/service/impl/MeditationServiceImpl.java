package com.wcci.wellness.service.impl;

import com.wcci.wellness.entity.Meditation;
import com.wcci.wellness.repository.MeditationRepository;
import com.wcci.wellness.service.MeditationService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class MeditationServiceImpl implements MeditationService {

    private final MeditationRepository meditationRepository;

    public MeditationServiceImpl(MeditationRepository meditationRepository) {
        this.meditationRepository = meditationRepository;
    }

    @Override
    public Meditation getMeditationById(Long id) {
        return meditationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meditation entry not found with id: " + id));
    }

    @Override
    public Meditation getMeditationByDate(LocalDate date) {
        Meditation meditation = meditationRepository.findByCreatedAt(date);
        if (meditation == null) {
            meditation = new Meditation(false, 0);
            meditation.setCreatedAt(date);
            meditation = meditationRepository.save(meditation);
        }
        return meditation;
    }

    @Override
    public List<Meditation> getAllMeditations() {
        return meditationRepository.findAll();
    }

    @Override
    public Meditation saveMeditation(Meditation meditation) {
        Meditation existing = meditationRepository.findByCreatedAt(meditation.getCreatedAt());
        if (existing != null) {
            existing.setMinutes(meditation.getMinutes());
            existing.setCompleted(meditation.isCompleted());
            return meditationRepository.save(existing);
        } else {
            return meditationRepository.save(meditation);
        }
    }

    @Override
    public Meditation logMinutes(LocalDate date, int minutes) {
        Meditation meditation = getMeditationByDate(date);
        meditation.setMinutes(minutes);
        return meditationRepository.save(meditation);
    }

    @Override
    public Meditation toggleCompleted(LocalDate date) {
        Meditation meditation = getMeditationByDate(date);
        meditation.setCompleted(!meditation.isCompleted());
        return meditationRepository.save(meditation);
    }
}
