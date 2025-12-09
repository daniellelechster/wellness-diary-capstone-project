package com.wcci.wellness.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.wcci.wellness.entity.*;
import com.wcci.wellness.repository.*;

@Component
public class WellnessPopulator implements CommandLineRunner {

        private final MeditationRepository meditationRepository;
        private final ExerciseRepository exerciseRepository;
        private final MealsRepository mealsRepository;
        private final WaterRepository waterRepository;
        private final GoalRepository goalRepository;
        private final JournalRepository journalRepository;
        private final MoodRepository moodRepository;

        public WellnessPopulator(
                        MeditationRepository meditationRepository,
                        ExerciseRepository exerciseRepository,
                        MealsRepository mealsRepository,
                        WaterRepository waterRepository,
                        GoalRepository goalRepository,
                        JournalRepository journalRepository,
                        MoodRepository moodRepository) {
                this.meditationRepository = meditationRepository;
                this.exerciseRepository = exerciseRepository;
                this.mealsRepository = mealsRepository;
                this.waterRepository = waterRepository;
                this.goalRepository = goalRepository;
                this.journalRepository = journalRepository;
                this.moodRepository = moodRepository;
        }

        @SuppressWarnings("null")
        @Override
        public void run(String... args) {

                // ---------- MEDITATION ----------
                Meditation meditation1 = new Meditation(false, "", 5);
                meditation1.setCreatedAt(LocalDateTime.now().minusDays(10));
                Meditation meditation2 = new Meditation(true, "", 10);
                meditation2.setCreatedAt(LocalDateTime.now().minusDays(9));
                Meditation meditation3 = new Meditation(false, "", 7);
                meditation3.setCreatedAt(LocalDateTime.now().minusDays(8));
                Meditation meditation4 = new Meditation(true, "", 12);
                meditation4.setCreatedAt(LocalDateTime.now().minusDays(7));
                Meditation meditation5 = new Meditation(false, "", 8);
                meditation5.setCreatedAt(LocalDateTime.now().minusDays(6));
                Meditation meditation6 = new Meditation(true, "", 15);
                meditation6.setCreatedAt(LocalDateTime.now().minusDays(5));
                Meditation meditation7 = new Meditation(false, "", 6);
                meditation7.setCreatedAt(LocalDateTime.now().minusDays(4));
                Meditation meditation8 = new Meditation(true, "", 20);
                meditation8.setCreatedAt(LocalDateTime.now().minusDays(3));
                Meditation meditation9 = new Meditation(false, "", 10);
                meditation9.setCreatedAt(LocalDateTime.now().minusDays(2));
                Meditation meditation10 = new Meditation(true, "", 25);
                meditation10.setCreatedAt(LocalDateTime.now().minusDays(1));

                meditationRepository.saveAll(List.of(
                                meditation1, meditation2, meditation3, meditation4, meditation5,
                                meditation6, meditation7, meditation8, meditation9, meditation10));

                // ---------- EXERCISE ----------
                Exercise exercise1 = new Exercise(true, "Morning jog", 20);
                exercise1.setCreatedAt(LocalDateTime.now().minusDays(10));
                Exercise exercise2 = new Exercise(false, "Light stretching", 5);
                exercise2.setCreatedAt(LocalDateTime.now().minusDays(9));
                Exercise exercise3 = new Exercise(true, "Gym session", 45);
                exercise3.setCreatedAt(LocalDateTime.now().minusDays(8));
                Exercise exercise4 = new Exercise(false, "Yoga session", 30);
                exercise4.setCreatedAt(LocalDateTime.now().minusDays(7));
                Exercise exercise5 = new Exercise(true, "Evening walk", 15);
                exercise5.setCreatedAt(LocalDateTime.now().minusDays(6));
                Exercise exercise6 = new Exercise(false, "Bike ride", 25);
                exercise6.setCreatedAt(LocalDateTime.now().minusDays(5));
                Exercise exercise7 = new Exercise(true, "HIIT workout", 35);
                exercise7.setCreatedAt(LocalDateTime.now().minusDays(4));
                Exercise exercise8 = new Exercise(false, "Swimming", 50);
                exercise8.setCreatedAt(LocalDateTime.now().minusDays(3));
                Exercise exercise9 = new Exercise(true, "Pilates", 40);
                exercise9.setCreatedAt(LocalDateTime.now().minusDays(2));
                Exercise exercise10 = new Exercise(true, "Weight lifting", 60);
                exercise10.setCreatedAt(LocalDateTime.now().minusDays(1));

                exerciseRepository.saveAll(List.of(
                                exercise1, exercise2, exercise3, exercise4, exercise5,
                                exercise6, exercise7, exercise8, exercise9, exercise10));

                // ---------- MEALS ----------
                Meals meals1 = new Meals(true, true, false, 2);
                meals1.setBreakfastTimestamp(LocalDateTime.of(2025, 11, 26, 8, 0));
                meals1.setLunchTimestamp(LocalDateTime.of(2025, 11, 26, 12, 15));

                Meals meals2 = new Meals(true, false, true, 1);
                meals2.setBreakfastTimestamp(LocalDateTime.of(2025, 11, 25, 7, 30));
                meals2.setDinnerTimestamp(LocalDateTime.of(2025, 11, 25, 18, 45));

                Meals meals3 = new Meals(false, true, true, 3);
                meals3.setLunchTimestamp(LocalDateTime.of(2025, 11, 24, 12, 0));
                meals3.setDinnerTimestamp(LocalDateTime.of(2025, 11, 24, 19, 0));

                Meals meals4 = new Meals(true, true, true, 0);
                meals4.setBreakfastTimestamp(LocalDateTime.of(2025, 11, 23, 8, 15));
                meals4.setLunchTimestamp(LocalDateTime.of(2025, 11, 23, 12, 30));
                meals4.setDinnerTimestamp(LocalDateTime.of(2025, 11, 23, 18, 0));

                Meals meals5 = new Meals(false, false, true, 1);
                meals5.setDinnerTimestamp(LocalDateTime.of(2025, 11, 22, 19, 15));

                Meals meals6 = new Meals(true, true, false, 2);
                meals6.setBreakfastTimestamp(LocalDateTime.of(2025, 11, 21, 7, 45));
                meals6.setLunchTimestamp(LocalDateTime.of(2025, 11, 21, 12, 15));

                Meals meals7 = new Meals(true, false, true, 3);
                meals7.setBreakfastTimestamp(LocalDateTime.of(2025, 11, 20, 8, 0));
                meals7.setDinnerTimestamp(LocalDateTime.of(2025, 11, 20, 18, 30));

                Meals meals8 = new Meals(false, true, true, 0);
                meals8.setLunchTimestamp(LocalDateTime.of(2025, 11, 19, 12, 30));
                meals8.setDinnerTimestamp(LocalDateTime.of(2025, 11, 19, 19, 0));

                Meals meals9 = new Meals(true, false, false, 1);
                meals9.setBreakfastTimestamp(LocalDateTime.of(2025, 11, 18, 7, 30));

                Meals meals10 = new Meals(false, false, false, 0);

                mealsRepository.saveAll(List.of(
                                meals1, meals2, meals3, meals4, meals5,
                                meals6, meals7, meals8, meals9, meals10));

                // ---------- WATER ----------
                Water water1 = new Water(5);
                water1.setCreatedAt(LocalDate.now().minusDays(10));
                Water water2 = new Water(8);
                water2.setCreatedAt(LocalDate.now().minusDays(9));
                Water water3 = new Water(4);
                water3.setCreatedAt(LocalDate.now().minusDays(8));
                Water water4 = new Water(7);
                water4.setCreatedAt(LocalDate.now().minusDays(7));
                Water water5 = new Water(6);
                water5.setCreatedAt(LocalDate.now().minusDays(6));
                Water water6 = new Water(3);
                water6.setCreatedAt(LocalDate.now().minusDays(5));
                Water water7 = new Water(9);
                water7.setCreatedAt(LocalDate.now().minusDays(4));
                Water water8 = new Water(2);
                water8.setCreatedAt(LocalDate.now().minusDays(3));
                Water water9 = new Water(5);
                water9.setCreatedAt(LocalDate.now().minusDays(2));
                Water water10 = new Water(7);
                water10.setCreatedAt(LocalDate.now().minusDays(1));

                waterRepository.saveAll(List.of(
                                water1, water2, water3, water4, water5,
                                water6, water7, water8, water9, water10));

                // ---------- GOALS ----------
                Goal goal1 = new Goal("Drink 8 glasses of water daily", "in progress");
                goal1.setCreatedAt(LocalDate.now().minusDays(10));
                Goal goal2 = new Goal("Meditate for 10 minutes", "in progress");
                goal2.setCreatedAt(LocalDate.now().minusDays(9));
                Goal goal3 = new Goal("Read 30 pages of a new book", "in progress");
                goal3.setCreatedAt(LocalDate.now().minusDays(8));
                Goal goal4 = new Goal("Take a 30-minute walk every morning", "in progress");
                goal4.setCreatedAt(LocalDate.now().minusDays(7));
                Goal goal5 = new Goal("Limit screen time to 2 hours after 8 PM", "in progress");
                goal5.setCreatedAt(LocalDate.now().minusDays(6));

                Goal goal6 = new Goal("Learn basic bread baking", "completed");
                goal6.setCreatedAt(LocalDate.now().minusDays(5));
                Goal goal7 = new Goal("Call a friend once a week", "completed");
                goal7.setCreatedAt(LocalDate.now().minusDays(4));
                Goal goal8 = new Goal("Finish the online coding course", "completed");
                goal8.setCreatedAt(LocalDate.now().minusDays(3));
                Goal goal9 = new Goal("Meal prep for the whole week", "completed");
                goal9.setCreatedAt(LocalDate.now().minusDays(2));
                Goal goal10 = new Goal("Get 7 hours of sleep every night", "completed");
                goal10.setCreatedAt(LocalDate.now().minusDays(1));

                goalRepository.saveAll(List.of(
                                goal1, goal2, goal3, goal4, goal5,
                                goal6, goal7, goal8, goal9, goal10));

                // ---------- JOURNAL ----------
                Journal journal1 = new Journal("How are you feeling today?", "Feeling good and motivated.");
                Journal journal2 = new Journal("What are you grateful for?", "Grateful for family and good health.");
                Journal journal3 = new Journal("What was a challenge today?", "Had a busy workday but managed.");
                Journal journal4 = new Journal("What made you happy today?", "Went for a walk in the park.");
                Journal journal5 = new Journal("How did you practice self-care?", "Meditated for 10 minutes.");
                Journal journal6 = new Journal("What did you learn today?", "Learned a new Java concept.");
                Journal journal7 = new Journal("What’s a goal for tomorrow?", "Plan to exercise in the morning.");
                Journal journal8 = new Journal("How did you manage stress today?",
                                "Took breaks and practiced deep breathing.");
                Journal journal9 = new Journal("Any creative activities today?", "Doodled in my notebook.");
                Journal journal10 = new Journal("Reflection on today’s accomplishments?",
                                "Finished all tasks on my to-do list.");

                journalRepository.saveAll(List.of(
                                journal1, journal2, journal3, journal4, journal5,
                                journal6, journal7, journal8, journal9, journal10));

                // ---------- MOOD ----------
                Mood mood1 = new Mood(LocalDateTime.now().minusDays(10), 7);
                Mood mood2 = new Mood(LocalDateTime.now().minusDays(9), 6);
                Mood mood3 = new Mood(LocalDateTime.now().minusDays(8), 8);
                Mood mood4 = new Mood(LocalDateTime.now().minusDays(7), 5);
                Mood mood5 = new Mood(LocalDateTime.now().minusDays(6), 9);
                Mood mood6 = new Mood(LocalDateTime.now().minusDays(5), 6);
                Mood mood7 = new Mood(LocalDateTime.now().minusDays(4), 7);
                Mood mood8 = new Mood(LocalDateTime.now().minusDays(3), 8);
                Mood mood9 = new Mood(LocalDateTime.now().minusDays(2), 5);
                Mood mood10 = new Mood(LocalDateTime.now().minusDays(1), 7);

                moodRepository.saveAll(List.of(
                                mood1, mood2, mood3, mood4, mood5,
                                mood6, mood7, mood8, mood9, mood10));
        }
}
