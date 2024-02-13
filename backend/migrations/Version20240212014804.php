<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240212014804 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX uniq_5a3811fbfc33b1');
        $this->addSql('DROP INDEX uniq_5a3811fb9f79558f');
        $this->addSql('ALTER TABLE schedule ADD starting_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE schedule ADD ending_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE schedule DROP start');
        $this->addSql('ALTER TABLE schedule DROP "end"');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A3811FBD1EA6171 ON schedule (starting_date)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A3811FBB4E06C4B ON schedule (ending_date)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_5A3811FBD1EA6171');
        $this->addSql('DROP INDEX UNIQ_5A3811FBB4E06C4B');
        $this->addSql('ALTER TABLE schedule ADD start TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE schedule ADD "end" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE schedule DROP starting_date');
        $this->addSql('ALTER TABLE schedule DROP ending_date');
        $this->addSql('CREATE UNIQUE INDEX uniq_5a3811fbfc33b1 ON schedule ("end")');
        $this->addSql('CREATE UNIQUE INDEX uniq_5a3811fb9f79558f ON schedule (start)');
    }
}
