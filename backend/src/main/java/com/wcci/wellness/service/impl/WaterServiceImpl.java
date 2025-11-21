package com.wcci.wellness.service.impl;

import com.wcci.wellness.entity.Water;
import com.wcci.wellness.service.WaterService;
import com.wcci.wellness.repository.WaterRepository;
import org.springframework.stereotype.Service;

@Service
public class WaterServiceImpl implements WaterService {

    private final WaterRepository waterRepository;

    public WaterServiceImpl(WaterRepository waterRepository) {
        this.waterRepository = waterRepository;
    }
    
    @Override
    public Water getWaterById(Long id) {
        return waterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Water entry not found with id: " + id));
    }


    @Override
    public Water addGlass(Long id) {
        Water water = waterRepository.findById(id).orElse(new Water(0));
        water.setGlasses(water.getGlasses() + 1);
        return waterRepository.save(water);
    }

    @Override
    public Water removeGlass(Long id) {
        Water water = waterRepository.findById(id).orElse(new Water(0));
        water.setGlasses(Math.max(0, water.getGlasses() - 1));
        return waterRepository.save(water);
    }
}
