package com.wcci.wellness.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Article {

    @Id
    private String id;
    private String title;
    private String description;
    private String imageUrl;
    private String content;

    public Article() {
    }

    public Article(String id, String title, String description, String imageUrl, String content) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
