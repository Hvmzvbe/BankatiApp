# 🏦 BankatiApp - Application de Gestion Bancaire

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.8-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

Application web complète de gestion bancaire développée dans le cadre du **Contrôle Architecture des Composants Entreprise 2025-2026**.

## 📋 Table des matières

- [À propos du projet](#à-propos-du-projet)
- [Contexte académique](#contexte-académique)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Technologies utilisées](#technologies-utilisées)
- [Design Patterns et Bonnes Pratiques](#design-patterns-et-bonnes-pratiques)
- [Règles de Gestion](#règles-de-gestion)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Cas d'utilisation détaillés](#cas-dutilisation-détaillés)
- [API Documentation](#api-documentation)
- [Sécurité](#sécurité)
- [Structure du projet](#structure-du-projet)
- [Captures d'écran](#captures-décran)
- [Tests](#tests)
- [Livrables](#livrables)
- [Auteurs](#auteurs)

## 🎯 À propos du projet

BankatiApp est une application web moderne de gestion bancaire (eBank) qui permet aux clients de gérer leurs comptes bancaires et aux agents de guichet d'administrer les clients et leurs comptes. L'application met l'accent sur la sécurité, l'architecture en couches et les bonnes pratiques de développement.

### Objectifs du projet

- Développer une application web sécurisée avec Spring Boot 3 et React
- Implémenter une authentification JWT robuste
- Appliquer les design patterns IOC, AOP et DTO
- Respecter les règles de gestion métier strictes
- Fournir une interface utilisateur intuitive et responsive

## 📚 Contexte académique

**Établissement** : [Votre École/Université]  
**Module** : Architecture des Composants Entreprise  
**Année académique** : 2025-2026  
**Type** : Contrôle pratique (Binôme/Monôme)  
**Date de réalisation** : [Date]

## ✨ Fonctionnalités

### 👤 Pour les Clients (Profil CLIENT)

- ✅ Authentification sécurisée avec JWT
- 📊 **Tableau de bord personnalisé**
  - Affichage du RIB et du solde
  - Consultation des 10 dernières opérations
  - Support multi-comptes avec liste déroulante
  - Pagination pour l'historique complet
- 💸 **Gestion des virements**
  - Virement entre comptes
  - Saisie du montant, RIB destinataire et motif
  - Validation en temps réel
- 🔐 Modification du mot de passe

### 🏢 Pour les Agents de Guichet (Profil AGENT_GUICHET)

- ➕ **Gestion des clients**
  - Création de nouveaux clients
  - Saisie des informations personnelles
  - Envoi automatique des credentials par email
- 🏦 **Gestion des comptes bancaires**
  - Création de nouveaux comptes
  - Attribution de RIB
  - Gestion du statut des comptes
- 💰 **Opérations bancaires**
  - Opérations de crédit
  - Opérations de débit
- 📋 Consultation des statistiques

### 🔒 Sécurité et Contrôle d'accès

- JWT avec expiration de 1 heure
- Cryptage BCrypt des mots de passe
- Contrôle d'accès basé sur les rôles (RBAC)
- Protection contre les accès non autorisés
- Gestion automatique de l'expiration de session

## 🏗️ Architecture

### Architecture Three-Tier

```
┌─────────────────────────────────────────────┐
│           COUCHE PRÉSENTATION               │
│                                             │
│    React.js + Material-UI + Axios          │
│         (Port 3000)                         │
└────────────────┬────────────────────────────┘
                 │
                 │ REST API (JSON)
                 │ Authorization: Bearer {JWT}
                 │
┌────────────────▼────────────────────────────┐
│            COUCHE MÉTIER                    │
│                                             │
│  Spring Boot 3.5.8 + Spring Security       │
│  Controllers → Services → Repositories     │
│         (Port 8081)                         │
└────────────────┬────────────────────────────┘
                 │
                 │ JPA/Hibernate
                 │
┌────────────────▼────────────────────────────┐
│         COUCHE PERSISTANCE                  │
│                                             │
│         MySQL 8.0 Database                  │
│           (Port 3306)                       │
└─────────────────────────────────────────────┘
```

### Schéma des flux métier

```
┌─────────────┐
│   Client    │
│   Browser   │
└──────┬──────┘
       │
       │ 1. POST /api/auth/login
       │    {username, password}
       ▼
┌──────────────────────┐
│   AuthController     │
└──────┬───────────────┘
       │ 2. authenticate()
       ▼
┌──────────────────────┐
│   AuthService        │
└──────┬───────────────┘
       │ 3. validate credentials
       ▼
┌──────────────────────┐
│ Spring Security      │
│ + JWT Generator      │
└──────┬───────────────┘
       │ 4. Generate JWT Token
       │    (expires in 1h)
       ▼
┌──────────────────────┐
│  Return JWT + Role   │
│  to Client           │
└──────────────────────┘
```

## 🛠️ Technologies utilisées

### Backend (Couche Back-end)

| Technologie | Version | Usage |
|------------|---------|-------|
| **Java** | 17 | Langage de programmation |
| **Spring Boot** | 3.5.8 | Framework principal |
| **Spring Security** | 6.x | Authentification et autorisation |
| **Spring Data JPA** | 3.x | Persistance des données |
| **Hibernate** | 6.x | ORM |
| **JWT (JJWT)** | 0.11.5 | Gestion des tokens |
| **MySQL Connector** | 8.0 | Driver de base de données |
| **Lombok** | - | Réduction du code boilerplate |
| **Spring Boot Starter Mail** | - | Envoi d'emails |
| **Spring Boot Validation** | - | Validation des données |
| **Maven** | 3.6+ | Gestion des dépendances |

### Frontend (Couche Front-end)

| Technologie | Version | Usage |
|------------|---------|-------|
| **React.js** | 18.x | Framework UI |
| **React Router DOM** | 6.x | Navigation et routing |
| **Material-UI (MUI)** | 5.x | Composants UI |
| **Axios** | 1.x | Client HTTP |
| **JavaScript (ES6+)** | - | Langage de programmation |

### Base de données

| Technologie | Version | Usage |
|------------|---------|-------|
| **MySQL** | 8.0 | SGBD relationnel |

## 🎨 Design Patterns et Bonnes Pratiques

### Design Patterns implémentés

#### 1. **Inversion of Control (IOC)**
```java
@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
}
```
- Injection de dépendances via `@Autowired`
- Gestion du cycle de vie des beans par Spring
- Découplage des composants

#### 2. **Aspect-Oriented Programming (AOP)**
- Séparation des préoccupations transversales
- Gestion centralisée de la sécurité via `@PreAuthorize`
- Logging et traçabilité

```java
@PreAuthorize("hasRole('AGENT_GUICHET')")
@PostMapping("/clients")
public ResponseEntity<ClientResponse> createClient(@Valid @RequestBody ClientRequest request)
```

#### 3. **Data Transfer Object (DTO)**
```java
// DTO pour la requête
public class LoginRequest {
    private String username;
    private String password;
}

// DTO pour la réponse
public class LoginResponse {
    private String token;
    private String username;
    private Role role;
}
```
- Séparation entre entités JPA et objets métier
- Protection des données sensibles
- Flexibilité dans les échanges API

### Architecture en couches

```
Controllers (REST API)
    ↓
Services (Logique métier)
    ↓
Repositories (Accès données)
    ↓
Entities (Modèle de données)
```

### Autres bonnes pratiques

- ✅ **RESTful API** : Respect des conventions REST
- ✅ **Validation** : Utilisation de `@Valid` et annotations Jakarta
- ✅ **Exception Handling** : Gestion centralisée des erreurs
- ✅ **Sécurité** : Cryptage BCrypt, JWT, CORS configuré
- ✅ **Code Clean** : Nommage explicite, commentaires pertinents
- ✅ **Séparation des responsabilités** : Chaque classe a une responsabilité unique

## 📜 Règles de Gestion

### Authentification et Sécurité

| Code | Règle de Gestion |
|------|------------------|
| **RG_1** | Le mot de passe doit être crypté avec BCrypt au niveau de la base de données |
| **RG_2** | Si le login n'existe pas ou le mot de passe est erroné, afficher "Login ou mot de passe erronés" |
| **RG_3** | Le délai de validité du Token JWT est d'une heure (01h). Si échu, afficher "Session invalide, veuillez vous authentifier" |

### Gestion des Clients

| Code | Règle de Gestion |
|------|------------------|
| **RG_4** | Le numéro d'identité doit être unique |
| **RG_5** | Le nom, prénom, date anniversaire, adresse mail et adresse postale sont obligatoires |
| **RG_6** | L'adresse email doit être unique |
| **RG_7** | L'application envoie un email au client avec son login et mot de passe |

### Gestion des Comptes Bancaires

| Code | Règle de Gestion |
|------|------------------|
| **RG_8** | Le numéro d'identité du client doit exister dans la base de données |
| **RG_9** | Le RIB doit être un RIB valide |
| **RG_10** | Le compte bancaire est créé avec le statut "ACTIVE" |

### Gestion des Virements

| Code | Règle de Gestion |
|------|------------------|
| **RG_11** | Le compte bancaire ne doit pas être bloqué ou clôturé |
| **RG_12** | Le solde du compte doit être supérieur au montant du virement |
| **RG_13** | Le compte du client est débité du montant du virement |
| **RG_14** | Le compte du destinataire est crédité du montant du virement |
| **RG_15** | L'application trace les deux opérations avec leurs dates précises |

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- ☑️ **Java JDK 17** ou supérieur
- ☑️ **Node.js 14+** et npm
- ☑️ **MySQL 8.0+**
- ☑️ **Maven 3.6+**
- ☑️ **Git**
- ☑️ Un IDE (IntelliJ IDEA, Eclipse, VS Code)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/BankatiApp.git
cd BankatiApp
```

### 2. Configuration de la base de données MySQL

Créez la base de données :

```sql
CREATE DATABASE tpbankati CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Créez un utilisateur dédié (optionnel mais recommandé) :

```sql
CREATE USER 'bankati_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON tpbankati.* TO 'bankati_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Installation et démarrage du Backend

```bash
cd bank-backend
```

Modifiez le fichier `src/main/resources/application.properties` :

```properties
# Configuration serveur
server.port=8081

# Configuration Base de données
spring.datasource.url=jdbc:mysql://localhost:3306/tpbankati?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=votre_mot_de_passe
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuration JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Configuration JWT
jwt.secret=VotreCleSecreteTresLongueEtSecuriseeAuMoins256BitsRecommandee
jwt.expiration=3600000

# Configuration Email (Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=votre_email@gmail.com
spring.mail.password=votre_mot_de_passe_application
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Logging
logging.level.com.TpBankati.bank=DEBUG
logging.file.name=logs/tpbankati.log
```

**Note importante pour Gmail** : Vous devez générer un "Mot de passe d'application" dans les paramètres de sécurité de votre compte Google.

Compilez et lancez l'application :

```bash
# Compiler le projet
mvn clean install

# Lancer l'application
mvn spring-boot:run
```

Le serveur backend sera accessible sur **http://localhost:8081**

### 4. Installation et démarrage du Frontend

Dans un nouveau terminal :

```bash
cd bank-frontend

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

L'application frontend sera accessible sur **http://localhost:3000**

## ⚙️ Configuration

### Configuration du Backend

#### Structure du fichier application.properties

```properties
# Port du serveur
server.port=8081

# Base de données
spring.datasource.url=jdbc:mysql://localhost:3306/tpbankati
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT (RG_3: Token valide 1 heure)
jwt.secret=${JWT_SECRET:default_secret_key_change_in_production}
jwt.expiration=${JWT_EXPIRATION:3600000}

# Email (RG_7: Envoi credentials)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME:your_email@gmail.com}
spring.mail.password=${MAIL_PASSWORD:your_app_password}
```

#### Variables d'environnement (recommandé pour la production)

```bash
export DB_USERNAME=bankati_user
export DB_PASSWORD=votre_mot_de_passe
export JWT_SECRET=votre_cle_secrete_tres_longue
export MAIL_USERNAME=votre_email@gmail.com
export MAIL_PASSWORD=votre_mot_de_passe_app
```

### Configuration du Frontend

Le fichier `src/services/api.js` configure l'URL de base de l'API :

```javascript
const API_BASE_URL = 'http://localhost:8081/api';
```

Pour la production, utilisez une variable d'environnement :

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
```

Créez un fichier `.env` :

```
REACT_APP_API_URL=http://localhost:8081/api
```

## 📖 Utilisation

### Première connexion

#### Création d'un utilisateur ADMIN (optionnel)

Vous pouvez créer un utilisateur administrateur en ajoutant cette méthode dans `TpBankatiApplication.java` :

```java
@Bean
CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    return args -> {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.AGENT_GUICHET);
            userRepository.save(admin);
            System.out.println("Admin user created: admin/admin123");
        }
    };
}
```

### Flux d'utilisation complet

#### 1. Connexion en tant qu'AGENT_GUICHET

1. Accédez à `http://localhost:3000/login`
2. Connectez-vous avec :
   - Username: `admin`
   - Password: `admin123`
3. Vous serez redirigé vers `/agent/dashboard`

#### 2. Création d'un client

1. Cliquez sur "Ajouter Client"
2. Remplissez le formulaire :
   - Nom: `Alami`
   - Prénom: `Mohammed`
   - N° Identité: `AB123456`
   - Date anniversaire: `1990-01-15`
   - Email: `m.alami@email.com`
   - Adresse postale: `123 Rue Hassan II, Casablanca`
3. Cliquez sur "Créer"
4. Le client reçoit un email avec ses identifiants (RG_7)

#### 3. Création d'un compte bancaire

1. Cliquez sur "Nouveau Compte"
2. Saisissez :
   - RIB: `MA1234567890123456789012`
   - N° Identité: `AB123456`
3. Cliquez sur "Créer"
4. Le compte est créé avec le statut "ACTIVE" (RG_10)

#### 4. Connexion en tant que CLIENT

1. Déconnectez-vous
2. Connectez-vous avec les credentials reçus par email
3. Vous serez redirigé vers `/client/dashboard`

#### 5. Consultation du tableau de bord

Le tableau de bord affiche :
- Le ou les comptes du client
- Le RIB et le solde de chaque compte
- Les 10 dernières opérations
- Pagination pour consulter plus d'opérations

#### 6. Effectuer un virement

1. Cliquez sur "Nouveau Virement"
2. Sélectionnez le compte source (si plusieurs comptes)
3. Saisissez :
   - Montant: `500.00`
   - RIB destinataire: `MA9876543210987654321098`
   - Motif: `Paiement facture électricité`
4. Cliquez sur "Valider"
5. Le virement est effectué selon RG_11 à RG_15

### Changement de mot de passe

1. Cliquez sur le menu utilisateur
2. Sélectionnez "Changer mot de passe"
3. Saisissez l'ancien et le nouveau mot de passe
4. Le nouveau mot de passe est crypté (RG_1)

## 📋 Cas d'utilisation détaillés

### UC-1 : S'authentifier

**Acteur principal** : Utilisateur (CLIENT ou AGENT_GUICHET)

**Préconditions** :
- L'utilisateur possède un compte actif
- L'application est démarrée

**Scénario nominal** :
1. L'utilisateur accède à la page de connexion
2. L'utilisateur saisit son username et password
3. Le système valide les credentials (RG_2)
4. Le système génère un JWT valide 1 heure (RG_3)
5. Le système redirige vers le dashboard approprié

**Scénarios alternatifs** :
- **2a** : Credentials invalides → Afficher "Login ou mot de passe erronés" (RG_2)
- **4a** : Token expiré → Afficher "Session invalide, veuillez vous authentifier" (RG_3)

**Postconditions** :
- L'utilisateur est authentifié
- Un JWT est stocké côté client
- L'interface affiche les fonctionnalités autorisées

---

### UC-2 : Ajouter un nouveau client

**Acteur principal** : AGENT_GUICHET

**Préconditions** :
- L'agent est authentifié
- L'agent a le rôle AGENT_GUICHET

**Scénario nominal** :
1. L'agent accède au formulaire "Ajouter Client"
2. L'agent saisit :
   - Nom, Prénom (RG_5)
   - Numéro d'identité (RG_4, RG_5)
   - Date anniversaire (RG_5)
   - Adresse email (RG_5, RG_6)
   - Adresse postale (RG_5)
3. L'agent clique sur "Créer"
4. Le système valide les données
5. Le système crée un User avec :
   - Username = `prenom.nom`
   - Password = généré aléatoirement et crypté (RG_1)
   - Role = CLIENT
6. Le système crée le Client lié au User
7. Le système envoie un email avec les credentials (RG_7)
8. Le système affiche un message de succès

**Scénarios alternatifs** :
- **4a** : N° identité existe déjà → Erreur (RG_4)
- **4b** : Email existe déjà → Erreur (RG_6)
- **4c** : Champs obligatoires manquants → Erreur (RG_5)
- **7a** : Échec d'envoi email → Log erreur mais création OK

**Postconditions** :
- Un nouveau client est créé dans la BD
- Un User associé est créé
- Le client a reçu ses identifiants par email

---

### UC-3 : Nouveau compte bancaire

**Acteur principal** : AGENT_GUICHET

**Préconditions** :
- L'agent est authentifié
- Au moins un client existe dans le système

**Scénario nominal** :
1. L'agent accède au formulaire "Nouveau Compte"
2. L'agent saisit :
   - RIB (RG_9)
   - Numéro d'identité du client (RG_8)
3. L'agent clique sur "Créer"
4. Le système vérifie que le client existe (RG_8)
5. Le système valide le format du RIB (RG_9)
6. Le système crée le compte avec :
   - RIB saisi
   - Solde initial = 0.00
   - Statut = ACTIVE (RG_10)
   - Date de création = maintenant
7. Le système affiche un message de succès

**Scénarios alternatifs** :
- **4a** : Client inexistant → Erreur (RG_8)
- **5a** : RIB invalide → Erreur (RG_9)
- **6a** : RIB existe déjà → Erreur

**Postconditions** :
- Un nouveau compte bancaire est créé
- Le compte est lié au client
- Le statut est "ACTIVE"

---

### UC-4 : Consulter le tableau de bord

**Acteur principal** : CLIENT

**Préconditions** :
- Le client est authentifié
- Le client possède au moins un compte

**Scénario nominal** :
1. Le système affiche le dashboard du client
2. Pour chaque compte, le système affiche :
   - Le numéro RIB
   - Le solde actuel
3. Le système affiche les 10 dernières opérations avec :
   - Intitulé de l'opération
   - Type (DEBIT ou CREDIT)
   - Date de l'opération
   - Montant
4. Le système offre une pagination pour voir plus d'opérations

**Scénario alternatif (multi-comptes)** :
- **2a** : Le client a plusieurs comptes
  - Le système affiche une liste déroulante
  - Le compte le plus récemment mouvementé est sélectionné par défaut
  - Le client peut changer de compte via la liste

**Postconditions** :
- Le client visualise ses comptes et opérations
- L'option "Nouveau virement" est disponible

---

### UC-5 : Effectuer un nouveau virement

**Acteur principal** : CLIENT

**Préconditions** :
- Le client est authentifié
- Le client possède au moins un compte actif
- Le compte a un solde suffisant

**Scénario nominal** :
1. Le client accède au formulaire "Nouveau Virement"
2. Le système pré-remplit le RIB source (grisé si 1 seul compte)
3. Le client saisit :
   - Montant du virement
   - RIB destinataire
   - Motif
4. Le client clique sur "Valider"
5. Le système vérifie :
   - Compte source non bloqué/clôturé (RG_11)
   - Solde suffisant (RG_12)
   - RIB destinataire existe
6. Le système débite le compte source (RG_13)
7. Le système crédite le compte destinataire (RG_14)
8. Le système trace les 2 opérations avec dates précises (RG_15) :
   - Opération DEBIT sur compte source
   - Opération CREDIT sur compte destinataire
9. Le système affiche un message de succès

**Scénario alternatif (multi-comptes)** :
- **2a** : Le client a plusieurs comptes
  - Le système affiche une liste déroulante
  - Le client sélectionne le compte source

**Scénarios d'erreur** :
- **5a** : Compte bloqué → Erreur (RG_11)
- **5b** : Solde insuffisant → Erreur (RG_12)
- **5c** : RIB destinataire invalide → Erreur
- **6-8a** : Erreur lors du virement → Rollback transactionnel

**Postconditions** :
- Le compte source est débité
- Le compte destinataire est crédité
- Deux opérations sont enregistrées avec leurs dates
- Les soldes sont mis à jour

## 🌐 API Documentation

### Base URL
```
http://localhost:8081/api
```

### Authentification

Toutes les requêtes (sauf `/auth/login`) nécessitent un header :
```
Authorization: Bearer {token}
```

---

### Endpoints Authentification

#### POST /api/auth/login
Authentification d'un utilisateur (RG_2, RG_3)

**Request Body:**
```json
{
  "username": "client1",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "client1",
  "role": "CLIENT"
}
```

**Errors:**
- `400 Bad Request` : Credentials invalides (RG_2)

---

#### POST /api/auth/change-password
Modification du mot de passe (RG_1)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "oldPassword": "ancien_mot_de_passe",
  "newPassword": "nouveau_mot_de_passe"
}
```

**Response (200 OK):**
```json
{
  "message": "Mot de passe modifié avec succès"
}
```

**Errors:**
- `401 Unauthorized` : Token invalide/expiré
- `400 Bad Request` : Ancien mot de passe incorrect

---

### Endpoints Clients (AGENT_GUICHET)

#### POST /api/clients
Créer un nouveau client (RG_4 à RG_7)

**Headers:**
```
Authorization: Bearer {token}
Role Required: AGENT_GUICHET
```

**Request Body:**
```json
{
  "nom": "Alami",
  "prenom": "Mohammed",
  "numeroIdentite": "AB123456",
  "dateAnniversaire": "1990-01-15",
  "email": "m.alami@email.com",
  "adressePostale": "123 Rue Hassan II, Casablanca"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "nom": "Alami",
  "prenom": "Mohammed",
  "numeroIdentite": "AB123456",
  "dateAnniversaire": "1990-01-15",
  "email": "m.alami@email.com",
  "adressePostale": "123 Rue Hassan II, Casablanca",
  "username": "mohammed.alami"
}
```

**Errors:**
- `401 Unauthorized` : Non authentifié
- `403 Forbidden` : Rôle insuffisant
- `400 Bad Request` : 
  - N° identité déjà existant (RG_4)
  - Email déjà existant (RG_6)
  - Champs obligatoires manquants (RG_5)

---

#### GET /api/clients
Lister tous les clients

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nom": "Alami",
    "prenom": "Mohammed",
    "numeroIdentite": "AB123456",
    "email": "m.alami@email.com",
    "username": "mohammed.alami"
  }
]
```

---

#### GET /api/clients/{id}
Récupérer un client par ID

**Response (200 OK):**
```json
{
  "id": 1,
  "nom": "Alami",
  "prenom": "Mohammed",
  "numeroIdentite": "AB123456",
  "dateAnniversaire": "1990-01-15",
  "email": "m.alami@email.com",
  "adressePostale": "123 Rue Hassan II, Casablanca"
}
```

---

### Endpoints Comptes Bancaires (AGENT_GUICHET)

#### POST /api/comptes
Créer un nouveau compte bancaire (RG_8 à RG_10)

**Request Body:**
```json
{
  "rib": "MA1234567890123456789012",
  "numeroIdentite": "AB123456"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "rib": "MA1234567890123456789012",
  "solde": 0.00,
  "statut": "ACTIVE",
  "dateCreation": "2025-01-04T10:30:00",
  "clientId": 1,
  "clientNom": "Alami",
  "clientPrenom": "Mohammed"
}
```

**Errors:**
- `400 Bad Request` : 
  - Client inexistant (RG_8)
  - RIB invalide (RG_9)
  - RIB déjà existant

---

#### GET /api/comptes
Lister tous les comptes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "rib": "MA1234567890123456789012",
    "solde": 1500.50,
    "statut": "ACTIVE",
    "clientNom": "Alami Mohammed"
  }
]
```

---

### Endpoints Dashboard (CLIENT)

#### GET /api/dashboard/mes-comptes
Récupérer les comptes du client connecté

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "rib": "MA1234567890123456789012",
    "solde": 1500.50,
    "statut": "ACTIVE",
    "dateDerniereOperation": "2025-01-04T14:30:00"
  },
  {
    "id": 2,
    "rib": "MA9876543210987654321098",
    "solde": 2300.00,
    "statut": "ACTIVE",
    "dateDerniereOperation": "2025-01-03T09:15:00"
  }
]
```

---

#### GET /api/dashboard/mes-operations
Récupérer l'historique des opérations (pagination)

**Query Parameters:**
- `page` (optional): Numéro de page (défaut: 0)
- `size` (optional): Taille de page (défaut: 10)

**Response (200 OK):**
```json
{
  "operations": [
    {
      "id": 15,
      "type": "CREDIT",
      "montant": 500.00,
      "intitule": "Virement en votre faveur de Ahmed Bennani",
      "motif": "Remboursement prêt",
      "dateOperation": "2025-01-04T10:30:00"
    },
    {
      "id": 14,
      "type": "DEBIT",
      "montant": 200.00,
      "intitule": "Virement vers Sara Idrissi",
      "motif": "Paiement facture",
      "dateOperation": "2025-01-03T15:45:00"
    }
  ],
  "currentPage": 0,
  "pageSize": 10,
  "totalElements": 25,
  "totalPages": 3,
  "last": false
}
```

---

### Endpoints Virements (CLIENT)

#### POST /api/virements
Effectuer un virement (RG_11 à RG_15)

**Request Body:**
```json
{
  "ribSource": "MA1234567890123456789012",
  "ribDestinataire": "MA9876543210987654321098",
  "montant": 500.00,
  "motif": "Paiement facture électricité"
}
```

**Response (200 OK):**
```json
{
  "ribSource": "MA1234567890123456789012",
  "ribDestinataire": "MA9876543210987654321098",
  "montant": 500.00,
  "motif": "Paiement facture électricité",
  "dateVirement": "2025-01-04T14:30:00",
  "message": "Virement effectué avec succès"
}
```

**Errors:**
- `400 Bad Request` :
  - Compte source bloqué/clôturé (RG_11)
  - Solde insuffisant (RG_12)
  - RIB destinataire inexistant
  - Montant invalide

---

### Endpoints Opérations (AGENT_GUICHET)

#### POST /api/operations/credit
Effectuer un crédit sur un compte

**Request Body:**
```json
{
  "rib": "MA1234567890123456789012",
  "montant": 1000.00,
  "intitule": "Dépôt espèces",
  "motif": "Dépôt en agence"
}
```

**Response (200 OK):**
```json
{
  "id": 20,
  "type": "CREDIT",
  "montant": 1000.00,
  "intitule": "Dépôt espèces",
  "dateOperation": "2025-01-04T16:00:00",
  "nouveauSolde": 2500.50
}
```

---

#### POST /api/operations/debit
Effectuer un débit sur un compte

**Request Body:**
```json
{
  "rib": "MA1234567890123456789012",
  "montant": 300.00,
  "intitule": "Retrait espèces",
  "motif": "Retrait guichet"
}
```

**Response (200 OK):**
```json
{
  "id": 21,
  "type": "DEBIT",
  "montant": 300.00,
  "intitule": "Retrait espèces",
  "dateOperation": "2025-01-04T16:15:00",
  "nouveauSolde": 2200.50
}
```

---

### Endpoints Statistiques (AGENT_GUICHET)

#### GET /api/statistics
Récupérer les statistiques globales

**Response (200 OK):**
```json
{
  "totalClients": 45,
  "totalComptes": 78,
  "totalOperations": 1523,
  "totalCredits": 125000.00,
  "totalDebits": 98000.00
}
```

## 🔒 Sécurité

### Implémentation de la sécurité

#### 1. Cryptage des mots de passe (RG_1)

```java
@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

Tous les mots de passe sont cryptés avec **BCrypt** avant stockage en base de données.

#### 2. JWT (JSON Web Token) (RG_3)

**Configuration** :
- Algorithme : HS256
- Durée de validité : **1 heure** (3600000 ms)
- Secret key : Configurable via `jwt.secret`

**Structure du JWT** :
```json
{
  "sub": "username",
  "iat": 1704369000,
  "exp": 1704372600
}
```

**Flux JWT** :
1. Login réussi → Génération du JWT
2. Client stocke le JWT (localStorage)
3. Chaque requête inclut : `Authorization: Bearer {token}`
4. Backend valide le token et extrait l'utilisateur
5. Si expiré → 401 Unauthorized (RG_3)

#### 3. Contrôle d'accès basé sur les rôles (RBAC)

```java
@PreAuthorize("hasRole('AGENT_GUICHET')")
@PostMapping("/clients")
public ResponseEntity<ClientResponse> createClient(...)

@PreAuthorize("hasRole('CLIENT')")
@GetMapping("/dashboard/mes-comptes")
public ResponseEntity<List<CompteClientResponse>> getMesComptes(...)
```

#### 4. Protection CORS

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    return source;
}
```

#### 5. Validation des données

```java
public class ClientRequest {
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;
    
    @Email(message = "L'email doit être valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;
}
```

### Gestion des erreurs de sécurité

| Erreur | Code HTTP | Message |
|--------|-----------|---------|
| Credentials invalides (RG_2) | 400 | "Login ou mot de passe erronés" |
| Token expiré (RG_3) | 401 | "Session invalide, veuillez vous authentifier" |
| Rôle insuffisant | 403 | "Vous n'avez pas le droit d'accéder à cette fonctionnalité" |
| Non authentifié | 401 | "Authentification requise" |

## 📁 Structure du projet

```
BankatiApp/
├── bank-backend/                          # Application Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/TpBankati/bank/
│   │   │   │   ├── config/               # Configurations
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/           # Contrôleurs REST
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── ClientController.java
│   │   │   │   │   ├── CompteController.java
│   │   │   │   │   ├── DashboardController.java
│   │   │   │   │   ├── VirementController.java
│   │   │   │   │   ├── OperationController.java
│   │   │   │   │   └── StatisticsController.java
│   │   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── LoginResponse.java
│   │   │   │   │   ├── ClientRequest.java
│   │   │   │   │   ├── ClientResponse.java
│   │   │   │   │   ├── CompteRequest.java
│   │   │   │   │   ├── CompteResponse.java
│   │   │   │   │   ├── VirementRequest.java
│   │   │   │   │   └── VirementResponse.java
│   │   │   │   ├── entity/               # Entités JPA
│   │   │   │   │   ├── User.java         # Utilisateur (RG_1, RG_2)
│   │   │   │   │   ├── Client.java       # Client (RG_4-RG_7)
│   │   │   │   │   ├── CompteBancaire.java  # Compte (RG_8-RG_10)
│   │   │   │   │   ├── Operation.java    # Opération (RG_15)
│   │   │   │   │   └── Role.java         # Enum des rôles
│   │   │   │   ├── repository/           # Repositories JPA
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── ClientRepository.java
│   │   │   │   │   ├── CompteBancaireRepository.java
│   │   │   │   │   └── OperationRepository.java
│   │   │   │   ├── security/             # Sécurité JWT
│   │   │   │   │   ├── JwtUtil.java      # Génération/Validation JWT (RG_3)
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   ├── service/              # Logique métier
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── ClientService.java
│   │   │   │   │   ├── CompteService.java
│   │   │   │   │   ├── DashboardService.java
│   │   │   │   │   ├── VirementService.java
│   │   │   │   │   ├── OperationService.java
│   │   │   │   │   ├── EmailService.java  # RG_7
│   │   │   │   │   └── StatisticsService.java
│   │   │   │   └── TpBankatiApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── templates/
│   │   │           └── credentials-email.html
│   │   └── test/
│   │       └── java/com/TpBankati/bank/
│   │           └── [Tests unitaires]
│   ├── logs/
│   │   └── tpbankati.log
│   └── pom.xml
│
├── bank-frontend/                         # Application React
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/                   # Composants réutilisables
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/                      # Contextes React
│   │   │   └── AuthContext.js
│   │   ├── pages/                        # Pages de l'application
│   │   │   ├── Login.jsx                 # UC-1
│   │   │   ├── agent/
│   │   │   │   ├── AddClient.jsx         # UC-2
│   │   │   │   ├── AddAccount.jsx        # UC-3
│   │   │   │   ├── CompteList.jsx
│   │   │   │   └── AgentDashboard.jsx
│   │   │   └── client/
│   │   │       ├── Dashboard.jsx         # UC-4
│   │   │       └── Virement.jsx          # UC-5
│   │   ├── services/
│   │   │   └── api.js                    # Configuration Axios + Intercepteurs
│   │   ├── utils/
│   │   │   └── validators.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
├── docs/                                  # Documentation
│   ├── rapport.pdf
│   ├── screenshots/
│   └── architecture.png
│
├── README.md                              # Ce fichier
├── .gitignore
└── LICENSE
```

### Explication des packages principaux

#### Backend

- **config/** : Configuration Spring (Security, CORS, Email)
- **controller/** : Endpoints REST API, validation des requêtes
- **dto/** : Objets de transfert, séparation entités/API
- **entity/** : Modèle de données JPA/Hibernate
- **repository/** : Accès aux données, requêtes personnalisées
- **security/** : JWT, filtres, authentification
- **service/** : Logique métier, règles de gestion

#### Frontend

- **components/** : Composants UI réutilisables
- **context/** : Gestion d'état global (Auth)
- **pages/** : Pages complètes de l'application
- **services/** : Communication avec l'API
- **utils/** : Fonctions utilitaires

## 📸 Captures d'écran

### 1. Page de connexion
![Login Page](docs/screenshots/login.png)
*Interface de connexion avec validation (RG_2)*

### 2. Dashboard AGENT_GUICHET
![Agent Dashboard](docs/screenshots/agent-dashboard.png)
*Vue d'ensemble pour les agents*

### 3. Création de client
![Add Client](docs/screenshots/add-client.png)
*Formulaire de création de client (UC-2, RG_4-RG_7)*

### 4. Création de compte
![Add Account](docs/screenshots/add-account.png)
*Formulaire de création de compte bancaire (UC-3, RG_8-RG_10)*

### 5. Dashboard CLIENT
![Client Dashboard](docs/screenshots/client-dashboard.png)
*Tableau de bord client avec comptes et opérations (UC-4)*

### 6. Nouveau virement
![Virement](docs/screenshots/virement.png)
*Formulaire de virement (UC-5, RG_11-RG_15)*

### 7. Changement de mot de passe
![Change Password](docs/screenshots/change-password.png)
*Interface de modification du mot de passe (RG_1)*

### 8. Email credentials
![Email](docs/screenshots/email-credentials.png)
*Email automatique envoyé au client (RG_7)*

## 🧪 Tests

### Tests Backend

```bash
cd bank-backend
mvn test
```

#### Exemples de tests

```java
@SpringBootTest
class ClientServiceTest {
    
    @Test
    void testCreateClient_Success() {
        // Test RG_4, RG_5, RG_6, RG_7
    }
    
    @Test
    void testCreateClient_DuplicateNumeroIdentite() {
        // Test RG_4
    }
    
    @Test
    void testCreateClient_DuplicateEmail() {
        // Test RG_6
    }
}

@SpringBootTest
class VirementServiceTest {
    
    @Test
    void testVirement_Success() {
        // Test RG_11-RG_15
    }
    
    @Test
    void testVirement_InsufficientBalance() {
        // Test RG_12
    }
    
    @Test
    void testVirement_BlockedAccount() {
        // Test RG_11
    }
}
```

### Tests Frontend

```bash
cd bank-frontend
npm test
```

### Tests manuels

Checklist de validation :

- [ ] **RG_1** : Vérifier que les mots de passe sont cryptés en BD
- [ ] **RG_2** : Tester login avec credentials invalides
- [ ] **RG_3** : Attendre 1h et vérifier l'expiration du token
- [ ] **RG_4** : Créer 2 clients avec même n° identité
- [ ] **RG_5** : Soumettre formulaire avec champs vides
- [ ] **RG_6** : Créer 2 clients avec même email
- [ ] **RG_7** : Vérifier réception email après création client
- [ ] **RG_8** : Créer compte avec n° identité inexistant
- [ ] **RG_9** : Créer compte avec RIB invalide
- [ ] **RG_10** : Vérifier statut "ACTIVE" du nouveau compte
- [ ] **RG_11** : Tenter virement depuis compte bloqué
- [ ] **RG_12** : Tenter virement avec solde insuffisant
- [ ] **RG_13** : Vérifier débit après virement
- [ ] **RG_14** : Vérifier crédit destinataire après virement
- [ ] **RG_15** : Vérifier traçage des 2 opérations

## 📦 Livrables

### 1. Code source sur GitHub

**Repository** : https://github.com/votre-username/BankatiApp

**Branches** :
- `main` : Code de production
- `develop` : Code en développement
- `feature/*` : Fonctionnalités spécifiques

**Commits** :
- Commits réguliers et descriptifs
- Messages en français
- Respect de la convention : `[Type] Description`
  - `[FEAT]` : Nouvelle fonctionnalité
  - `[FIX]` : Correction de bug
  - `[REFACTOR]` : Refactoring
  - `[DOC]` : Documentation

### 2. Rapport de l'application

**Contenu du rapport** (voir `docs/rapport.pdf`) :

1. **Introduction**
   - Contexte du projet
   - Objectifs
   - Technologies utilisées

2. **Architecture**
   - Architecture globale
   - Schéma des flux
   - Modèle de données (diagramme de classes)
   - Diagrammes UML (cas d'utilisation, séquence)

3. **Spécifications techniques**
   - Configuration Spring Boot
   - Sécurité (JWT, Spring Security)
   - Design patterns (IOC, AOP, DTO)
   - Communication REST

4. **Fonctionnalités**
   - Description détaillée de chaque UC
   - Règles de gestion implémentées
   - Screenshots de l'interface

5. **Perspectives et améliorations**

### 3. Présentation et démonstration

**Contenu de la présentation** :

1. **Introduction** (2 min)
   - Présentation de l'équipe
   - Contexte et objectifs

2. **Architecture** (3 min)
   - Schémas architecture
   - Technologies et design patterns

3. **Démonstration** (10 min)
   - Login et authentification
   - Parcours AGENT_GUICHET
   - Parcours CLIENT
   - Fonctionnalités clés

4. **Code source** (5 min)
   - Structure du projet
   - Points techniques importants
   - Gestion de la sécurité

5. **Questions/Réponses** (5 min)

## 👥 Auteurs

**Binôme** :
- [Prénom1 NOM1] - [email1@example.com]
- [Prénom2 NOM2] - [email2@example.com]

**Professeur** :
- [Nom du professeur]

**Établissement** :
- [Nom de l'école/université]

## 📄 Licence

Ce projet a été réalisé dans un cadre académique pour le module Architecture des Composants Entreprise.

## 🙏 Remerciements

- Professeur [Nom] pour l'encadrement et les conseils
- L'équipe enseignante pour les ateliers pratiques
- La documentation Spring Boot et React

---

## 📞 Contact et Support

Pour toute question concernant ce projet :

- **Email** : [votre-email@example.com]
- **GitHub Issues** : [Lien vers les issues]
- **Documentation** : [Lien vers la doc complète]

---

## 🚀 Améliorations futures

- [ ] Tests unitaires et d'intégration complets
- [ ] CI/CD avec GitHub Actions
- [ ] Dockerisation de l'application
- [ ] Interface d'administration avancée
- [ ] Export PDF des relevés bancaires
- [ ] Notifications temps réel (WebSocket)
- [ ] Application mobile (React Native)
- [ ] Authentification à deux facteurs (2FA)
- [ ] Gestion des cartes bancaires
- [ ] Planification de virements automatiques
- [ ] Dashboard avec graphiques (Chart.js)

---

**Date de dernière mise à jour** : Janvier 2025  
**Version** : 1.0.0  
**Statut** : ✅ Projet terminé et validé

---

⭐ **Si ce projet vous est utile, n'hésitez pas à lui donner une étoile sur GitHub !**
