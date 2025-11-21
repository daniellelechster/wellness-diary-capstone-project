package com.wcci.wellness.controller;

import com.wcci.wellness.entity.Water;
import com.wcci.wellness.service.WaterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
