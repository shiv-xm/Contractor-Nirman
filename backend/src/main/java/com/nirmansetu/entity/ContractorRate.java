package com.nirmansetu.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "contractor_rates")
public class ContractorRate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contractor_id", nullable = false)
    private Contractor contractor;

    @Column(name = "building_category", nullable = false, length = 40)
    private String buildingCategory;

    @Column(name = "package_type", nullable = false, length = 40)
    private String packageType;

    @Column(name = "min_rate_per_sqft", nullable = false, precision = 10, scale = 2)
    private BigDecimal minRatePerSqft;

    @Column(name = "max_rate_per_sqft", nullable = false, precision = 10, scale = 2)
    private BigDecimal maxRatePerSqft;

    @Column(length = 20)
    private String unit = "sq.ft";

    @Column(name = "pricing_notes", columnDefinition = "TEXT")
    private String pricingNotes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public ContractorRate() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Contractor getContractor() { return contractor; }
    public void setContractor(Contractor contractor) { this.contractor = contractor; }

    public String getBuildingCategory() { return buildingCategory; }
    public void setBuildingCategory(String buildingCategory) { this.buildingCategory = buildingCategory; }

    public String getPackageType() { return packageType; }
    public void setPackageType(String packageType) { this.packageType = packageType; }

    public BigDecimal getMinRatePerSqft() { return minRatePerSqft; }
    public void setMinRatePerSqft(BigDecimal minRatePerSqft) { this.minRatePerSqft = minRatePerSqft; }

    public BigDecimal getMaxRatePerSqft() { return maxRatePerSqft; }
    public void setMaxRatePerSqft(BigDecimal maxRatePerSqft) { this.maxRatePerSqft = maxRatePerSqft; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getPricingNotes() { return pricingNotes; }
    public void setPricingNotes(String pricingNotes) { this.pricingNotes = pricingNotes; }
}
