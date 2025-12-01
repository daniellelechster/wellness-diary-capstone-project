package com.wcci.wellness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wcci.wellness.entity.Journal;

public interface JournalRepository extends JpaRepository<Journal, Long> {

}
