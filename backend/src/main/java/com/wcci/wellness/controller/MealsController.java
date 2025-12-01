package com.wcci.wellness.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wcci.wellness.entity.Meals;
import com.wcci.wellness.service.MealsService;

import java.util.List;

@RestController
@RequestMapping("/api/wellness/meals")
public class MealsController {

    private MealsService mealsService;

    public MealsController(MealsService mealsService) {
        this.mealsService = mealsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Meals>> getAllMeals() {
        return ResponseEntity.ok(mealsService.getAllMeals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meals> getMealsById(@PathVariable Long id) {
        return ResponseEntity.ok(mealsService.getMealsById(id));
    }

    @PostMapping
    public ResponseEntity<Meals> saveMeals(@RequestBody Meals meals) {
        Meals savedMeals = mealsService.createMeals(meals);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMeals);
    }

    @PutMapping("/{id}/breakfast")
    public ResponseEntity<Meals> toggleBreakfast(@PathVariable Long id) {
        return ResponseEntity.ok(mealsService.toggleBreakfast(id));
    }

    @PutMapping("/{id}/lunch")
    public ResponseEntity<Meals> toggleLunch(@PathVariable Long id) {
        return ResponseEntity.ok(mealsService.toggleLunch(id));
    }

    @PutMapping("/{id}/dinner")
    public ResponseEntity<Meals> toggleDinner(@PathVariable Long id) {
        return ResponseEntity.ok(mealsService.toggleDinner(id));
    }

    @PutMapping("/{id}/snack/add")
    public ResponseEntity<Meals> addSnack(@PathVariable Long id) {
        return ResponseEntity.ok(mealsService.addSnack(id));
    }

    @PutMapping("/{id}/snack/remove")
    public ResponseEntity<Meals> removeSnack(@PathVariable Long id) {
        return ResponseEntity.ok(mealsService.removeSnack(id));
    }
}
