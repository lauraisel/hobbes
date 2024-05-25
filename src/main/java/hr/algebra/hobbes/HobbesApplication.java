package hr.algebra.hobbes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HobbesApplication {

	public static void main(String[] args) {
		SpringApplication.run(HobbesApplication.class, args);
	}

}
