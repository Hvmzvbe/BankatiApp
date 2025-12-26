package com.TpBankati.bank.dto;

import com.TpBankati.bank.entity.StatutCompte;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private String rib;
    private BigDecimal solde;
    private StatutCompte statut;
    private List<OperationResponse> dernieres10Operations;
    private long totalOperations;
}