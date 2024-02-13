<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\AddPlayerTeamController;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use App\Controller\PostImageTeamController;
use App\Entity\Traits\TimestampableTrait;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use App\Controller\ApproveTeamController;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: TeamRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            // securityPostDenormalize: 'is_granted("TEAM_CREATE", object)',
            // securityPostDenormalizeMessage: 'Only managers or admins can create teams.',
            normalizationContext: ['groups' => ['read-team']],
            denormalizationContext: ['groups' => ['create-team']],
        ),
        new Get(normalizationContext: ['groups' => ['read-team']], security: 'is_granted("ROLE_ADMIN") or (object.getManager() == user)', securityMessage: 'You can only see your own team.'),
        new GetCollection(normalizationContext: ['groups' => ['read-team']]),
        new Patch(denormalizationContext: ['groups' => ['update-team']], securityPostDenormalize: 'is_granted("ROLE_ADMIN") or (object.getManager() == user)', securityPostDenormalizeMessage: 'You can only edit your own team.'),
        new Delete(security: 'is_granted("ROLE_ADMIN") or (object.getManager() == user)', securityMessage: 'You can only delete your own team.'),

        new Post(
            uriTemplate: '/teams/{id}/players',
            controller: AddPlayerTeamController::class,
            denormalizationContext: ['groups' => ['create-player']],
            securityPostDenormalize: 'is_granted("ROLE_ADMIN") or (object.getManager() == user)',
            securityPostDenormalizeMessage: 'You can only add boosters to your own team.',
        ),
        new Post(
            uriTemplate: '/teams/{id}/image',
            controller: PostImageTeamController::class,
            denormalizationContext: ['groups' => ['team-img']],
            normalizationContext: ['groups' => ['read-team']],
            security: 'is_granted("ROLE_ADMIN") or (object.getManager() == user)',
            securityMessage: 'Only admins can create teams images.',
            deserialize: false
        ),
        new Post(
            uriTemplate: '/teams/{id}/approve',
            controller: ApproveTeamController::class,
            securityPostDenormalize: 'is_granted("ROLE_ADMIN")',
            securityPostDenormalizeMessage: 'Only admins can approve teams',
            denormalizationContext: ['groups' => ['approve-team']]
        )
    ],
    normalizationContext: ['groups' => ['read-team']],
    denormalizationContext: ['groups' => ['create-team']],
)]
#[ApiFilter(BooleanFilter::class, properties: ['isApproved'])]
#[UniqueEntity(
    fields: ['manager'],
    message: 'You already have a team.',
)]
class Team
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-team', 'read-user', 'read-player'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['read-team', 'create-team', 'update-team', 'read-user', 'read-player'])]
    private ?string $name = null;

    #[ORM\Column(
        type: 'integer',
        options: ['default' => 0],
    )]
    #[Groups(['read-team'])]
    private ?int $coins = null;

    #[ORM\Column(
        type: 'boolean',
        options: ['default' => false],
    )]
    #[Groups(['read-team', 'approve-team', 'read-player'])]
    private ?bool $isApproved = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read-team', 'create-team', 'update-team'])]
    private ?string $iban = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[Groups(['read-team'])]
    private ?string $fileUrl = null;

    #[Vich\UploadableField(mapping: 'team_image', fileNameProperty: 'filePath')]
    #[Groups(['team-img', 'create-team'])]
    private ?File $file = null;


    #[ORM\OneToOne(inversedBy: 'ownedTeam', cascade: ['persist', 'remove'])]
    #[Groups(['read-team', 'create-team'])]
    public ?User $manager = null;

    #[ORM\OneToMany(mappedBy: 'team', targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[Groups(['read-team'])]
    private Collection $boosters;

    public function __construct()
    {
        $this->coins = 0;
        $this->isApproved = false;
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

    // public function getManager(): ?User
    // {
    //     return $this->manager;
    // }

    // public function setManager(?User $manager): static
    // {
    //     $this->manager = $manager;

    //     return $this;
    // }

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

    public function getIban(): ?string
    {
        return $this->iban;
    }

    public function setIban(?string $iban): static
    {
        $this->iban = $iban;

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

    /**
     * @return Collection<int, User>
     */
    public function getBoosters(): Collection
    {
        return $this->boosters;
    }

    public function addBooster(User $booster): static
    {
        if (!$this->boosters->contains($booster)) {
            $this->boosters->add($booster);
            $booster->setTeam($this);
        }

        return $this;
    }

    public function removeBooster(User $booster): static
    {
        if ($this->boosters->removeElement($booster)) {
            // set the owning side to null (unless already changed)
            if ($booster->getTeam() === $this) {
                $booster->setTeam(null);
            }
        }

        return $this;
    }
<<<<<<< HEAD

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file = null): static
    {
        $this->file = $file;
        return $this;
    }

    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(?string $fileUrl): static
    {

        $this->fileUrl = $fileUrl;

        return $this;
    }
}
=======
}
>>>>>>> feature/email2
