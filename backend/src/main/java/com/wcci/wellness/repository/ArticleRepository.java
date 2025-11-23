package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wcci.wellness.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, String> {

}
