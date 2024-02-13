<?php

namespace App\Tests\Entity;

use App\Entity\Rank;
use App\Entity\Game;
use PHPUnit\Framework\TestCase;

class RankTest extends TestCase
{
    public function testRankCanBeCreated(): void
    {
        $rank = new Rank();
        $this->assertInstanceOf(Rank::class, $rank);
    }

    public function testSetGame(): void
    {
        $rank = new Rank();
        $game = new Game();
        $rank->setGame($game);

        $this->assertEquals($game, $rank->getGame());
    }

    public function testSetName(): void
    {
        $rank = new Rank();
        $name = 'Test Rank';
        $rank->setName($name);

        $this->assertEquals($name, $rank->getName());
    }

    public function testSetFilePath(): void
    {
        $rank = new Rank();
        $filePath = 'test/path/to/file.jpg';
        $rank->setFilePath($filePath);

        $this->assertEquals($filePath, $rank->getFilePath());
    }

    public function testSetFileUrl(): void
    {
        $rank = new Rank();
        $fileUrl = 'http://example.com/image.jpg';
        $rank->setFileUrl($fileUrl);

        $this->assertEquals($fileUrl, $rank->getFileUrl());
    }
}
