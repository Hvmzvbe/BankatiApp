package com.TpBankati.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModifierSoldeResponse {
    private String rib;
    private BigDecimal montant;
    private String type; // CREDIT ou DEBIT
    private BigDecimal ancienSolde;
    private BigDecimal nouveauSolde;
    private String motif;
    private LocalDateTime dateModification;
    private String message;
}