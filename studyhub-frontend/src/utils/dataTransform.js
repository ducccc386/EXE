/**
 * utils/dataTransform.js
 * Chuyển đổi dữ liệu từ backend  sang format mà frontend mong đợi
 */

/**
 * Transform TutorProfile từ backend sang format hiển thị
 */
export function transformTutorProfile(tutorData, userData = null) {
    if (!tutorData) return null;

    const fullName = userData?.fullName || `Gia sư #${tutorData.id}`;
    const initials = fullName
        .split(" ")
        .filter(w => w.length > 0)
        .map(w => w[0].toUpperCase())
        .join("")
        .slice(0, 2);

    const colors = [
        "from-blue-400 to-blue-600",
        "from-purple-400 to-purple-600",
        "from-pink-400 to-pink-600",
        "from-orange-400 to-orange-600",
        "from-green-400 to-green-600",
        "from-red-400 to-red-600",
    ];
    const colorIdx = tutorData.id % colors.length;

    return {
        id: tutorData.id,
        userId: tutorData.userId,
        name: fullName,
        initials,
        avatarBg: colors[colorIdx],
        title: tutorData.education || "Giáo viên",
        subjects: tutorData.subjects || [],
        subject: tutorData.subjects?.[0]?.name || "Toán học",
        location: tutorData.city || "Hà Nội",
        city: tutorData.city || "Hà Nội",
        rating: tutorData.averageRating || 0,
        reviewCount: tutorData.totalReviews || 0,
        pricePerHour: tutorData.hourlyRate || 200000,
        hourlyRate: tutorData.hourlyRate || 200000,
        bio: tutorData.bio || "Giáo viên giàu kinh nghiệm",
        education: tutorData.education,
        experienceYears: tutorData.experienceYears || 0,
        teachingMethod: tutorData.teachingMethod,
        teachingMode: tutorData.teachingMode || "BOTH",
        verified: tutorData.verified || false,
        tags: tutorData.subjects?.map(s => s.name) || [],
    };
}

/**
 * Transform ParentRequest từ backend sang format hiển thị
 */
export function transformParentRequest(requestData) {
    if (!requestData) return null;

    return {
        id: requestData.id,
        parentId: requestData.parentId,
        subjectId: requestData.subjectId,
        title: requestData.title,
        description: requestData.description,
        grade: requestData.grade,
        budget: requestData.budget,
        city: requestData.city,
        addressDetail: requestData.addressDetail,
        teachingMode: requestData.teachingMode,
        sessionsPerWeek: requestData.sessionsPerWeek,
        scheduleInfo: requestData.scheduleInfo,
        status: requestData.status,
        createdAt: requestData.createdAt,
    };
}

/**
 * Transform Application từ backend sang format hiển thị
 */
export function transformApplication(appData, tutorData = null) {
    if (!appData) return null;

    return {
        id: appData.id,
        requestId: appData.requestId,
        tutorProfileId: appData.tutorProfileId,
        tutorData,
        message: appData.message,
        status: appData.status,
        createdAt: appData.createdAt,
    };
}

/**
 * Transform Review từ backend
 */
export function transformReview(reviewData) {
    if (!reviewData) return null;

    return {
        id: reviewData.id,
        bookingId: reviewData.bookingId,
        parentId: reviewData.parentId,
        tutorProfileId: reviewData.tutorProfileId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: reviewData.createdAt,
    };
}

/**
 * Transform Message từ backend
 */
export function transformMessage(msgData) {
    if (!msgData) return null;

    return {
        id: msgData.id,
        conversationId: msgData.conversationId,
        senderId: msgData.senderId,
        content: msgData.content,
        isSeen: msgData.isSeen || false,
        createdAt: msgData.createdAt,
    };
}

/**
 * Transform Conversation từ backend
 */
export function transformConversation(convData, tutorProfile = null, userProfile = null) {
    if (!convData) return null;

    return {
        id: convData.id,
        parentId: convData.parentId,
        tutorProfileId: convData.tutorProfileId,
        tutorProfile,
        userProfile,
        createdAt: convData.createdAt,
    };
}
