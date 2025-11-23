package com.wcci.wellness.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcci.wellness.entity.Quote;
import com.wcci.wellness.service.QuoteService;

@RestController
@RequestMapping("/api/quote")
public class QuoteController {
    @Autowired
    private QuoteService quoteService;

    @GetMapping()
    public Quote getTodaysQuote() throws IOException {
        return quoteService.getTodaysQuote();
    }
}
