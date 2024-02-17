<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\Offer;
use App\Entity\Payment;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use function PHPUnit\Framework\returnArgument;

class CreatePaymentIntentController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $userId = $this->getIdFromIri($data['user']);
        $offerId = $this->getIdFromIri($data['offer']);

        $user = $this->entityManager->getRepository(User::class)->find($userId);
        $offer = $this->entityManager->getRepository(Offer::class)->find($offerId);

        if (!$user || !$offer) {
            return new JsonResponse(['error' => 'User or Offer not found.'], 400);
        }

        $payment = new Payment();
        $payment->setUser($user);
        $payment->setOffer($offer);
        $payment->setAmount($data['amount']);
        $payment->setStatus('pending');
        $payment->setPaymentDate(new \DateTime());

        $this->entityManager->persist($payment);
        $this->entityManager->flush();

        Stripe::setApiKey('sk_test_51NWhaQBS812DNqMjzJcmdr4REaBckFWW2xit9ix1mMAU2dsWdghjPs68kfEYneKhtpKOKes2vyH8l2Pg6uE54os500NVaIboU9');

        $frontUrl = $this->getParameter('FRONT_URL');

        try {
            $checkoutSession = StripeSession::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $offer->getName(),
                        ],
                        'unit_amount' => $offer->getPrice() * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => $frontUrl.'/client/purchase?session_id={CHECKOUT_SESSION_ID}&paymentResult=success',
                'cancel_url' => $frontUrl.'/client/purchase?paymentResult=cancel',
                'metadata' => ['payment_id' => $payment->getId()],
            ]);
            if ($checkoutSession->id) {
                error_log('Stripe session created successfully: ' . $checkoutSession->id);
            } else {
                error_log('Error creating Stripe session: ' . $checkoutSession->error->message);
                return new JsonResponse(['error' => 'Error creating Stripe session: ' . $checkoutSession->error->message], 500);
            }
            $payment->setStripeSessionId($checkoutSession->id);
            $this->entityManager->flush();
            return new JsonResponse([
                'sessionId' => $checkoutSession->id,
                'paymentId' => $payment->getId(),
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Stripe Error: ' . $e->getMessage()], 500);
        }
    }
    private function getIdFromIri(string $iri): ?int
    {
        if (preg_match('/^\/api\/[a-z]+\/(\d+)$/', $iri, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    public function handlePaymentSuccess(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $userId = $data['userId'];
        $offerId = $data['offerId'];
        $paymentId = $data['paymentId'];

        $user = $this->entityManager->getRepository(User::class)->find($userId);
        $offer = $this->entityManager->getRepository(Offer::class)->find($offerId);
        $payment = $this->entityManager->getRepository(Payment::class)->find($paymentId);

        if (!$user || !$offer || !$payment) {
            return new JsonResponse(['error' => 'User, Offer, or Payment not found.'], 400);
        }

        $user->setCoins($user->getCoins() + $offer->getCoins());

        $payment->setStatus('completed');

        $this->entityManager->flush();

        return new JsonResponse(['success' => true]);
    }

}