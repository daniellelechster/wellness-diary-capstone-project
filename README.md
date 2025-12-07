# Wellness Diary Capstone Project

## Overview

The **Wellness Diary** is a personal health and wellness tracking application designed to help users monitor daily habits, moods, meals, hydration, meditation, and goals. The application provides an intuitive interface
to log and review wellness activities over time, giving users insight into patterns that affect their physical and mental well-being.

## Features

* **Meal Tracking**: Log Breakfast, Lunch, Dinner, and Snacks with timestamps and checkboxes.
* **Water Tracking**: Track daily water intake with automatic timestamping.
* **Mood Tracking**: Record daily mood ratings with time tracking.
* **Meditation Logging**: Track meditation sessions including date and duration.
* **Goal Setting**: Create and manage personal wellness goals with timestamps.
* **Journal**: Record thoughts and reflections with prompts and timestamps.
* **Responsive UI**: Designed with React for smooth interaction and data updates.
* **API Support**: Backend RESTful API implemented with Spring Boot to support frontend interactions.
  Integrates with external APIs including [OpenWeatherMap](https://openweathermap.org/api),
  [ZenQuotes](https://zenquotes.io/), and the [HHS.gov API](https://www.hhs.gov/web/developer/index.html).

## Technology Stack

* **Frontend**: React, JSX, HTML, CSS
* **Backend**: Java, Spring Boot
* **Database**: H2 (development) / Optional external database for production
* **Other Tools**: Gradle, Postman (for API testing)
* **External APIs**: OpenWeatherMap, ZenQuotes, HHS.gov API

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend folder and build with Gradle:

   ```bash
   cd backend
   ./gradlew build
   ```

3. Run the Spring Boot backend:

   ```bash
   ./gradlew bootRun
   ```

4. Navigate to the frontend folder and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

5. Run the React app:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the Wellness Diary.

## API Endpoints

* **Meal**: `GET /api/wellness/meal`, `POST /api/wellness/meal`
* **Water**: `GET /api/wellness/water`, `POST /api/wellness/water`
* **Mood**: `GET /api/wellness/mood`, `POST /api/wellness/mood`
* **Meditation**: `GET /api/wellness/meditation`, `POST /api/wellness/meditation`
* **Goal**: `GET /api/wellness/goal`, `POST /api/wellness/goal`
* **Journal**: `GET /api/wellness/journal`, `POST /api/wellness/journal`

## Usage

* Toggle meals, water, and meditation logs to automatically record timestamps.
* Rate your mood daily to track emotional trends over time.
* Add goals and journal entries to maintain holistic wellness tracking.
* View historical data in the dashboard to monitor progress and patterns.

## Contributing

This project is developed and maintained exclusively by **CodeBusters**.
We are not accepting outside contributions at this time. The code is not open source and is intended for academic use only.
