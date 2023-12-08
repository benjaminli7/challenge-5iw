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

    operations:[
    // new Post(denormalizationContext: ['groups' => ['create-rank']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can create Ranks.'),
        new Patch(denormalizationContext: ['groups' => ['update-rank']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can update Ranks.'),
        new Delete(security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can delete Ranks.'),
    ]   
)]
class Rank
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-game'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ranks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Game $game = null;

    #[ORM\Column(length: 255)]
    #[Groups(['update-rank' ,'read-game', 'create-game'])]
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