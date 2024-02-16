<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Payment;
use App\Entity\User;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;

class PaymentConfirmationController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request): RedirectResponse
    {
        $sessionId = $request->query->get('session_id');
        $stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        Stripe::setApiKey($stripeSecretKey);

        try {
            $session = StripeSession::retrieve($sessionId);

            /** @var Payment $payment */
            $payment = $this->entityManager->getRepository(Payment::class)->findOneBy(['stripeSessionId' => $sessionId]);

            if (!$payment) {
                throw new \Exception('Payment not found.');
            }

            $payment->setStatus('completed');
            $user = $payment->getUser();
            $user->setCoins($user->getCoins() + $payment->getOffer()->getCoins());
            $this->entityManager->flush();

            return new RedirectResponse($_ENV['LINK'].'/client/purchase');
        } catch (\Exception $e) {
            return new Response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
