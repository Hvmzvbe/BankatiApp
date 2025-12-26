package com.TpBankati.bank.service;

import com.TpBankati.bank.dto.StatisticsResponse;
import com.TpBankati.bank.entity.StatutCompte;
import com.TpBankati.bank.repository.ClientRepository;
import com.TpBankati.bank.repository.CompteBancaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CompteBancaireRepository compteRepository;

    public StatisticsResponse getStatistics() {
        StatisticsResponse stats = new StatisticsResponse();

        stats.setTotalClients(clientRepository.count());
        stats.setTotalComptes(compteRepository.count());
        stats.setComptesOuverts(compteRepository.countByStatut(StatutCompte.OUVERT));
        stats.setComptesBloqués(compteRepository.countByStatut(StatutCompte.BLOQUE));
        stats.setComptesClotures(compteRepository.countByStatut(StatutCompte.CLOTURE));

        return stats;
    }
}