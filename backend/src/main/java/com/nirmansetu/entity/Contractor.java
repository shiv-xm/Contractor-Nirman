package com.nirmansetu.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "contractors")
public class Contractor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @NotBlank
    @Column(name = "business_name", nullable = false, length = 180)
    private String businessName;

    @NotBlank
    @Column(name = "proprietor_name", nullable = false, length = 120)
    private String proprietorName;

    @Column(name = "profile_photo_url")
    private String profilePhotoUrl;

    @Column(name = "city", nullable = false, length = 80)
    private String city;

    @Column(name = "state", nullable = false, length = 80)
    private String state;

    @Column(name = "primary_locality", nullable = false, length = 120)
    private String primaryLocality;

    @Column(name = "phone", nullable = false, length = 25)
    private String phone;

    @Column(name = "whatsapp_number", length = 25)
    private String whatsappNumber;

    @Column(name = "email", nullable = false, length = 160)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "experience_years", nullable = false)
    private Integer experienceYears = 0;

    @Column(name = "verification_status", nullable = false, length = 30)
    private String verificationStatus = "PENDING";

    @Column(name = "govt_id_verified", nullable = false)
    private Boolean govtIdVerified = false;

    @Column(name = "gst_verified", nullable = false)
    private Boolean gstVerified = false;

    @Column(name = "site_inspected", nullable = false)
    private Boolean siteInspected = false;

    @Column(name = "completed_projects_count", nullable = false)
    private Integer completedProjectsCount = 0;

    @Column(name = "ongoing_projects_count", nullable = false)
    private Integer ongoingProjectsCount = 0;

    @Column(name = "avg_rating", nullable = false, precision = 3, scale = 2)
    private BigDecimal avgRating = BigDecimal.valueOf(5.0);

    @Column(name = "review_count", nullable = false)
    private Integer reviewCount = 0;

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = true;

    @Column(name = "is_demo_record", nullable = false)
    private Boolean isDemoRecord = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @OneToMany(mappedBy = "contractor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContractorRate> rates = new ArrayList<>();

    // Default constructor
    public Contractor() {}

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getProprietorName() { return proprietorName; }
    public void setProprietorName(String proprietorName) { this.proprietorName = proprietorName; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPrimaryLocality() { return primaryLocality; }
    public void setPrimaryLocality(String primaryLocality) { this.primaryLocality = primaryLocality; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public Boolean getGovtIdVerified() { return govtIdVerified; }
    public void setGovtIdVerified(Boolean govtIdVerified) { this.govtIdVerified = govtIdVerified; }

    public Boolean getGstVerified() { return gstVerified; }
    public void setGstVerified(Boolean gstVerified) { this.gstVerified = gstVerified; }

    public Boolean getSiteInspected() { return siteInspected; }
    public void setSiteInspected(Boolean siteInspected) { this.siteInspected = siteInspected; }

    public Integer getCompletedProjectsCount() { return completedProjectsCount; }
    public void setCompletedProjectsCount(Integer completedProjectsCount) { this.completedProjectsCount = completedProjectsCount; }

    public Integer getOngoingProjectsCount() { return ongoingProjectsCount; }
    public void setOngoingProjectsCount(Integer ongoingProjectsCount) { this.ongoingProjectsCount = ongoingProjectsCount; }

    public BigDecimal getAvgRating() { return avgRating; }
    public void setAvgRating(BigDecimal avgRating) { this.avgRating = avgRating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Boolean getPublished() { return isPublished; }
    public void setPublished(Boolean published) { isPublished = published; }

    public Boolean getDemoRecord() { return isDemoRecord; }
    public void setDemoRecord(Boolean demoRecord) { isDemoRecord = demoRecord; }

    public OffsetDateTime getCreatedAt() { return createdAt; }

    public List<ContractorRate> getRates() { return rates; }
    public void setRates(List<ContractorRate> rates) { this.rates = rates; }
}
