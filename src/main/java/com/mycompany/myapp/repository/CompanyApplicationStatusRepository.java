package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CompanyApplicationStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CompanyApplicationStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyApplicationStatusRepository extends JpaRepository<CompanyApplicationStatus, Long> {}
