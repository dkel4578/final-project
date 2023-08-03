package com.example.gachi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GachiApplication {

    public static void main(String[] args) {
        SpringApplication.run(GachiApplication.class, args);
    }

}
