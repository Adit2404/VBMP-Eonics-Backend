package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Remark;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Remark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RemarkRepository extends JpaRepository<Remark, Long> {}
