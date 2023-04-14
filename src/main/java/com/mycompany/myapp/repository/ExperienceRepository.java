package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Experience;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Experience entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExperienceRepository extends JpaRepository<Experience, String> {}
