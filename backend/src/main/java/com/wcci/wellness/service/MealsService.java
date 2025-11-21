package com.wcci.wellness.service;

import com.wcci.wellness.entity.Meals;

public interface MealsService {

    Meals getMealsById(Long id);

    Meals updateMealStatus(Long id, String mealType);

    Meals addSnack(Long id);

    Meals removeSnack(Long id);
}
