<?php

namespace App\Entity;

use App\Repository\ScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Controller\GetPlayerScheduleController;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(denormalizationContext: ['groups' => ['write-schedule']], normalizationContext: ['groups' => ['read-schedule-created']]),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['read-schedule']],
)]
#[UniqueEntity(
    fields: ['startingDate', 'endingDate'],
    message: 'This schedule already exists.',
)]
#[ORM\HasLifecycleCallbacks]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-schedule', 'read-player-schedule', 'read-team','read-player', 'read-schedule-created', 'read-client'])]
    private ?int $id = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule', 'read-team', 'read-player', 'read-schedule-created', 'read-client'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, unique: true)]
    private ?\DateTimeInterface $startingDate = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule', 'read-team', 'read-player', 'read-schedule-created', 'read-client'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, unique: true)]
    private ?\DateTimeInterface $endingDate = null;

    #[ORM\OneToOne(mappedBy: 'schedule', cascade: ['persist', 'remove'])]
    private ?Booking $booking = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule', 'read-schedule-created'])]
    #[ORM\ManyToOne(inversedBy: 'schedules')]
    private ?User $booster = null;

    #[Groups(['read-schedule', 'write-schedule', 'read-player-schedule', 'read-team', 'read-player', 'read-schedule-created'])]
    #[ORM\Column(length: 50)]
    private ?string $status = null;

    #[Groups(['read-schedule', 'read-player-schedule', 'read-team', 'read-schedule-created', 'read-client'])]
    #[ORM\Column()]
    private ?int $coinsNeeded = null;

    public function __construct()
    {
        $this->status = "available";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartingDate(): ?\DateTimeInterface
    {
        return $this->startingDate;
    }

    public function setStartingDate(\DateTimeInterface $startingDate): static
    {
        $this->startingDate = $startingDate;

        return $this;
    }

    public function getEndingDate(): ?\DateTimeInterface
    {
        return $this->endingDate;
    }

    public function setEndingDate(\DateTimeInterface $endingDate): static
    {
        $this->endingDate = $endingDate;

        return $this;
    }

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(?Booking $booking): static
    {
        // unset the owning side of the relation if necessary
        if ($booking === null && $this->booking !== null) {
            $this->booking->setSchedule(null);
        }

        // set the owning side of the relation if necessary
        if ($booking !== null && $booking->getSchedule() !== $this) {
            $booking->setSchedule($this);
        }

        $this->booking = $booking;

        return $this;
    }

    public function getBooster(): ?User
    {
        return $this->booster;
    }

    public function setBooster(?User $booster): static
    {
        $this->booster = $booster;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCoinsNeeded(): ?int
    {
        return $this->coinsNeeded;
    }

    public function setCoinsNeeded(int $coinsNeeded): static
    {
        $this->coinsNeeded = $coinsNeeded;

        return $this;
    }

    // Add a new method to calculate coinsNeeded automatically
    public function calculateCoinsNeeded(): void
    {
        // Ensure that booster (User) is set
        if ($this->booster !== null) {
            $tauxHoraire = $this->booster->getTauxHoraire();

            // Ensure that both startingDate and endingDate are set
            if ($this->startingDate !== null && $this->endingDate !== null) {
                $timeDiff = $this->endingDate->diff($this->startingDate);
                $hoursWorked = $timeDiff->h + ($timeDiff->days * 24);

                // Calculate coinsNeeded based on taux_horaire and hours worked
                $this->coinsNeeded = $tauxHoraire * $hoursWorked;
            }
        }
    }

}

