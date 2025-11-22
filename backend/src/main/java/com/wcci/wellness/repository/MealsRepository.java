package com.wcci.wellness.repository;

import com.wcci.wellness.entity.Meals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealsRepository extends JpaRepository<Meals, Long> {
}
