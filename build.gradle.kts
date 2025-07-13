
plugins {
	java
	id("org.springframework.boot") version("3.5.3")
}

apply(plugin = "io.spring.dependency-management")

group = "com.patrickubelhor"
version = "3.0.3"

java {
	sourceCompatibility = JavaVersion.VERSION_21
	targetCompatibility = JavaVersion.VERSION_21
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-cache")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

	implementation(group = "org.apache.logging.log4j", name = "log4j-core", version = "2.25.1")
	runtimeOnly(group = "org.postgresql", name = "postgresql")
}
