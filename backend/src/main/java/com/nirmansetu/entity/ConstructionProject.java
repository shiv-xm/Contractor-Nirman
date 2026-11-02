package com.nirmansetu.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "construction_projects")
public class ConstructionProject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contractor_id", nullable = false)
    private Contractor contractor;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "building_type", nullable = false, length = 40)
    private String buildingType;

    @Column(name = "project_status", nullable = false, length = 30)
    private String projectStatus = "COMPLETED";

    @Column(nullable = false, length = 80)
    private String city;

    @Column(nullable = false, length = 120)
    private String locality;

    @Column(name = "plot_area_sqft", precision = 10, scale = 2)
    private BigDecimal plotAreaSqft;

    @Column(name = "built_up_area_sqft", nullable = false, precision = 10, scale = 2)
    private BigDecimal builtUpAreaSqft;

    @Column(nullable = false)
    private Integer floors = 1;

    @Column(name = "approx_cost_inr", nullable = false, precision = 14, scale = 2)
    private BigDecimal approxCostInr;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "completion_date")
    private LocalDate completionDate;

    @Column(name = "cover_image", nullable = false, columnDefinition = "TEXT")
    private String coverImage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified = true;

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public ConstructionProject() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Contractor getContractor() { return contractor; }
    public void setContractor(Contractor contractor) { this.contractor = contractor; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBuildingType() { return buildingType; }
    public void setBuildingType(String buildingType) { this.buildingType = buildingType; }

    public String getProjectStatus() { return projectStatus; }
    public void setProjectStatus(String projectStatus) { this.projectStatus = projectStatus; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getLocality() { return locality; }
    public void setLocality(String locality) { this.locality = locality; }

    public BigDecimal getPlotAreaSqft() { return plotAreaSqft; }
    public void setPlotAreaSqft(BigDecimal plotAreaSqft) { this.plotAreaSqft = plotAreaSqft; }

    public BigDecimal getBuiltUpAreaSqft() { return builtUpAreaSqft; }
    public void setBuiltUpAreaSqft(BigDecimal builtUpAreaSqft) { this.builtUpAreaSqft = builtUpAreaSqft; }

    public Integer getFloors() { return floors; }
    public void setFloors(Integer floors) { this.floors = floors; }

    public BigDecimal getApproxCostInr() { return approxCostInr; }
    public void setApproxCostInr(BigDecimal approxCostInr) { this.approxCostInr = approxCostInr; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDate completionDate) { this.completionDate = completionDate; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getVerified() { return isVerified; }
    public void setVerified(Boolean verified) { isVerified = verified; }

    public Boolean getPublished() { return isPublished; }
    public void setPublished(Boolean published) { isPublished = published; }
}
