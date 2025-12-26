package com.TpBankati.bank.repository;

import com.TpBankati.bank.entity.CompteBancaire;
import com.TpBankati.bank.entity.StatutCompte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompteBancaireRepository extends JpaRepository<CompteBancaire, Long> {

    Optional<CompteBancaire> findByRib(String rib);

    boolean existsByRib(String rib);

    List<CompteBancaire> findByClientId(Long clientId);

    List<CompteBancaire> findByClientIdOrderByDateDerniereOperationDesc(Long clientId);

    long countByStatut(StatutCompte statut);
}