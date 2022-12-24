
plugins {
	java
	id("org.springframework.boot") version("3.0.1")
}

apply(plugin = "io.spring.dependency-management")

group = "team.gif"
version = "2.2.1"

java {
	sourceCompatibility = JavaVersion.VERSION_17
	targetCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-cache")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

	implementation(group = "org.apache.logging.log4j", name = "log4j-core", version = "2.19.0")
	runtimeOnly(group = "org.postgresql", name = "postgresql")
}
