package com.wcci.wellness.service;

import java.util.List;

import com.wcci.wellness.entity.Goal;

public interface GoalService {
    Goal saveGoal(Goal mood);

    List<Goal> getAllGoals();

    Goal getGoalById(Long id);

}