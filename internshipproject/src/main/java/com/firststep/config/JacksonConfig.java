package com.firststep.config;


import java.io.ByteArrayInputStream;

import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer addMixIns() {
        return builder -> {
            builder.mixIn(ByteArrayInputStream.class, ByteArrayInputStreamMixin.class);
        };
    }
}

