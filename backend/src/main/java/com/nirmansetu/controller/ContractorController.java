package com.nirmansetu.controller;

import com.nirmansetu.entity.ConstructionProject;
import com.nirmansetu.entity.Contractor;
import com.nirmansetu.repository.ContractorRepository;
import com.nirmansetu.repository.ProjectRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Contractor API", description = "Endpoints for discovering, filtering, and managing civil thekedars")
public class ContractorController {

    private final ContractorRepository contractorRepository;
    private final ProjectRepository projectRepository;

    public ContractorController(ContractorRepository contractorRepository, ProjectRepository projectRepository) {
        this.contractorRepository = contractorRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping("/contractors")
    @Operation(summary = "Search and filter contractors by city and verification status")
    public ResponseEntity<Page<Contractor>> getContractors(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "avgRating") String sortBy
    ) {
        Page<Contractor> result = contractorRepository.searchContractors(
                city, status, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy))
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/contractors/{id}")
    @Operation(summary = "Get detailed contractor profile with rate cards")
    public ResponseEntity<Contractor> getContractorById(@PathVariable UUID id) {
        return contractorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/contractors/{id}/projects")
    @Operation(summary = "Get all completed construction projects executed by this contractor")
    public ResponseEntity<List<ConstructionProject>> getContractorProjects(@PathVariable UUID id) {
        return ResponseEntity.ok(projectRepository.findByContractorId(id));
    }

    @PatchMapping("/admin/contractors/{id}/verification")
    @Operation(summary = "Admin endpoint: update KYC verification status")
    public ResponseEntity<Contractor> updateVerification(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body
    ) {
        String newStatus = body.getOrDefault("status", "VERIFIED");
        return contractorRepository.findById(id).map(contractor -> {
            contractor.setVerificationStatus(newStatus);
            if ("VERIFIED".equalsIgnoreCase(newStatus)) {
                contractor.setGovtIdVerified(true);
                contractor.setSiteInspected(true);
            }
            return ResponseEntity.ok(contractorRepository.save(contractor));
        }).orElse(ResponseEntity.notFound().build());
    }
}
