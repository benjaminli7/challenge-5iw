<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240213145426 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE booking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE game_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE rank_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_type_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE schedule_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE team_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE booking (id INT NOT NULL, coins_used INT NOT NULL, status VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE game (id INT NOT NULL, name VARCHAR(255) NOT NULL, file_path VARCHAR(255) DEFAULT NULL, color VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_232B318C5E237E06 ON game (name)');
        $this->addSql('CREATE TABLE rank (id INT NOT NULL, game_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8879E8E5E48FD905 ON rank (game_id)');
        $this->addSql('CREATE TABLE review (id INT NOT NULL, rating INT NOT NULL, comment VARCHAR(255) NOT NULL, author_type VARCHAR(20) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE review_type (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE schedule (id INT NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, start_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE team (id INT NOT NULL, manager_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, coins INT DEFAULT 0 NOT NULL, is_approved BOOLEAN DEFAULT false NOT NULL, iban VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C4E0A61F5E237E06 ON team (name)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C4E0A61F783E3463 ON team (manager_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, assigned_game_id INT DEFAULT NULL, team_id INT DEFAULT NULL, rank_user_id_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, username VARCHAR(50) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, plain_password VARCHAR(255) DEFAULT NULL, is_verified BOOLEAN DEFAULT false, token VARCHAR(255) DEFAULT NULL, reset_token VARCHAR(255) DEFAULT NULL, phone VARCHAR(16) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, coins INT DEFAULT NULL, discord VARCHAR(255) DEFAULT NULL, rank_iris JSON DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON "user" (username)');
        $this->addSql('CREATE INDEX IDX_8D93D649EE17618A ON "user" (assigned_game_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649296CD8AE ON "user" (team_id)');
        $this->addSql('CREATE INDEX IDX_8D93D64950443CF6 ON "user" (rank_user_id_id)');
        $this->addSql('ALTER TABLE rank ADD CONSTRAINT FK_8879E8E5E48FD905 FOREIGN KEY (game_id) REFERENCES game (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61F783E3463 FOREIGN KEY (manager_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649EE17618A FOREIGN KEY (assigned_game_id) REFERENCES game (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D64950443CF6 FOREIGN KEY (rank_user_id_id) REFERENCES rank (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE booking_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE game_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE rank_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_type_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE schedule_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE team_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE rank DROP CONSTRAINT FK_8879E8E5E48FD905');
        $this->addSql('ALTER TABLE team DROP CONSTRAINT FK_C4E0A61F783E3463');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649EE17618A');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649296CD8AE');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D64950443CF6');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE rank');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE review_type');
        $this->addSql('DROP TABLE schedule');
        $this->addSql('DROP TABLE team');
        $this->addSql('DROP TABLE "user"');
    }
}
