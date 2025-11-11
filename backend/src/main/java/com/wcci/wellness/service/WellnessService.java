package com.wcci.wellness.service;

import java.util.List;

import com.wcci.wellness.entity.Wellness;

public interface WellnessService {
    Wellness saveWellness(Wellness wellness);

    List<Wellness> getAllWellnesss();

    Wellness getWellnessById(Long id);

}
