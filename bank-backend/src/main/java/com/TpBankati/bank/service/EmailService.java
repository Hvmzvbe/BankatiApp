package com.TpBankati.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // RG_7: Envoyer les credentials au client
    public void sendCredentials(String toEmail, String username, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@Bankati.com");
            message.setTo(toEmail);
            message.setSubject("Création de votre compte Bankati");
            message.setText(
                    "Bonjour,\n\n" +
                            "Nous vous informons que votre compte bancaire Bankati a été créé avec succès.\n\n" +
                            "Vous trouverez ci-dessous vos identifiants de connexion :\n\n" +
                            "Identifiant : " + username + "\n" +
                            "Mot de passe temporaire : " + password + "\n\n" +
                            "Pour des raisons de sécurité, nous vous invitons à modifier votre mot de passe dès votre première connexion.\n\n" +
                            "Si vous n’êtes pas à l’origine de cette demande ou si vous avez besoin d’assistance, notre service client reste à votre disposition.\n\n" +
                            "Cordialement,\n" +
                            "Le Service Client Bankati\n\n" +
                            "Cet e-mail est généré automatiquement, merci de ne pas y répondre."
            );

            mailSender.send(message);
            System.out.println("Email envoyé à : " + toEmail);
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi de l'email : " + e.getMessage());

        }
    }
}