// package com.wcci.wellness.controller;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.wcci.wellness.entity.Goal;
// import com.wcci.wellness.service.GoalService;

// import java.util.List;

// @RestController
// @RequestMapping("/api/wellness")
// public class GoalController {
    
//     private GoalService goalService;

//     public GoalController(GoalService goalService) {
//         this.goalService = goalService;
//     }

    
//     @PostMapping
//     public ResponseEntity<Goal> saveGoal(@RequestBody Goal goal) {
//     Goal savedGoal = goalService.saveGoal(goal);
//         return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
// }
//     @GetMapping("/all")
//     public ResponseEntity<List<Goal>> getAllGoals() {
//         return ResponseEntity.ok(goalService.getAllGoals());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Goal> getGoalById(@PathVariable Long id) {
//         return ResponseEntity.ok(goalService.getGoalById(id));
//     }
// }