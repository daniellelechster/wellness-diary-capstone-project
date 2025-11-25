package com.wcci.wellness.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.wcci.wellness.repository.MoodRepository;
import com.wcci.wellness.entity.Mood;

@Component
public class MoodPopulator implements CommandLineRunner {

    private final MoodRepository moodRepository;

    public MoodPopulator(MoodRepository moodRepository) {
        this.moodRepository = moodRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("MoodPopulator: Adding moods with date, time, and rating...");

        int daysBack = 7;

        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm");

        for (int i = 0; i < daysBack; i++) {

            LocalDateTime base = LocalDateTime.now().minusDays(i);

            // Define 3 mood times per day
            LocalDateTime morning = base.withHour(9).withMinute(0);
            LocalDateTime afternoon = base.withHour(14).withMinute(0);
            LocalDateTime evening = base.withHour(20).withMinute(0);

            // Generate 3 mood ratings (1–9)
            int mood1 = randomMood();
            int mood2 = randomMood();
            int mood3 = randomMood();

            // Save moods
            moodRepository.save(new Mood(morning, mood1));
            moodRepository.save(new Mood(afternoon, mood2));
            moodRepository.save(new Mood(evening, mood3));

            // Print results clearly
            System.out.println("Date: " + morning.format(dateFormat) +
                    " | Time: " + morning.format(timeFormat) +
                    " | Rating: " + mood1);

            System.out.println("Date: " + afternoon.format(dateFormat) +
                    " | Time: " + afternoon.format(timeFormat) +
                    " | Rating: " + mood2);

            System.out.println("Date: " + evening.format(dateFormat) +
                    " | Time: " + evening.format(timeFormat) +
                    " | Rating: " + mood3);

            System.out.println("--------------------------------------------");
        }

        System.out.println("MoodPopulator: Finished.");
    }

    private int randomMood() {
        return (int)(Math.random() * 9) + 1; // 1–9
    }
}
