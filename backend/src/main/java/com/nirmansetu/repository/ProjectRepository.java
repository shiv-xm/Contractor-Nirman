package com.nirmansetu.repository;

import com.nirmansetu.entity.ConstructionProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<ConstructionProject, UUID> {
    List<ConstructionProject> findByContractorId(UUID contractorId);
    List<ConstructionProject> findByCityIgnoreCase(String city);
}
