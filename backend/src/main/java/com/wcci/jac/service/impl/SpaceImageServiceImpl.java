package com.wcci.jac.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcci.jac.entity.SpaceImage;
import com.wcci.jac.repository.SpaceImageRepository;
import com.wcci.jac.service.SpaceImageService;

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
        return spaceImageRepository.findById(id).orElseThrow(() -> new RuntimeException("SpaceImage not found with id: " + id));
    }
}
