package com.wcci.wellness.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Meals {

    @Id
    @GeneratedValue
    private Long id;

    private boolean breakfast;
    private boolean lunch;
    private boolean dinner;

    private LocalDateTime breakfastTimestamp;
    private LocalDateTime lunchTimestamp;
    private LocalDateTime dinnerTimestamp;

    private int snacks;

    @ElementCollection
    private List<LocalDateTime> snacksTimestamps = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public Meals() {}

    public Meals(boolean breakfast, boolean lunch, boolean dinner, int snacks) {
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.snacks = snacks;
        this.createdAt = LocalDateTime.now();
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public boolean isBreakfast() { return breakfast; }
    public void setBreakfast(boolean breakfast) { this.breakfast = breakfast; }

    public boolean isLunch() { return lunch; }
    public void setLunch(boolean lunch) { this.lunch = lunch; }

    public boolean isDinner() { return dinner; }
    public void setDinner(boolean dinner) { this.dinner = dinner; }

    public LocalDateTime getBreakfastTimestamp() { return breakfastTimestamp; }
    public void setBreakfastTimestamp(LocalDateTime breakfastTimestamp) { this.breakfastTimestamp = breakfastTimestamp; }

    public LocalDateTime getLunchTimestamp() { return lunchTimestamp; }
    public void setLunchTimestamp(LocalDateTime lunchTimestamp) { this.lunchTimestamp = lunchTimestamp; }

    public LocalDateTime getDinnerTimestamp() { return dinnerTimestamp; }
    public void setDinnerTimestamp(LocalDateTime dinnerTimestamp) { this.dinnerTimestamp = dinnerTimestamp; }

    public int getSnacks() { return snacks; }
    public void setSnacks(int snacks) { this.snacks = snacks; }

    public List<LocalDateTime> getSnacksTimestamps() { return snacksTimestamps; }
    public void setSnacksTimestamps(List<LocalDateTime> snacksTimestamps) { this.snacksTimestamps = snacksTimestamps; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
