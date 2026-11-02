package com.nirmansetu.repository;

import com.nirmansetu.entity.Contractor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContractorRepository extends JpaRepository<Contractor, UUID> {

    List<Contractor> findByIsPublishedTrue();

    @Query("SELECT c FROM Contractor c WHERE c.isPublished = true " +
           "AND (:city IS NULL OR LOWER(c.city) LIKE LOWER(CONCAT('%', :city, '%'))) " +
           "AND (:status IS NULL OR c.verificationStatus = :status)")
    Page<Contractor> searchContractors(
            @Param("city") String city,
            @Param("status") String status,
            Pageable pageable
    );

    long countByVerificationStatus(String status);
}
