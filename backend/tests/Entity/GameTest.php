<?php

namespace App\Tests\Entity;

use App\Entity\Game;
use App\Entity\Rank;
use PHPUnit\Framework\TestCase;

class GameTest extends TestCase
{
    public function testGameCanBeCreated(): void
    {
        $game = new Game();
        $this->assertInstanceOf(Game::class, $game);
    }

    public function testSetName(): void
    {
        $game = new Game();
        $name = 'Test Game';
        $game->setName($name);

        $this->assertEquals($name, $game->getName());
    }

    public function testAddRank(): void
    {
        $game = new Game();
        $rank = new Rank();

        $game->addRank($rank);
        $ranks = $game->getRanks();

        $this->assertContains($rank, $ranks);
        $this->assertEquals($game, $rank->getGame());
    }

    public function testRemoveRank(): void
    {
        $game = new Game();
        $rank = new Rank();

        $game->addRank($rank);
        $game->removeRank($rank);
        $ranks = $game->getRanks();

        $this->assertNotContains($rank, $ranks);
        $this->assertNull($rank->getGame());
    }
}
