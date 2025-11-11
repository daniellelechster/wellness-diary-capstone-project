package com.wcci.wellness.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Wellness;
import com.wcci.wellness.repository.WellnessRepository;
import com.wcci.wellness.service.WellnessService;

@Service
public class WellnessServiceImpl implements WellnessService {
    @Autowired
    private WellnessRepository wellnessRepository;

    @Override
    public Wellness saveWellness(Wellness wellness) {
        return wellnessRepository.save(wellness);
    }

    @Override
    public List<Wellness> getAllWellnesss() {
        return wellnessRepository.findAll();
    }

    @Override
    public Wellness getWellnessById(Long id) {
        return wellnessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wellness not found with id: " + id));
    }
}
