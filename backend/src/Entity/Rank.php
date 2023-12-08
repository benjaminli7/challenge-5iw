<?php

namespace App\Entity;

use App\Repository\RankRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Delete;



#[ORM\Entity(repositoryClass: RankRepository::class)]
#[ApiResource(

    operations: [
        new Post(normalizationContext:['groups' =>['returned-creation']], denormalizationContext: ['groups' => ['create-rank']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can create Ranks.'),
        new Patch(denormalizationContext: ['groups' => ['update-rank']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can update Ranks.'),
        new Delete(security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can delete Ranks.'),
        // new GetCollection(normalizationContext: ['groups' => ['read-rank']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can see all users.')
    ]   ,
    normalizationContext: ['groups' => ['read-rank']],
)]
class Rank
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-game' ,'returned-creation'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ranks')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([ 'create-rank'])]
    private ?Game $game = null;

    #[ORM\Column(length: 255)]
    #[Groups(['update-rank' ,'read-game', 'create-game', 'read-rank' ,'create-rank', 'returned-creation'])]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): static
    {
        $this->game = $game;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}