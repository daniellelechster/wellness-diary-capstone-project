package com.wcci.wellness.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Mood {

    @Id
    @GeneratedValue
    private Long Id;

    private LocalDateTime date;
    private int rating;

    public Mood() {
        
    }

    public Mood(LocalDateTime date, int rating) {
        this.date = date;
        this.rating = rating;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }    
}
