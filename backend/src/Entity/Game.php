<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: GameRepository::class)]
#[ApiResource(
    operations:[
        new GetCollection(normalizationContext: ['groups' => ['read-game']]),
        new Get(normalizationContext: ['groups' => ['read-game']]),
        new Post(denormalizationContext: ['groups' => ['create-game']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can create games.'),
        new Patch(denormalizationContext: ['groups' => ['update-game']], security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can update games.'),
        new Delete(security: 'is_granted("ROLE_ADMIN")' , securityMessage: 'Only admins can delete games.'),
    ],
    normalizationContext: ['groups' => ['read-game']],
)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-game', 'update-game'])]
    private ?int $id = null;

    #[ORM\Column(length: 255 , unique: true, nullable: false)]
    #[Groups(['read-game', 'create-game', 'update-game'])]
    private string $name ;

    #[ORM\OneToMany(mappedBy: 'game', targetEntity: Rank::class)]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    #[Groups(['read-game', 'create-game', 'update-game'])]
    private Collection $ranks;

    public function __construct()
    {
        $this->ranks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Rank>
     */
    public function getRanks(): Collection
    {
        return $this->ranks;
    }

    public function addRank(Rank $rank): static
    {
        if (!$this->ranks->contains($rank)) {
            $this->ranks->add($rank);
            $rank->setGame($this);
        }

        return $this;
    }

    public function removeRank(Rank $rank): static
    {
        if ($this->ranks->removeElement($rank)) {
            // set the owning side to null (unless already changed)
            if ($rank->getGame() === $this) {
                $rank->setGame(null);
            }
        }

        return $this;
    }
}
