package com.TpBankati.bank.controller;

import com.TpBankati.bank.dto.ModifierSoldeRequest;
import com.TpBankati.bank.dto.ModifierSoldeResponse;
import com.TpBankati.bank.service.ModifierSoldeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modifier-solde")
@PreAuthorize("hasRole('AGENT_GUICHET')")
public class ModifierSoldeController {

    @Autowired
    private ModifierSoldeService modifierSoldeService;

    /**
     * Modifier le solde d'un compte (crédit ou débit)
     */
    @PostMapping
    public ResponseEntity<ModifierSoldeResponse> modifierSolde(@Valid @RequestBody ModifierSoldeRequest request) {
        ModifierSoldeResponse response = modifierSoldeService.modifierSolde(request);
        return ResponseEntity.ok(response);
    }
}