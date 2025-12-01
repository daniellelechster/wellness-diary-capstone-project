package com.wcci.wellness.controller;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import com.wcci.wellness.entity.Water;
import com.wcci.wellness.service.WaterService;

@RestController
@RequestMapping("/api/wellness/water")
public class WaterController {

    private final WaterService waterService;

    public WaterController(WaterService waterService) {
        this.waterService = waterService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Water> getWaterById(@PathVariable Long id) {
        Water water = waterService.getWaterById(id);
        if (water != null) {
            return ResponseEntity.ok(water);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<Water> getWaterByDate(@PathVariable String date) {
        LocalDate waterDate = LocalDate.parse(date);
        Water water = waterService.getWaterByDate(waterDate);
        return ResponseEntity.ok(water);
    }

    @PostMapping("/{id}/add")
    public ResponseEntity<Water> addGlass(@PathVariable Long id) {
        Water updated = waterService.addGlass(id);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    @PostMapping("/{id}/remove")
    public ResponseEntity<Water> removeGlass(@PathVariable Long id) {
        Water updated = waterService.removeGlass(id);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }
}
