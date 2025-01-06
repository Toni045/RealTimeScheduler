# Use a lightweight Java runtime image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/RealTimeScheduler-0.0.1-SNAPSHOT.jar app.jar

# Expose the port defined in the Spring Boot application (8080 by default)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
