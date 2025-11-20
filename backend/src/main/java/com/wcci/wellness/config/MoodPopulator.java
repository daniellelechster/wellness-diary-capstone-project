package com.wcci.wellness.config;
// package com.wcci.wellness.repository;

// import com.wcci.wellness.entity.Mood;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.stereotype.Component;

// import java.time.LocalDateTime;

// @Component
// public class MoodPopulator implements CommandLineRunner {

//     private final MoodRepository moodRepo; 

//     public MoodPopulator(MoodRepository moodRepo) {
//         this.moodRepo = moodRepo;
//     }

//     @Override
//     public void run(String... args) throws Exception {

//         moodRepo.save(new Mood(LocalDateTime.now().minusDays(5), 1));
//         moodRepo.save(new Mood(LocalDateTime.now().minusDays(4), 3));
//         moodRepo.save(new Mood(LocalDateTime.now().minusDays(3), 5));
//         moodRepo.save(new Mood(LocalDateTime.now().minusDays(2), 7));
//         moodRepo.save(new Mood(LocalDateTime.now().minusDays(1), 9));
//         moodRepo.save(new Mood(LocalDateTime.now(), 4));
//     }
// }
