<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231018210740 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rank ADD game_id INT NOT NULL');
        $this->addSql('ALTER TABLE rank ADD CONSTRAINT FK_8879E8E5E48FD905 FOREIGN KEY (game_id) REFERENCES game (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8879E8E5E48FD905 ON rank (game_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE rank DROP CONSTRAINT FK_8879E8E5E48FD905');
        $this->addSql('DROP INDEX IDX_8879E8E5E48FD905');
        $this->addSql('ALTER TABLE rank DROP game_id');
    }
}
