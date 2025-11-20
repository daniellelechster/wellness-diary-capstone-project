package com.wcci.wellness.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Goal {

    @Id
    @GeneratedValue
    private Long id;

    private String text;
    private String status;
    private LocalDateTime createdAt = LocalDateTime.now();


    public Goal() {
        
    }

    public Goal(String text, String status) {
        this.text = text;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
        
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return text;
    }

    public void setDate(String text) {
        this.text = text;
    }
}
