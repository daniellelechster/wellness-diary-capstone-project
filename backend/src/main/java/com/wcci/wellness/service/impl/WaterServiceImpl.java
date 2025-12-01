package com.wcci.wellness.service.impl;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Water;
import com.wcci.wellness.repository.WaterRepository;
import com.wcci.wellness.service.WaterService;

@Service
public class WaterServiceImpl implements WaterService {

    private final WaterRepository waterRepository;

    public WaterServiceImpl(WaterRepository waterRepository) {
        this.waterRepository = waterRepository;
    }

    @SuppressWarnings("null")
    @Override
    public Water getWaterById(Long id) {
        return waterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Water entry not found with id: " + id));
    }

    @Override
    public Water getWaterByDate(LocalDate date) {
        Water water = waterRepository.findByCreatedAt(date);

        if (water == null) {
            water = new Water(0);
            water.setCreatedAt(date);
            water = waterRepository.save(water);
        }
        return water;
    }

    @Override
    public Water addGlass(Long id) {
        @SuppressWarnings("null")
        Water water = waterRepository.findById(id).orElse(new Water(0));
        water.setGlasses(water.getGlasses() + 1);
        return waterRepository.save(water);
    }

    @Override
    public Water removeGlass(Long id) {
        @SuppressWarnings("null")
        Water water = waterRepository.findById(id).orElse(new Water(0));
        water.setGlasses(Math.max(0, water.getGlasses() - 1));
        return waterRepository.save(water);
    }
}
