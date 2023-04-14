package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AtsUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AtsUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AtsUserRepository extends JpaRepository<AtsUser, Long> {}
