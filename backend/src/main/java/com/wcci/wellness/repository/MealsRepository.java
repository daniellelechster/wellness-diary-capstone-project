package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wcci.wellness.entity.Meals;

public interface MealsRepository extends JpaRepository<Meals, Long> {
}
