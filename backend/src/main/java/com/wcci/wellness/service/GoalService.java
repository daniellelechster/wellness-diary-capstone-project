package com.wcci.wellness.service;

import java.util.List;

import com.wcci.wellness.entity.Goal;

public interface GoalService {
    Goal createGoal(Goal goal);

    List<Goal> getAllGoals();

    Goal getGoalById(Long id);

    void deleteGoal(Long id);

    Goal updateGoalStatus(Long id, String status);
}