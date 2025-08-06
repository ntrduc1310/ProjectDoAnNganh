package com.doananganh.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(BackendApplication.class, args);
        
        // ✅ DEBUG: In ra tất cả beans để verify
        System.out.println("=== LOADED CONTROLLERS ===");
        String[] beanNames = context.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            if (beanName.toLowerCase().contains("controller")) {
                System.out.println("FOUND: " + beanName);
            }
        }
        System.out.println("=== END CONTROLLERS ===");
    }
}
