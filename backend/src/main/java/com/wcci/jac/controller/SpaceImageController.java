package com.wcci.jac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.jac.entity.SpaceImage;
import com.wcci.jac.service.SpaceImageService;

@RestController
@RequestMapping("/api/jac")

public class SpaceImageController {
@Autowired
private SpaceImageService spaceImageService;

@PostMapping
public ResponseEntity<SpaceImage> saveSpaceImage(@RequestBody SpaceImage spaceImage) {
    SpaceImage savedSpaceImage = spaceImageService.saveSpaceImage(spaceImage);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedSpaceImage);
}


@GetMapping
public ResponseEntity<List<SpaceImage>> getAllSpaceImages() {
    return ResponseEntity.ok(spaceImageService.getAllSpaceImages());
}

@GetMapping("/{id}")
    public ResponseEntity<SpaceImage> getSpaceImageById(@PathVariable Long id) {
        return ResponseEntity.ok(spaceImageService.getSpaceImageById(id));
    }


}

