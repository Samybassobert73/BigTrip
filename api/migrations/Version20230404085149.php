<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230404085149 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity (id INT AUTO_INCREMENT NOT NULL, url VARCHAR(255) NOT NULL, start_at DATETIME NOT NULL, end_at DATETIME NOT NULL, lattitude VARCHAR(255) NOT NULL, longitude VARCHAR(255) NOT NULL, rating INT DEFAULT NULL, name VARCHAR(255) NOT NULL, photo VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE housing (id INT AUTO_INCREMENT NOT NULL, url VARCHAR(255) NOT NULL, start_at DATETIME NOT NULL, end_at DATETIME NOT NULL, lattitude VARCHAR(255) NOT NULL, longitude VARCHAR(255) NOT NULL, rating DOUBLE PRECISION DEFAULT NULL, name VARCHAR(255) NOT NULL, photo VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payement_kind (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, INDEX IDX_6A0832BFA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE refresh_tokens (id INT AUTO_INCREMENT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid DATETIME NOT NULL, UNIQUE INDEX UNIQ_9BACE7E1C74F2195 (refresh_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE travel (id INT AUTO_INCREMENT NOT NULL, url VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, photo VARCHAR(255) DEFAULT NULL, start_at DATETIME NOT NULL, end_at DATETIME NOT NULL, lattitude VARCHAR(255) NOT NULL, longitude VARCHAR(255) NOT NULL, travel_kind VARCHAR(255) NOT NULL, lattitude_arrival VARCHAR(255) NOT NULL, longitude_arrival VARCHAR(255) NOT NULL, waypoint_lattitude_one VARCHAR(255) DEFAULT NULL, waypoint_longitude_one VARCHAR(255) DEFAULT NULL, waypoint_lattitude_two VARCHAR(255) DEFAULT NULL, waypoint_longitude_two VARCHAR(255) DEFAULT NULL, waypoint_lattitude_three VARCHAR(255) DEFAULT NULL, waypoint_longitude_three VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE trip (id INT AUTO_INCREMENT NOT NULL, start_at DATETIME DEFAULT NULL, photo VARCHAR(255) DEFAULT NULL, end_at DATETIME DEFAULT NULL, rating DOUBLE PRECISION DEFAULT NULL, name VARCHAR(150) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE trip_housing (trip_id INT NOT NULL, housing_id INT NOT NULL, INDEX IDX_CD6D076EA5BC2E0E (trip_id), INDEX IDX_CD6D076EAD5873E3 (housing_id), PRIMARY KEY(trip_id, housing_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE trip_travel (trip_id INT NOT NULL, travel_id INT NOT NULL, INDEX IDX_C2043064A5BC2E0E (trip_id), INDEX IDX_C2043064ECAB15B3 (travel_id), PRIMARY KEY(trip_id, travel_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE trip_activity (trip_id INT NOT NULL, activity_id INT NOT NULL, INDEX IDX_4253A4AA5BC2E0E (trip_id), INDEX IDX_4253A4A81C06096 (activity_id), PRIMARY KEY(trip_id, activity_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, phone VARCHAR(12) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_trip (user_id INT NOT NULL, trip_id INT NOT NULL, INDEX IDX_CD7B9F2A76ED395 (user_id), INDEX IDX_CD7B9F2A5BC2E0E (trip_id), PRIMARY KEY(user_id, trip_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE payement_kind ADD CONSTRAINT FK_6A0832BFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trip_housing ADD CONSTRAINT FK_CD6D076EA5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip_housing ADD CONSTRAINT FK_CD6D076EAD5873E3 FOREIGN KEY (housing_id) REFERENCES housing (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip_travel ADD CONSTRAINT FK_C2043064A5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip_travel ADD CONSTRAINT FK_C2043064ECAB15B3 FOREIGN KEY (travel_id) REFERENCES travel (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip_activity ADD CONSTRAINT FK_4253A4AA5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip_activity ADD CONSTRAINT FK_4253A4A81C06096 FOREIGN KEY (activity_id) REFERENCES activity (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_trip ADD CONSTRAINT FK_CD7B9F2A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_trip ADD CONSTRAINT FK_CD7B9F2A5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE payement_kind DROP FOREIGN KEY FK_6A0832BFA76ED395');
        $this->addSql('ALTER TABLE trip_housing DROP FOREIGN KEY FK_CD6D076EA5BC2E0E');
        $this->addSql('ALTER TABLE trip_housing DROP FOREIGN KEY FK_CD6D076EAD5873E3');
        $this->addSql('ALTER TABLE trip_travel DROP FOREIGN KEY FK_C2043064A5BC2E0E');
        $this->addSql('ALTER TABLE trip_travel DROP FOREIGN KEY FK_C2043064ECAB15B3');
        $this->addSql('ALTER TABLE trip_activity DROP FOREIGN KEY FK_4253A4AA5BC2E0E');
        $this->addSql('ALTER TABLE trip_activity DROP FOREIGN KEY FK_4253A4A81C06096');
        $this->addSql('ALTER TABLE user_trip DROP FOREIGN KEY FK_CD7B9F2A76ED395');
        $this->addSql('ALTER TABLE user_trip DROP FOREIGN KEY FK_CD7B9F2A5BC2E0E');
        $this->addSql('DROP TABLE activity');
        $this->addSql('DROP TABLE housing');
        $this->addSql('DROP TABLE payement_kind');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE travel');
        $this->addSql('DROP TABLE trip');
        $this->addSql('DROP TABLE trip_housing');
        $this->addSql('DROP TABLE trip_travel');
        $this->addSql('DROP TABLE trip_activity');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_trip');
    }
}
