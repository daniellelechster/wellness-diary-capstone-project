package com.wcci.wellness.service;

import java.util.List;

import com.wcci.wellness.entity.Mood;

public interface MoodService {
    Mood saveMood(Mood mood);

    List<Mood> getAllMoods();

    Mood getMoodById(Long id);

}
