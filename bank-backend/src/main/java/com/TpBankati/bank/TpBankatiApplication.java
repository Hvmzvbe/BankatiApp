package com.TpBankati.bank;

import com.TpBankati.bank.entity.Role;
import com.TpBankati.bank.entity.User;
import com.TpBankati.bank.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TpBankatiApplication {
    public static void main(String[] args) {
        SpringApplication.run(TpBankatiApplication.class, args);
    }
}
