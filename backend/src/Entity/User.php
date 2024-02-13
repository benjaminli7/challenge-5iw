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
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\GetManagerTeamController;
use App\Controller\PostImageUserController;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use App\Controller\GetPlayerScheduleController;
use App\Controller\GetPlayersListController;

#[Vich\Uploadable]
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
        new Delete(security: 'is_granted("ROLE_ADMIN") or (object.ownedTeam.manager == user)', securityMessage: 'You can only delete your own user.'),
        new Post(
            uriTemplate: '/users/{id}/image',
            controller: PostImageUserController::class,
            denormalizationContext: ['groups' => ['user-img']],
            normalizationContext: ['groups' => ['read-user']],
            security: 'is_granted("ROLE_ADMIN") or (object.getTeam().manager == user)',
            securityMessage: 'Only admins can create games images.',
            deserialize: false
        ),
        new Get(uriTemplate: '/player/{id}/schedules', normalizationContext: ['groups' => ['read-player-schedule']], controller: GetPlayerScheduleController::class, security: 'is_granted("ROLE_ADMIN") or (object == user) or (object.getTeam().manager == user)', securityMessage: 'You can only see your own schedules.'),
        new GetCollection(uriTemplate: '/players', controller: GetPlayersListController::class, normalizationContext: ['groups' => ['read-player']])
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
    #[Groups(['read-user', 'update-user', 'read-team'])]
    private ?int $id = null;

    #[Assert\Email()]
    #[Groups(['create-user', 'read-user', 'read-player', 'read-team'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[Assert\Length(min: 3, max: 50)]
    #[ORM\Column(length: 50, unique: true)]
    #[Groups(['create-user', 'read-user', 'read-player', 'read-team', 'read-schedule', 'read-player-schedule'])]
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
    #[Groups(['read-user', 'read-player', 'update-user', 'create-player', 'update-player', 'read-team'])]
    private ?Game $assignedGame = null;

    #[ORM\OneToOne(mappedBy: 'manager', cascade: ['persist', 'remove'])]
    #[Groups(['read-user'])]
    private ?Team $ownedTeam = null;

    #[Groups(['read-player'])]
    #[ORM\ManyToOne(inversedBy: 'boosters')]
    private ?Team $team = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[Groups(['read-team', 'read-player', 'read-user'])]
    private ?string $fileUrl = null;

    #[Vich\UploadableField(mapping: 'user_image', fileNameProperty: 'filePath')]
    #[Groups(['user-img', 'create-user'])]
    private ?File $file = null;


    #[Groups(['create-user', 'read-user', 'update-user', 'read-player', 'read-team'])]
    #[ORM\Column]
    private ?string $postal = null;

    #[Groups(['create-user', 'read-user', 'update-user', 'read-player', 'read-team'])]
    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[Groups(['create-user', 'read-user', 'update-user', 'read-player', 'read-team'])]
    #[ORM\Column(nullable: true)]
    private ?int $taux_horaire = null;

    #[ORM\Column]
    #[Groups(['create-user', 'read-user', 'update-user', 'read-player', 'read-team'])]
    private ?int $coin_generated = 0;

    // les réservations du client
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Booking::class)]
    private Collection $bookings;

    // les disponibilités du booster
    #[Groups(['read-schedule', 'read-team'])]
    #[ORM\OneToMany(mappedBy: 'booster', targetEntity: Schedule::class)]
    private Collection $schedules;

    public function __construct()
    {
        $this->coins = 0;
        $this->bookings = new ArrayCollection();
        $this->schedules = new ArrayCollection();
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

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setClient($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getClient() === $this) {
                $booking->setClient(null);
            }
        }
        return $this;
    }

    public function getPostal(): ?int
    {
        return $this->postal;
    }

    public function setPostal(int $postal): static
    {
        $this->postal = $postal;
        return $this;
    }
    /**
     * @return Collection<int, Schedule>
     */
    public function getSchedules(): Collection
    {
        return $this->schedules;
    }

    public function addSchedule(Schedule $schedule): static
    {
        if (!$this->schedules->contains($schedule)) {
            $this->schedules->add($schedule);
            $schedule->setBooster($this);
        }
        return $this;
    }

    public function getaddress(): ?string
    {
        return $this->address;
    }

    public function setaddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getTauxHoraire(): ?float
    {
        return $this->taux_horaire;
    }

    public function setTauxHoraire(?float $taux_horaire): static
    {
        $this->taux_horaire = $taux_horaire;

        return $this;
    }

    public function getCoinGenerated(): ?int
    {
        return $this->coin_generated;
    }

    public function setCoinGenerated(int $coin_generated): static
    {
        $this->coin_generated += $coin_generated;
        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getBooster() === $this) {
                $schedule->setBooster(null);
            }
        }
        return $this;
    }
}
