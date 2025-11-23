package com.wcci.wellness.service;

import java.time.LocalDate;

import com.wcci.wellness.entity.Water;

public interface WaterService {

    Water getWaterById(Long id);

    Water getWaterByDate(LocalDate date);

    Water addGlass(Long id);

    Water removeGlass(Long id);
}
