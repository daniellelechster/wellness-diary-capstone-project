package com.wcci.wellness.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wcci.wellness.entity.Article;
import com.wcci.wellness.service.ArticleService;

@RestController
@RequestMapping("/api/article")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/{keyword}")
    public List<Article> getArticles(@PathVariable("keyword") String keyword) throws IOException {
        return articleService.getArticleByKeyword(keyword);
    }

    @GetMapping("/depression")
    public List<Article> getDepressionArticles() throws IOException {
        return articleService.getArticleByKeyword("Depression");
    }

    @GetMapping("/anxiety")
    public List<Article> getAnxietyArticles() throws IOException {
        return articleService.getArticleByKeyword("Anxiety");
    }

    @GetMapping("/stress")
    public List<Article> getStressArticles() throws IOException {
        return articleService.getArticleByKeyword("Stress");
    }
}
