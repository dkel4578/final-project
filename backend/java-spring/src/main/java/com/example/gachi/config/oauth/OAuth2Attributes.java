package com.example.gachi.config.oauth;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuth2Attributes {
    GOOGLE("google", (attributes) -> {
        UserProfile userProfile = new UserProfile();
        userProfile.setName((String) attributes.get("name"));
        userProfile.setLoginId((String) attributes.get("email"));
        return userProfile;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, UserProfile> of;

    OAuth2Attributes(String registrationId, Function<Map<String, Object>, UserProfile> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static UserProfile extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}
