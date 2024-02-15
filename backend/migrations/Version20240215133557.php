<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240215133557 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE review_type_id_seq CASCADE');
        $this->addSql('DROP TABLE review_type');
        $this->addSql('ALTER TABLE booking ADD review_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE booking ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE booking ADD updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE booking DROP coins_used');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE3E2E969B FOREIGN KEY (review_id) REFERENCES review (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E00CEDDE3E2E969B ON booking (review_id)');
        $this->addSql('ALTER TABLE review ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE review ADD updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE review DROP author_type');
        $this->addSql('ALTER TABLE schedule ADD coins_needed INT NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD lat DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD lng DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" DROP postal');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE review_type_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE review_type (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE review ADD author_type VARCHAR(20) NOT NULL');
        $this->addSql('ALTER TABLE review DROP created_at');
        $this->addSql('ALTER TABLE review DROP updated_at');
        $this->addSql('ALTER TABLE schedule DROP coins_needed');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDE3E2E969B');
        $this->addSql('DROP INDEX UNIQ_E00CEDDE3E2E969B');
        $this->addSql('ALTER TABLE booking ADD coins_used INT NOT NULL');
        $this->addSql('ALTER TABLE booking DROP review_id');
        $this->addSql('ALTER TABLE booking DROP created_at');
        $this->addSql('ALTER TABLE booking DROP updated_at');
        $this->addSql('ALTER TABLE "user" ADD postal VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" DROP lat');
        $this->addSql('ALTER TABLE "user" DROP lng');
    }
}
