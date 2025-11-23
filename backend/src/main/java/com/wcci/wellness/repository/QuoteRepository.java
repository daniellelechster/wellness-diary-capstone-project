package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wcci.wellness.entity.Quote;

public interface QuoteRepository extends JpaRepository<Quote, String> {

}
