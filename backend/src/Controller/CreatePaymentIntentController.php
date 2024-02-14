<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Offer;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CreatePaymentIntentController extends AbstractController
{
    /**
     * @Route("/api/create-payment-intent", name="create_payment_intent", methods={"POST"})
     */
    public function createPaymentIntent(Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $offerId = $content['offerId'];
        $offer = $this->getDoctrine()->getRepository(Offer::class)->find($offerId);

        Stripe::setApiKey('sk_test_51NWhaQBS812DNqMjzJcmdr4REaBckFWW2xit9ix1mMAU2dsWdghjPs68kfEYneKhtpKOKes2vyH8l2Pg6uE54os500NVaIboU9');

        $paymentIntent = PaymentIntent::create([
            'amount' => $offer->getPrice() * 100, // Amount in cents
            'currency' => 'usd',
        ]);


        return $this->json([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }
}
