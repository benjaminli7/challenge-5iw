<?php

namespace App\Tests\Controller;

use App\Controller\PostImageGameController;
use App\Entity\Game;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;

class PostImageGameControllerTest extends TestCase
{
    // Teste le comportement de la méthode __invoke() du contrôleur PostImageGameController
    public function testInvoke(): void
    {
        // Crée une entité Game fictive
        $game = new Game();

        // Crée un fichier fictif
        $file = new UploadedFile(
            __DIR__ . '/images/lebron.png', // Définit le chemin du fichier image fictif
            'lebron.png', // Définit le nom du fichier
            'image/png', // Définit le type de fichier
            null, // Définit la taille du fichier à null
            true // Marque le fichier en mode test, pour ne pas le déplacer dans les tests
        );

        // Crée une requête fictive avec les attributs game et file
        $request = new Request([], [], ['data' => $game], [], ['file' => $file]);

        // Instancie le contrôleur PostImageGameController
        $controller = new PostImageGameController();

        // Invoque le contrôleur
        $result = $controller->__invoke($request);

        // Vérifie que le résultat retourné est bien l'objet Game initial
        $this->assertSame($game, $result);

        // Vérifie que le fichier a bien été associé à l'entité Game
        $this->assertSame($file, $game->getFile());
    }
}
