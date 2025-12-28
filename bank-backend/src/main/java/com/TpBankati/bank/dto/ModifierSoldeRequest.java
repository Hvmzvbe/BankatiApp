package com.TpBankati.bank.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ModifierSoldeRequest {

    @NotBlank(message = "Le RIB est obligatoire")
    @Pattern(regexp = "^[0-9]{24}$", message = "Le RIB doit contenir exactement 24 chiffres")
    private String rib;

    @NotNull(message = "Le montant est obligatoire")
    @DecimalMin(value = "0.01", message = "Le montant doit être supérieur à 0")
    private BigDecimal montant;

    @NotBlank(message = "Le type d'opération est obligatoire")
    private String typeOperation; // "CREDIT" ou "DEBIT"

    @NotBlank(message = "Le motif est obligatoire")
    @Size(max = 255, message = "Le motif ne doit pas dépasser 255 caractères")
    private String motif;
}