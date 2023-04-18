<?php

namespace App\DataFixtures;

use App\Entity\Activity;
use App\Entity\Housing;
use App\Entity\PayementKind;
use App\Entity\Travel;
use App\Entity\Trip;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

//Pour lancer les fixtures il faut run la commande ci dessous mais attention cela purgera toute la db
//php bin/console doctrine:fixtures:load
class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
      //  $manager->getRepository()

        // creation user
        $password = "password";

        $user = new User();
        $user->setEmail('user@epitech.eu');
        $user->setLastname('userLastname');
        $user->setFirstname('userFirstname');
        $hash = $this->encoder->hashPassword($user, $password);
        $user->setPassword($hash);
        $user->setRoles(['ROLE_USER']);

        $trip = new Trip();
        $trip->setName("TRIP Barcelone");
        $trip->setStartAt(new \DateTime('2023-03-06'));
        $trip->setPhoto("https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80");
        $trip->setEndAt(new \DateTime('2023-03-12'));
        $trip->setRating('3');
        $trip->setPublic(true);

        $trip2 = new Trip();
        $trip2->setName("TRIP Paris");
        $trip2->setPhoto("https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80");
        $trip2->setStartAt(new \DateTime('2023-03-06'));
        $trip2->setEndAt(new \DateTime('2023-03-12'));
        $trip2->setRating('3');
        $trip2->setPublic(false);

        $logement = new Housing();
        $logement->setUrl('https:www.google.com');
        $logement->setName('Hotel de mer');
        $logement->setLongitude("2.333333");
        $logement->setRating(4);
        $logement->setLattitude("48.866667");
        $logement->setType('hotel');
        $logement->setStartAt(new \DateTime('2023-03-06'));
        $logement->setEndAt(new \DateTime('2023-03-12'));
        $logement->setPhoto("https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");

        $fly = new Travel();
        $fly->setUrl('https:www.booking.com/flights/');
        $fly->setLongitude("2.333333");
        $fly->setName("Air France");
        $fly->setLattitude("48.866667");
        $fly->setTravelKind('car');
        $fly->setRating(4);
        $fly->setStartAt(new \DateTime('2023-03-06'));
        $fly->setEndAt(new \DateTime('2023-03-12'));
        $fly->setLattitudeArrival('48.866667');
        $fly->setLongitudeArrival('48.866667');
        $fly->setWaypointLattitudeTwo('12.1564623');
        $fly->setPhoto('https://images.unsplash.com/photo-1580674565491-cdd49b746ceb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80');

        $activity = new Activity();
        $activity->setUrl('http:www.bowlingmouffetard.fr/');
        $activity->setPhoto("https://images.unsplash.com/photo-1617895120763-edd71143f9bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80");
        $activity->setName('Bowling');
        $activity->setRating(2);
        $activity->setType('museum');
        $activity->setLongitude("2.333333");
        $activity->setLattitude("48.866667");
        $activity->setStartAt(new \DateTime('2023-03-06'));
        $activity->setEndAt(new \DateTime('2023-03-12'));

        $activity2 = new Activity();
        $activity2->setPhoto("https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80");
        $activity2->setName('Musée Grevin');
        $activity2->setUrl('http:www.bowlingmouffetard.fr/');
        $activity2->setLongitude("40.714353");
        $activity2->setLattitude("-74.005973");
        $activity2->setRating(5);
        $activity2->setType('museum');
        $activity2->setStartAt(new \DateTime('2023-03-06'));
        $activity2->setEndAt(new \DateTime('2023-03-12'));

        $payement = new PayementKind();


        $user->addPayementUser($payement);
        $trip->addTripHousing($logement);
        $trip->addTripTravel($fly);
        $trip->addTripActivity($activity);
        $user->addTrip($trip);

        $manager->persist($user);
        $manager->persist($payement);
        $manager->persist($trip);
        $manager->persist($trip2);
        $manager->persist($logement);
        $manager->persist($fly);
        $manager->persist($activity);
        $manager->persist($activity2);

        $manager->flush();
    }
}
