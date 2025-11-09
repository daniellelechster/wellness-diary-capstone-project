package com.wcci.wellness.service;

import java.util.List;

import com.wcci.wellness.entity.SpaceImage;

public interface SpaceImageService {
    SpaceImage saveSpaceImage(SpaceImage spaceImage);

    List<SpaceImage> getAllSpaceImages();

    SpaceImage getSpaceImageById(Long id);

}
