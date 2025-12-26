package com.TpBankati.bank.repository;

import com.TpBankati.bank.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    boolean existsByNumeroIdentite(String numeroIdentite);

    boolean existsByEmail(String email);

    Optional<Client> findByNumeroIdentite(String numeroIdentite);

    Optional<Client> findByUserId(Long userId);

    // Nouvelle méthode pour trouver un client par username
    Optional<Client> findByUserUsername(String username);
}