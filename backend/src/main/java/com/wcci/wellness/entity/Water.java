package com.wcci.wellness.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Water {

    @Id
    @GeneratedValue
    private Long id;

    private int glasses;

    public Water() {
    }

    public Water(int glasses) {
        this.glasses = glasses;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getGlasses() {
        return glasses;
    }

    public void setGlasses(int glasses) {
        this.glasses = glasses;
    }
}
