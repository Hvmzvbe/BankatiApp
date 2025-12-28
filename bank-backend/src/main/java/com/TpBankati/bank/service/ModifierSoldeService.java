package com.TpBankati.bank.service;

import com.TpBankati.bank.dto.ModifierSoldeRequest;
import com.TpBankati.bank.dto.ModifierSoldeResponse;
import com.TpBankati.bank.entity.*;
import com.TpBankati.bank.repository.CompteBancaireRepository;
import com.TpBankati.bank.repository.OperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class ModifierSoldeService {

    @Autowired
    private CompteBancaireRepository compteRepository;

    @Autowired
    private OperationRepository operationRepository;

    /**
     * Modifier le solde d'un compte bancaire
     * L'agent peut augmenter ou diminuer le solde
     */
    @Transactional
    public ModifierSoldeResponse modifierSolde(ModifierSoldeRequest request) {

        // Récupérer le compte
        CompteBancaire compte = compteRepository.findByRib(request.getRib())
                .orElseThrow(() -> new RuntimeException("Compte non trouvé"));

        // Vérifier que le compte n'est pas clôturé
        if (compte.getStatut() == StatutCompte.CLOTURE) {
            throw new RuntimeException("Ce compte est clôturé. Impossible de modifier le solde");
        }

        // Sauvegarder l'ancien solde
        BigDecimal ancienSolde = compte.getSolde();
        LocalDateTime dateModification = LocalDateTime.now();

        // Déterminer le type d'opération (CREDIT ou DEBIT)
        TypeOperation typeOperation;
        String typeLibelle;

        if (request.getMontant().compareTo(BigDecimal.ZERO) > 0) {
            // Augmenter le solde
            compte.setSolde(compte.getSolde().add(request.getMontant()));
            typeOperation = TypeOperation.CREDIT;
            typeLibelle = "Crédit";
        } else {
            // Diminuer le solde
            BigDecimal montantDebit = request.getMontant().abs();

            // Vérifier le solde si c'est un débit
            if (compte.getSolde().compareTo(montantDebit) < 0) {
                throw new RuntimeException("Solde insuffisant. Solde actuel: " +
                        compte.getSolde().toPlainString() + " DH");
            }

            compte.setSolde(compte.getSolde().subtract(montantDebit));
            typeOperation = TypeOperation.DEBIT;
            typeLibelle = "Débit";
        }

        compte.setDateDerniereOperation(dateModification);
        compteRepository.save(compte);

        // Enregistrer l'opération
        Operation operation = new Operation();
        operation.setType(typeOperation);
        operation.setMontant(request.getMontant().abs());
        operation.setIntitule(typeLibelle + " manuel - " + request.getMotif());
        operation.setMotif(request.getMotif());
        operation.setDateOperation(dateModification);
        operation.setCompte(compte);
        operationRepository.save(operation);

        // Préparer la réponse
        ModifierSoldeResponse response = new ModifierSoldeResponse();
        response.setRib(request.getRib());
        response.setMontant(request.getMontant().abs());
        response.setType(typeLibelle);
        response.setAncienSolde(ancienSolde);
        response.setNouveauSolde(compte.getSolde());
        response.setMotif(request.getMotif());
        response.setDateModification(dateModification);
        response.setMessage("Solde modifié avec succès. Nouveau solde: " +
                compte.getSolde().toPlainString() + " DH");

        return response;
    }
}