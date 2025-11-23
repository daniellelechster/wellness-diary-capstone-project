package com.wcci.wellness.service;

import com.wcci.wellness.entity.Article;

public interface ArticleService {
    Article getArticleByKeyword(String keyword);
}
