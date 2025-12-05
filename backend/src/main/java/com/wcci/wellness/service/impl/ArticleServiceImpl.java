package com.wcci.wellness.service.impl;

import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wcci.wellness.entity.Article;
import com.wcci.wellness.service.ArticleService;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Override
    public List<Article> getArticleByKeyword(String keyword) {
        List<Article> articles = new ArrayList<>();

        try {
            String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String apiUrl = "https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json?keyword=" + encodedKeyword;

            URI uri = URI.create(apiUrl);
            URL url = uri.toURL();

            HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            if (conn.getResponseCode() != HttpsURLConnection.HTTP_OK) {
                System.err.println("Error fetching article: " + conn.getResponseCode());
                return articles;
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(conn.getInputStream());

            JsonNode array = root.path("Result")
                                .path("Resources")
                                .path("Resource");

            if (!array.isArray() || array.size() == 0) {
                return articles;
            }

            for (JsonNode articleNode : array) {

                String id = articleNode.path("Id").asText();
                String title = articleNode.path("Title").asText();
                String description = articleNode.path("Teaser").asText();
                String imageUrl = articleNode.path("ImageUrl").asText();

                String accessibleVersion = articleNode.path("AccessibleVersion").asText();

                // Build content from Sections
                JsonNode sections = articleNode.path("Sections").path("Section");
                StringBuilder contentBuilder = new StringBuilder();

                if (sections.isArray()) {
                    for (JsonNode section : sections) {
                        String sectionTitle = section.path("Title").asText();
                        String sectionContent = section.path("Content").asText();

                        if (!sectionTitle.isEmpty()) {
                            contentBuilder.append(sectionTitle).append("\n\n");
                        }
                        if (!sectionContent.isEmpty()) {
                            contentBuilder.append(sectionContent).append("\n\n");
                        }
                    }
                }

                String content = contentBuilder.toString().trim();

                Article article = new Article(
                        id,
                        title,
                        description,
                        imageUrl,
                        content,
                        accessibleVersion
                );

                articles.add(article);
            }

            conn.disconnect();
            return articles;

        } catch (Exception e) {
            e.printStackTrace();
            return articles;
        }
    }
}
