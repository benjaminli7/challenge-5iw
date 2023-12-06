<?php

namespace App\Entity;

use App\Repository\RankRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Link;


#[ORM\Entity(repositoryClass: RankRepository::class)]
#[ApiResource(
    operations:[
        new GetCollection(normalizationContext: ['groups' => ['read-rank']]),
        new Get(normalizationContext: ['groups' => ['read-rank']]),
        new Post(denormalizationContext: ['groups' => ['create-rank']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can create ranks.'),
        new Patch(denormalizationContext: ['groups' => ['update-rank']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can update ranks.'),
        new Delete(security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can delete ranks.'),
    ],
    normalizationContext: ['groups' => ['read-rank']],
)]
class Rank
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-rank', 'update-rank'])]
    private int $id;

    #[ORM\ManyToOne(inversedBy: 'ranks')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-rank', 'create-rank', 'update-rank'])]
    private Game $game ;

    #[ORM\Column(length: 255 , nullable: false)]
    #[Groups(['read-rank', 'create-rank', 'update-rank'])]
    private string $name ;

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
