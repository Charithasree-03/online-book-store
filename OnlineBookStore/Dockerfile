FROM eclipse-temurin:21-jre
ADD target/bookstore.jar bookstore.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","bookstore.jar","--spring.profiles.active=docker"]
