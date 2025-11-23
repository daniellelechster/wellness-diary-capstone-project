package com.wcci.wellness.service.impl;

import java.net.URI;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wcci.wellness.entity.Article;
import com.wcci.wellness.service.ArticleService;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Override
    public Article getArticleByKeyword(String keyword) {
        try {
            String apiUrl = "https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json?keyword="
                    + keyword.replace(" ", "%20");

            URI uri = URI.create(apiUrl);
            URL url = uri.toURL();

            HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            if (conn.getResponseCode() != HttpsURLConnection.HTTP_OK) {
                System.err.println("Error fetching article: " + conn.getResponseCode());
                return new Article("0", "No article available",
                        "No description available",
                        "",
                        "Unable to retrieve content.");
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(conn.getInputStream());

            JsonNode result = root.path("Result").path("Resources").path("Resource");

            if (!result.isArray() || result.size() == 0) {
                return new Article("0", "No article found",
                        "No description available",
                        "",
                        "No matching content.");
            }

            JsonNode articleNode = result.get(0);

            String id = articleNode.path("Id").asText();
            String title = articleNode.path("Title").asText();
            String description = articleNode.path("Teaser").asText();
            String imageUrl = articleNode.path("ImageUrl").asText();

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

            return new Article(id, title, description, imageUrl, content);

        } catch (Exception e) {
            e.printStackTrace();
            return new Article("0", "No article available",
                    "No description available",
                    "",
                    "Unable to retrieve content.");
        }
    }
}
