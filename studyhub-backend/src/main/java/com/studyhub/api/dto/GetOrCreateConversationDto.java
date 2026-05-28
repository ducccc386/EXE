package com.studyhub.api.dto;

import lombok.Data;

@Data
public class GetOrCreateConversationDto {
    private Long parentId;
    private Long tutorProfileId;
}