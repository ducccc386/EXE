package com.studyhub.api.dto;

import lombok.Data;

@Data
public class UpdateRequestStatusDto {
    private Long requestId;
    private String status; // "OPEN", "CLOSED", "BANNED"
}
