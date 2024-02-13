<?php

namespace App\Tests\Controller;

use App\Controller\PostImageRankController;
use App\Entity\Rank;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;

class PostImageRankControllerTest extends TestCase
{
    // Teste le comportement de la méthode __invoke() du contrôleur PostImageRankController
    public function testInvoke(): void
    {
        // Crée une entité Rank fictive
        $rank = new Rank();

        // Crée un fichier fictif
        $file = new UploadedFile(
            __DIR__ . '/images/goldLol.jpeg', // Définit le chemin du fichier image fictif
            'goldLol.jpeg', // Définit le nom du fichier
            'image/jpeg', // Définit le type de fichier
            null, // Définit la taille du fichier à null
            true // Marque le fichier en mode test, pour ne pas le déplacer dans les tests
        );

        // Crée une requête fictive avec les attributs rank et file
        $request = new Request([], [], ['data' => $rank], [], ['file' => $file]);

        // Instancie le contrôleur PostImageRankController
        $controller = new PostImageRankController();

        // Invoque le contrôleur
        $result = $controller->__invoke($request);

        // Vérifie que le résultat retourné est bien l'objet Rank initial
        $this->assertSame($rank, $result);

        // Vérifie que le fichier a bien été associé à l'entité Rank
        $this->assertSame($file, $rank->getFile());
    }
}
