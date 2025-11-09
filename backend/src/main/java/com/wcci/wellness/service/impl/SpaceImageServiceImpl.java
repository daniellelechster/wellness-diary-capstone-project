package com.wcci.wellness.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.SpaceImage;
import com.wcci.wellness.repository.SpaceImageRepository;
import com.wcci.wellness.service.SpaceImageService;

@Service
public class SpaceImageServiceImpl implements SpaceImageService {
    @Autowired
    private SpaceImageRepository spaceImageRepository;

    @Override
    public SpaceImage saveSpaceImage(SpaceImage spaceImage) {
        return spaceImageRepository.save(spaceImage);
    }

    @Override
    public List<SpaceImage> getAllSpaceImages() {
        return spaceImageRepository.findAll();
    }

    @Override
    public SpaceImage getSpaceImageById(Long id) {
        return spaceImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SpaceImage not found with id: " + id));
    }
}
