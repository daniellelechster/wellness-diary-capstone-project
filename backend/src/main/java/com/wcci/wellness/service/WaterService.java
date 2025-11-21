package com.wcci.wellness.service;

import com.wcci.wellness.entity.Water;

public interface WaterService {

    Water getWaterById(Long id);

    Water addGlass(Long id);

    Water removeGlass(Long id);
}
