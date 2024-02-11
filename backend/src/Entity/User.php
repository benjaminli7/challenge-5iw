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
use App\Controller\GetManagerTeamController;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['read-user']], security: 'is_granted("ROLE_ADMIN")', securityMessage: 'Only admins can see all users.'),
        new Get(normalizationContext: ['groups' => ['read-user']], security: 'is_granted("ROLE_ADMIN") or object == user', securityMessage: 'You can only see your own user.'),
        //  new Get(uriTemplate: '/users/{id}/infos', normalizationContext: ['groups' => ['read-user', 'read-user-as-admin']], security: 'is_granted("ROLE_ADMIN")'),
        // new Get(uriTemplate: '/players/{id}', normalizationContext: ['groups' => ['read-player']], security: 'is_granted("PLAYER_READ", object) or is_granted("ROLE_ADMIN")', securityMessage: 'Only players can see their own user.'),
        new Post(denormalizationContext: ['groups' => ['create-user']]),
        new Patch(denormalizationContext: ['groups' => ['update-user']], securityPostDenormalize: 'is_granted("ROLE_ADMIN") or object == user', securityPostDenormalizeMessage: 'You can only edit your own user.'),
        new Get(
            uriTemplate: '/users/{id}/team',
            controller: GetManagerTeamController::class,
            normalizationContext: ['groups' => ['read-team']],
            security: 'is_granted("ROLE_ADMIN") or (object == user)',
            securityMessage: 'You can only see your own team.'
        ),
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
    #[Groups(['read-user', 'update-user'])]
    private ?int $id = null;

    #[Assert\Email()]
    #[Groups(['create-user', 'read-user', 'read-player', 'read-team'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[Assert\Length(min: 3, max: 50)]
    #[ORM\Column(length: 50, unique: true)]
    #[Groups(['create-user', 'read-user', 'read-player', 'read-team'])]
    private ?string $username = null;

    #[ORM\Column]
    #[Groups(['read-user'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['read-user', 'read-player', 'read-team'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $firstName = null;

    #[Groups(['read-user', 'read-player', 'read-team'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lastName = null;

    #[Groups(['create-user', 'update-user'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $plainPassword = null;

    #[ORM\Column(type: 'boolean', options: ['default' => false], nullable: true)]
    #[Groups(['update-user', 'read-client', 'read-user'])]
    private ?bool $isVerified = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $token = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $resetToken = null;

    #[Groups(['read-user', 'read-client', 'read-player'])]
    #[ORM\Column(length: 16, nullable: true)]
    private ?string $phone = null;

    #[Groups(['create-user', 'read-user', 'update-user', 'read-player'])]
    #[ORM\Column(nullable: true)]
    private ?string $type = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read-user'])]
    private ?int $coins = null;

    #[Groups(['read-user', 'create-user', 'update-user', 'read-team', 'read-player'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $discord = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[Groups(['read-user', 'read-player', 'create-player', 'update-player'])]
    private ?Game $assignedGame = null;

    #[ORM\OneToOne(mappedBy: 'manager', cascade: ['persist', 'remove'])]
    #[Groups(['read-user'])]
    private ?Team $ownedTeam = null;

    #[Groups(['read-player'])]
    #[ORM\ManyToOne(inversedBy: 'boosters')]
    private ?Team $team = null;


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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;
        return $this;
    }

    # Client

    public function getCoins(): ?int
    {
        return $this->coins;
    }

    public function setCoins(int $coins): static
    {
        $this->coins = $coins;

        return $this;
    }


    public function getDiscord(): ?string
    {
        return $this->discord;
    }

    public function setDiscord(?string $discord): static
    {
        $this->discord = $discord;

        return $this;
    }

    public function getAssignedGame(): ?Game
    {
        return $this->assignedGame;
    }

    public function setAssignedGame(?Game $assignedGame): static
    {
        $this->assignedGame = $assignedGame;

        return $this;
    }

    public function getOwnedTeam(): ?Team
    {
        return $this->ownedTeam;
    }

    public function setOwnedTeam(?Team $ownedTeam): static
    {
        // unset the owning side of the relation if necessary
        if ($ownedTeam === null && $this->ownedTeam !== null) {
            $this->ownedTeam->setManager(null);
        }

        // set the owning side of the relation if necessary
        if ($ownedTeam !== null && $ownedTeam->getManager() !== $this) {
            $ownedTeam->setManager($this);
        }

        $this->ownedTeam = $ownedTeam;

        return $this;
    }

    public function getTeam(): ?Team
    {
        return $this->team;
    }

    public function setTeam(?Team $team): static
    {
        $this->team = $team;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }
}
