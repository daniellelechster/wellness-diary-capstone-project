package com.wcci.wellness.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.wcci.wellness.entity.Meals;
import com.wcci.wellness.repository.MealsRepository;
import com.wcci.wellness.service.MealsService;

@Service
public class MealsServiceImpl implements MealsService {

    private final MealsRepository mealsRepository;

    public MealsServiceImpl(MealsRepository mealsRepository) {
        this.mealsRepository = mealsRepository;
    }

    @Override
    public List<Meals> getAllMeals() {
        return mealsRepository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Meals getMealsById(Long id) {
        return mealsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meals not found with id: " + id));
    }

    @SuppressWarnings("null")
    @Override
    public Meals createMeals(Meals meals) {
        return mealsRepository.save(meals);
    }

    @Override
    public Meals toggleBreakfast(Long id) {
        Meals meals = getMealsById(id);
        meals.setBreakfast(!meals.isBreakfast());
        meals.setBreakfastTimestamp(meals.isBreakfast() ? LocalDateTime.now() : null);
        return mealsRepository.save(meals);
    }

    @Override
    public Meals toggleLunch(Long id) {
        Meals meals = getMealsById(id);
        meals.setLunch(!meals.isLunch());
        meals.setLunchTimestamp(meals.isLunch() ? LocalDateTime.now() : null);
        return mealsRepository.save(meals);
    }

    @Override
    public Meals toggleDinner(Long id) {
        Meals meals = getMealsById(id);
        meals.setDinner(!meals.isDinner());
        meals.setDinnerTimestamp(meals.isDinner() ? LocalDateTime.now() : null);
        return mealsRepository.save(meals);
    }

    @Override
    public Meals addSnack(Long id) {
        Meals meals = getMealsById(id);
        meals.setSnacks(meals.getSnacks() + 1);
        meals.getSnacksTimestamps().add(LocalDateTime.now());
        return mealsRepository.save(meals);
    }

    @Override
    public Meals removeSnack(Long id) {
        Meals meals = getMealsById(id);
        if (meals.getSnacks() > 0) {
            meals.setSnacks(meals.getSnacks() - 1);
            List<LocalDateTime> timestamps = meals.getSnacksTimestamps();
            if (!timestamps.isEmpty()) {
                timestamps.remove(timestamps.size() - 1);
            }
        }
        return mealsRepository.save(meals);
    }
}
