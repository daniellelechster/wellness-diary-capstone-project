package com.wcci.wellness.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Meals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean breakfast;
    private LocalDateTime breakfastTimestamp;

    private boolean lunch;
    private LocalDateTime lunchTimestamp;

    private boolean dinner;
    private LocalDateTime dinnerTimestamp;

    private int snacks;

    @ElementCollection
    private List<LocalDateTime> snacksTimestamps = new ArrayList<>();

    public Meals() {
    }

    public Meals(boolean breakfast, boolean lunch, boolean dinner, int snacks) {
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.snacks = snacks;
    }

    public Long getId() {
        return id;
    }

    public boolean isBreakfast() {
        return breakfast;
    }

    public void setBreakfast(boolean breakfast) {
        this.breakfast = breakfast;
    }

    public LocalDateTime getBreakfastTimestamp() {
        return breakfastTimestamp;
    }

    public void setBreakfastTimestamp(LocalDateTime breakfastTimestamp) {
        this.breakfastTimestamp = breakfastTimestamp;
    }

    public boolean isLunch() {
        return lunch;
    }

    public void setLunch(boolean lunch) {
        this.lunch = lunch;
    }

    public LocalDateTime getLunchTimestamp() {
        return lunchTimestamp;
    }

    public void setLunchTimestamp(LocalDateTime lunchTimestamp) {
        this.lunchTimestamp = lunchTimestamp;
    }

    public boolean isDinner() {
        return dinner;
    }

    public void setDinner(boolean dinner) {
        this.dinner = dinner;
    }

    public LocalDateTime getDinnerTimestamp() {
        return dinnerTimestamp;
    }

    public void setDinnerTimestamp(LocalDateTime dinnerTimestamp) {
        this.dinnerTimestamp = dinnerTimestamp;
    }

    public int getSnacks() {
        return snacks;
    }

    public void setSnacks(int snacks) {
        this.snacks = snacks;
    }

    public List<LocalDateTime> getSnacksTimestamps() {
        return snacksTimestamps;
    }

    public void setSnacksTimestamps(List<LocalDateTime> snacksTimestamps) {
        this.snacksTimestamps = snacksTimestamps;
    }
}
