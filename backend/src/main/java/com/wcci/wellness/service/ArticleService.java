package com.wcci.wellness.service;

import java.util.List;
import com.wcci.wellness.entity.Article;

public interface ArticleService {
    List<Article> getArticleByKeyword(String keyword);
}
