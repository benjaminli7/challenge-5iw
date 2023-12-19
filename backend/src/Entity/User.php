<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\InheritanceType("SINGLE_TABLE")]
#[ORM\DiscriminatorColumn(name: "user_type", type: "string")]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['read-user']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can see all users.'),
        new Get(normalizationContext: ['groups' => ['read-user']], security: 'is_granted("ROLE_ADMIN") or object == user', securityMessage: 'You can only see your own user.'),
        //        new Get(uriTemplate: '/users/{id}/infos', normalizationContext: ['groups' => ['read-user', 'read-user-as-admin']], security: 'is_granted("ROLE_ADMIN")'),
        new Post(denormalizationContext: ['groups' => ['create-user']]),
        new Patch(denormalizationContext: ['groups' => ['update-user']], securityPostDenormalize: 'is_granted("ROLE_ADMIN") or object == user', securityPostDenormalizeMessage: 'You can only edit your own user.' ),
        new Patch(uriTemplate: '/users/{id}/firstConnection', denormalizationContext: ['groups' => ['update-user-connection']], security: 'is_granted("ROLE_ADMIN") or object == user', securityMessage: 'You can only edit your own user.')
    ],
    normalizationContext: ['groups' => ['read-user']],
)]
#[UniqueEntity(['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{

    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-user'])]
    private ?int $id = null;

    #[Assert\Email()]
    #[Groups(['create-user','read-user'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['read-user'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['create-user', 'read-user', 'update-user'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Please enter a first name')]
    #[Assert\Length(
        min: 2,
        max: 30,
        minMessage: 'Your first name must be at least 2 characters long',
        maxMessage: 'Your first name cannot be longer than 30 characters'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-ZÀ-ÿ\s-]+$/',
        message: 'Your first name must contain only letters, spaces, or dashes'
    )]
    private ?string $firstName = null;

    #[Groups(['create-user', 'read-user', 'update-user'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Please enter a last name')]
    #[Assert\Length(
        min: 2,
        max: 30,
        minMessage: 'Your last name must be at least 2 characters long',
        maxMessage: 'Your last name cannot be longer than 30 characters'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-ZÀ-ÿ\s-]+$/',
        message: 'Your last name must contain only letters, spaces, or dashes'
    )]
    private ?string $lastName = null;

    #[Groups(['create-user', 'update-user'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $plainPassword = null;

    #[ORM\Column(type: 'boolean', nullable: true, options: ['default' => false])]
    private ?bool $isVerified = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $token = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $resetToken = null;

    #[Assert\Regex(
        pattern: '/^0[1-9](?:[\s.-]?[0-9]{2}){4}$/',
        message: 'Please enter a valid French phone number'
    )]
    #[Groups(['read-user', 'update-user'])]
    #[ORM\Column(length: 16, nullable: true)]
    private ?string $phone = null;

    #[ORM\OneToMany(mappedBy: 'manager', targetEntity: Team::class)]
    private Collection $teams;

    #[Groups(['create-user', 'read-user', 'update-user', 'update-user-connection'])]
    #[ORM\Column(options: ['default' => true])]
    private ?bool $isFirstConnection = null;

    public function __construct()
    {
        $this->teams = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): static
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function isIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getResetToken(): ?string
    {
        return $this->resetToken;
    }

    public function setResetToken(?string $resetToken): static
    {
        $this->resetToken = $resetToken;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection<int, Team>
     */
    public function getTeams(): Collection
    {
        return $this->teams;
    }

    public function addTeam(Team $team): static
    {
        if (!$this->teams->contains($team)) {
            $this->teams->add($team);
            $team->setManager($this);
        }

        return $this;
    }

    public function removeTeam(Team $team): static
    {
        if ($this->teams->removeElement($team)) {
            // set the owning side to null (unless already changed)
            if ($team->getManager() === $this) {
                $team->setManager(null);
            }
        }

        return $this;
    }

    public function isIsFirstConnection(): ?bool
    {
        return $this->isFirstConnection;
    }

    public function setIsFirstConnection(bool $isFirstConnection): static
    {
        $this->isFirstConnection = $isFirstConnection;

        return $this;
    }

    // public function getCreatedAt(): ?DateTimeInterface
    // {
    //     return $this->createdAt;
    // }

}
