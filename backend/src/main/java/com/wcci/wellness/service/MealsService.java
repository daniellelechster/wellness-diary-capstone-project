package com.wcci.wellness.service;

import com.wcci.wellness.entity.Meals;
import java.util.List;

public interface MealsService {

    List<Meals> getAllMeals();

    Meals getMealsById(Long id);

    Meals createMeals(Meals meals);

    Meals toggleBreakfast(Long id);

    Meals toggleLunch(Long id);

    Meals toggleDinner(Long id);

    Meals addSnack(Long id);

    Meals removeSnack(Long id);
}
