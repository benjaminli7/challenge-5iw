<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Controller\PostImageGameController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints\Regex;




use ApiPlatform\Metadata\Delete;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: GameRepository::class)]
#[ApiResource(
    operations: [
        // 'image' => [
        //     'method' => 'POST',
        //     'path' => '/games/{id}/image',
        //     'controller' => PostImageController::class,
        // ],
        new Post(
            uriTemplate: '/games/{id}/image',
            controller: PostImageGameController::class,
            denormalizationContext: ['groups' => ['test-img']],
            normalizationContext: ['groups' => ['read-game']],
            security: 'is_granted("ROLE_ADMIN")',
            securityMessage: 'Only admins can create games.',
            deserialize: false
        ),
        new GetCollection(normalizationContext: ['groups' => ['read-game']]),
        new Get(normalizationContext: ['groups' => ['read-game']]),
        new Post(denormalizationContext: ['groups' => ['create-game']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can create games.'),
        new Patch(denormalizationContext: ['groups' => ['update-game']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can update games.'),
        new Delete(security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can delete games.'),
    ],
    normalizationContext: ['groups' => ['read-game', 'read-game-mutation', 'read-one-game']],
)]
class Game
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-game', 'update-rank', 'read-team'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['read-game', 'create-game', 'update-game', 'read-team'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'game', targetEntity: Rank::class, cascade: ['persist', 'remove'])]
    #[Groups(['read-game', 'create-game'])]
    private Collection $ranks;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[Groups(['read-game'])]
    private ?string $fileUrl = null;

    #[Vich\UploadableField(mapping: 'game_image', fileNameProperty: 'filePath')]
    #[Groups(['test-img', 'create-game'])]
    private ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read-game', 'create-game', 'update-game'])]
    #[Assert\Regex(pattern: '/^#[a-f0-9]{6}$/i', message: 'The color must be a valid hex color')]
    private ?string $color = null;

    #[ORM\OneToMany(mappedBy: 'assignedGame', targetEntity: User::class)]
    private Collection $users;





    public function __construct()
    {
        $this->ranks = new ArrayCollection();
        $this->users = new ArrayCollection();
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

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setAssignedGame($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getAssignedGame() === $this) {
                $user->setAssignedGame(null);
            }
        }

        return $this;
    }

    
}
