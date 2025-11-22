package com.wcci.wellness.service.impl;

import java.net.URI;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wcci.wellness.entity.Quote;
import com.wcci.wellness.service.QuoteService;

@Service
public class QuoteServiceImpl implements QuoteService {
    public Quote getTodaysQuote() {
        try {
            URI uri = URI.create("https://zenquotes.io/api/today");
            URL url = uri.toURL();

            HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            if (conn.getResponseCode() != HttpsURLConnection.HTTP_OK) {
                System.err.println("Error fetching quote: " + conn.getResponseCode());
                return new Quote("No quote available", "Unknown");
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode arr = mapper.readTree(conn.getInputStream());
            JsonNode obj = arr.get(0);

            Quote today = new Quote();
            today.setText(obj.get("q").asText());
            today.setAuthor(obj.get("a").asText());
            
            return today;

        } catch (Exception e) {
            e.printStackTrace();
            return new Quote("No quote available", "Unknown");
        }
    }

}