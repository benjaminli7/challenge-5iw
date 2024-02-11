<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240210154602 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE game ADD file_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE game ADD color VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE game ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE game ADD updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_232B318C5E237E06 ON game (name)');
        $this->addSql('ALTER TABLE team ADD coins INT NOT NULL');
        $this->addSql('ALTER TABLE team ADD is_approved BOOLEAN NOT NULL');
        $this->addSql('ALTER TABLE team ADD iban VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD owned_team_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD assigned_game_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD type VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD discord VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" DROP is_first_connection');
        $this->addSql('ALTER TABLE "user" DROP user_type');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D6497AC0658A FOREIGN KEY (owned_team_id) REFERENCES team (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649EE17618A FOREIGN KEY (assigned_game_id) REFERENCES game (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8D93D6497AC0658A ON "user" (owned_team_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649EE17618A ON "user" (assigned_game_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_232B318C5E237E06');
        $this->addSql('ALTER TABLE game DROP file_path');
        $this->addSql('ALTER TABLE game DROP color');
        $this->addSql('ALTER TABLE game DROP created_at');
        $this->addSql('ALTER TABLE game DROP updated_at');
        $this->addSql('ALTER TABLE team DROP coins');
        $this->addSql('ALTER TABLE team DROP is_approved');
        $this->addSql('ALTER TABLE team DROP iban');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D6497AC0658A');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649EE17618A');
        $this->addSql('DROP INDEX IDX_8D93D6497AC0658A');
        $this->addSql('DROP INDEX IDX_8D93D649EE17618A');
        $this->addSql('ALTER TABLE "user" ADD is_first_connection BOOLEAN DEFAULT true NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD user_type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP owned_team_id');
        $this->addSql('ALTER TABLE "user" DROP assigned_game_id');
        $this->addSql('ALTER TABLE "user" DROP type');
        $this->addSql('ALTER TABLE "user" DROP discord');
    }
}
