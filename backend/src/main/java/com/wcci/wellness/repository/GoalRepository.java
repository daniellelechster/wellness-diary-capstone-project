package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wcci.wellness.entity.Goal;

public interface GoalRepository extends JpaRepository<Goal, Long> {

}
