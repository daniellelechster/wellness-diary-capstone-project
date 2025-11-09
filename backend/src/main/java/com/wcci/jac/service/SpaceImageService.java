package com.wcci.jac.service;

import java.util.List;

import com.wcci.jac.entity.SpaceImage;

public interface SpaceImageService {
    SpaceImage saveSpaceImage(SpaceImage spaceImage);

    List<SpaceImage> getAllSpaceImages();

    SpaceImage getSpaceImageById(Long id);

}


