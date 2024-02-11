<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use App\Controller\CreateTeamController;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;

#[ORM\Entity(repositoryClass: TeamRepository::class)]
#[ApiResource(
    operations: [
        // new Post(
        //     uriTemplate: '/teams/new',
        //     controller: CreateTeamController::class,
        //     normalizationContext: ['groups' => ['read-team']],
        //     denormalizationContext: ['groups' => ['create-team']],
        //     securityPostDenormalize: 'is_granted("TEAM_CREATE", object)',
        //     securityPostDenormalizeMessage: 'Only managers or admins can create teams.',
        // ),
        new Post(
            securityPostDenormalize: 'is_granted("TEAM_CREATE", object)',
            securityPostDenormalizeMessage: 'Only managers or admins can create teams.',
            normalizationContext: ['groups' => ['read-team']],
            denormalizationContext: ['groups' => ['create-team']],
        ),
        new Get(normalizationContext: ['groups' => ['read-team']], security: 'is_granted("ROLE_ADMIN") or (object.owner == user)', securityMessage: 'You can only see your own team.'),
        new GetCollection(normalizationContext: ['groups' => ['read-team']], security: 'is_granted("TEAM_READ_ALL", object)', securityMessage: 'Only admins or clients can see all teams.'),
        new Patch(denormalizationContext: ['groups' => ['update-team']], securityPostDenormalize: 'is_granted("ROLE_ADMIN") or (object.owner == user)', securityPostDenormalizeMessage: 'You can only edit your own team.'),
        new Delete(security: 'is_granted("ROLE_ADMIN") or (object.owner == user)', securityMessage: 'You can only delete your own team.'),
    ],
    normalizationContext: ['groups' => ['read-team']],
    denormalizationContext: ['groups' => ['create-team']],
)]

class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-team', 'read-user'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read-team', 'create-team', 'update-team'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['read-team'])]
    private ?int $coins = null;

    #[ORM\Column]
    #[Groups(['read-team'])]
    private ?bool $isApproved = null;

    #[ORM\ManyToOne(inversedBy: 'teams')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-team', 'create-team'])]
    private ?User $manager = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: User::class)]
    #[Groups(['read-team'])]
    private Collection $boosters;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read-team', 'create-team', 'update-team'])]
    private ?string $iban = null;

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

    public function getIsApproved(): ?bool
    {
        return $this->isApproved;
    }

    public function setIsApproved(bool $isApproved): static
    {
        $this->isApproved = $isApproved;

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

    public function getIban(): ?string
    {
        return $this->iban;
    }

    public function setIban(?string $iban): static
    {
        $this->iban = $iban;

        return $this;
    }
}