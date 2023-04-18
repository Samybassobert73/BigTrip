<?php

namespace App\Tests;

use App\Entity\Trip;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class TripTestsTest extends KernelTestCase
{
    public function getEntity() : Trip{
        $trip = new Trip();
        $trip ->setName("test trip entity");
        $trip ->setPublic(true);
        $trip->setPhoto("www.testphoto.com");
        $trip->setRating(5);
        $trip ->setStartAt(new \DateTimeImmutable());
        $trip->setEndAt(new \DateTimeImmutable());
        return $trip;
    }
    public function testTripIsValid(): void
    {
        $kernel = self::bootKernel();

        $this->assertSame('test', $kernel->getEnvironment());
        $container = static::getContainer();
        $trip = $this->getEntity();
        $error = $container->get('validator')->validate($trip);
        $this->assertCount(0,$error);
    }

    /* test cas ou le nom est vide ou null plus on vérifie que la visibilité soit forcement true ou false*/
    public function testInvalidName() {

        $kernel = self::bootKernel();
        $container = static::getContainer();
        $trip = $this->getEntity();
        $trip->setName('');
        $trip->setPublic(null);
        $error = $container->get('validator')->validate($trip);
        $this->assertCount(2,$error);
    }

    /**
     * @throws \Exception

     */
 /*
    public function testTripNote(){

        $kernel = self::bootKernel();
        $container = static::getContainer();
        $trip = $container->get('doctrine.orm.entity_manager')->find(User::class,1);
        $this->assertTrue($trip->getRating() === 3);

    }*/
}
