<?php

namespace App\Tests\Normalizer;

use App\Entity\Game;
use App\Normalizer\GameNormalizer;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Vich\UploaderBundle\Storage\StorageInterface;

class GameNormalizerTest extends TestCase
{
    public function testSupportsNormalization(): void
    {
        $normalizer = new GameNormalizer($this->createMock(StorageInterface::class));

        // Test avec un objet Game
        $game = new Game();
        $this->assertTrue($normalizer->supportsNormalization($game));

        // Test avec un objet non Game
        $otherObject = new \stdClass();
        $this->assertFalse($normalizer->supportsNormalization($otherObject));
    }
}

//     public function testNormalize(): void
//     {
//         // Créer un objet Game pour tester la normalisation
//         $game = new Game();
//         $game->setName('Sample Game');

//         // Créer un mock pour l'interface StorageInterface
//         $storageMock = $this->createMock(StorageInterface::class);
//         $storageMock->method('resolveUri')->willReturn('http://example.com/sample.jpg');

//         // Créer le normalizer
//         $normalizer = new GameNormalizer($storageMock);

//         // Normaliser l'objet Game
//         $normalizedData = $normalizer->normalize($game);

//         // Vérifier si les données normalisées contiennent les informations attendues
//         $this->assertEquals([
//             'name' => 'Sample Game',
//             'fileUrl' => 'http://example.com/sample.jpg',
//         ], $normalizedData);
//     }
//}
