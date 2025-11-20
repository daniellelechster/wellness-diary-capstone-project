package com.wcci.wellness.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wcci.wellness.entity.Mood;
import com.wcci.wellness.repository.MoodRepository;
import com.wcci.wellness.service.MoodService;

@Service
public class MoodServiceImpl implements MoodService {
    @Autowired
    private MoodRepository moodRepository;

    @Override
    public Mood saveMood(Mood mood) {
        return moodRepository.save(mood);
    }

    @Override
    public List<Mood> getAllMoods() {
        return moodRepository.findAll();
    }

    @Override
    public Mood getMoodById(Long id) {
        return moodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mood not found with id: " + id));
    }
}
