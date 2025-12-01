package com.wcci.wellness.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import com.wcci.wellness.entity.Goal;
import com.wcci.wellness.repository.GoalRepository;
import com.wcci.wellness.service.GoalService;

@Service
public class GoalServiceImpl implements GoalService {
    @Autowired
    private GoalRepository goalRepository;

    @SuppressWarnings("null")
    @Override
    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    @Override
    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Goal getGoalById(Long id) {
        return goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found with id: " + id));
    }

    @SuppressWarnings("null")
    @Transactional
    public void deleteGoal(Long id) {
        Goal dbGoal = getGoalById(id);
        goalRepository.delete(dbGoal);
    }

    @Transactional
    public Goal updateGoalStatus(Long id, String status) {
        Goal dbGoal = getGoalById(id);
        dbGoal.setStatus(status);
        return goalRepository.save(dbGoal);
    }

}
