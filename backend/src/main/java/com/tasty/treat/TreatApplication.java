package com.tasty.treat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class TreatApplication extends SpringBootServletInitializer {

	private static int SERVER_PORT;

	@Value("${server.port}")
	public void setServerPort(int port) {
		SERVER_PORT = port;
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(TreatApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void onReady() {
		System.out.println("API running"
				+ (SERVER_PORT != 0 ? (" on PORT " + SERVER_PORT) : "") + " 🚀");
	}

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TreatApplication.class);
	}

}
