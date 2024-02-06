<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TeamRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read-team']],
    denormalizationContext: ['groups' => ['write-team']],
)]

class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-team'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read-team', 'write-team'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['read-team'])]
    private ?int $coins = null;

    #[ORM\ManyToOne(inversedBy: 'teams')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-team'])]
    private ?User $manager = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: User::class)]
    #[Groups(['read-team'])]
    private Collection $boosters;

    public function __construct()
    {
        $this->boosters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getManager(): ?User
    {
        return $this->manager;
    }

    public function setManager(?User $manager): static
    {
        $this->manager = $manager;

        return $this;
    }

    public function getCoins(): ?int
    {
        return $this->coins;
    }

    public function setCoins(int $coins): static
    {
        $this->coins = $coins;

        return $this;
    }

    /**
     * @return Collection<int, Booster>
     */
    public function getBoosters(): Collection
    {
        return $this->boosters;
    }

    public function addBooster(?User $booster): static
    {
        if (!$this->boosters->contains($booster)) {
            $this->boosters->add($booster);
            $booster->setTeam($this);
        }

        return $this;
    }

    public function removeBooster(?User $booster): static
    {
        if ($this->boosters->removeElement($booster)) {
            // set the owning side to null (unless already changed)
            if ($booster->getTeam() === $this) {
                $booster->setTeam(null);
            }
        }

        return $this;
    }
}
