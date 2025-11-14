package com.wcci.wellness.entity;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Mood {

    @Id
    @GeneratedValue
    private Long Id;

    private LocalDate date;
    private int rating;

    public Mood(LocalDate date, int rating) {
        this.date = date;
        this.rating = rating;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }    
}
