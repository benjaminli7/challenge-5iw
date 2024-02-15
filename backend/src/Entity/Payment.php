<?php

namespace App\Entity;

use AllowDynamicProperties;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\CreatePaymentIntentController;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[AllowDynamicProperties] #[ORM\Entity]
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/payments/create-session',
            controller: CreatePaymentIntentController::class,
            openapiContext: [
                'summary' => 'Crée une session de paiement Stripe',
                'description' => 'Crée une nouvelle session de paiement Stripe.',
            ]
        ),
    ]
)]class Payment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Offer::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Offer $offer;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private float $amount;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'string', length: 255)]
    private string $status;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $paymentDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $stripeSessionId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getOffer(): Offer
    {
        return $this->offer;
    }

    public function setOffer(Offer $offer): self
    {
        $this->offer = $offer;
        return $this;
    }

    public function getAmount(): float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getPaymentDate(): \DateTimeInterface
    {
        return $this->paymentDate;
    }

    public function setPaymentDate(\DateTimeInterface $paymentDate): self
    {
        $this->paymentDate = $paymentDate;
        return $this;
    }
    public function getStripeSessionId(): ?string
    {
        return $this->stripeSessionId;
    }

    public function setStripeSessionId(?string $stripeSessionId): self
    {
        $this->stripeSessionId = $stripeSessionId;
        return $this;
    }
}
