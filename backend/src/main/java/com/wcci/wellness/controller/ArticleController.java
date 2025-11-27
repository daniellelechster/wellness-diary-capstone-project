package com.wcci.wellness.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.wellness.entity.Article;
import com.wcci.wellness.service.ArticleService;

@RestController
@RequestMapping("/api/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/{keyword}")
public Article getArticle(@PathVariable String keyword) throws IOException {
    return articleService.getArticleByKeyword(keyword);
}


    @GetMapping("/depression")
    public Article getDepressionArticle() throws IOException {
        return articleService.getArticleByKeyword("Depression");
    }

    @GetMapping("/anxiety")
    public Article getAnxietyArticle() throws IOException {
        return articleService.getArticleByKeyword("Anxiety");
    }

    @GetMapping("/stress")
    public Article getStressArticle() throws IOException {
        return articleService.getArticleByKeyword("Stress");
    }
}
