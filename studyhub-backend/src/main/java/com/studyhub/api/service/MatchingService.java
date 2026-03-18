package com.studyhub.api.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.studyhub.api.entity.TutorProfile;
import com.studyhub.api.repository.TutorProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchingService {
    private final TutorProfileRepository tutorRepository;

    private final TutorProfileRepository tutorProfileRepository;

    public List<TutorProfile> getAllTutors() {
        return tutorProfileRepository.findAll();
    }

    // Tìm gia sư phù hợp dựa trên Môn học và Khoảng cách (km)
    public List<TutorProfile> matchTutors(Integer subjectId, Double parentLat, Double parentLon, Double maxKm) {
        List<TutorProfile> tutors = tutorRepository.findBySubjects_Id(subjectId);

        return tutors.stream()
                .filter(t -> calculateDistance(parentLat, parentLon,
                        t.getUser().getLatitude(), t.getUser().getLongitude()) <= maxKm)
                .sorted(Comparator.comparing(TutorProfile::getAverageRating).reversed()) // Ưu tiên đánh giá cao
                .collect(Collectors.toList());
    }

    // Công thức tính khoảng cách giữa 2 tọa độ (Km)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double theta = lon1 - lon2;
        double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2))
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
        dist = Math.acos(dist);
        dist = Math.toDegrees(dist);
        return dist * 60 * 1.1515 * 1.609344;
    }

}
