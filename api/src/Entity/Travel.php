<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TravelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TravelRepository::class)]

#[ApiResource(
    normalizationContext: ['groups' => ['travel']],
    denormalizationContext: ['groups' => ['travel']]
)]


class Travel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;


    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photo = null;


    #[Groups(['travel'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startAt = null;

    #[Groups(['travel'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endAt = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $lattitude = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $longitude = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $travelKind = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 10, nullable: true)]
    private ?int $rating = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $lattitudeArrival = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255)]
    private ?string $longitudeArrival = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $waypointLattitudeOne = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $waypointLongitudeOne = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $waypointLattitudeTwo = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $waypointLongitudeTwo = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $waypointLattitudeThree = null;

    #[Groups(['travel'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $waypointLongitudeThree = null;

    #[ORM\ManyToMany(targetEntity: Trip::class, mappedBy: 'TripTravel',cascade: ['persist'] )]
    private Collection $trips;

    public function __construct()
    {
        $this->trips = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string|null
     */
    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    /**
     * @param string|null $photo
     */
    public function setPhoto(?string $photo): void
    {
        $this->photo = $photo;
    }


    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->endAt;
    }

    public function setEndAt(\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getLattitude(): ?string
    {
        return $this->lattitude;
    }

    public function setLattitude(string $lattitude): self
    {
        $this->lattitude = $lattitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection<int, Trip>
     */
    public function getTrips(): Collection
    {
        return $this->trips;
    }

    public function addTrip(Trip $trip): self
    {
        if (!$this->trips->contains($trip)) {
            $this->trips->add($trip);
            $trip->addTripTravel($this);
        }

        return $this;
    }

    public function removeTrip(Trip $trip): self
    {
        if ($this->trips->removeElement($trip)) {
            $trip->removeTripTravel($this);
        }
        return $this;
    }

    public function getTravelKind(): ?string
    {
        return $this->travelKind;
    }

    public function setTravelKind(string $travelKind): self
    {
        $this->travelKind = $travelKind;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getLattitudeArrival(): ?string
    {
        return $this->lattitudeArrival;
    }

    public function setLattitudeArrival(string $lattitudeArrival): self
    {
        $this->lattitudeArrival = $lattitudeArrival;

        return $this;
    }

    public function getLongitudeArrival(): ?string
    {
        return $this->longitudeArrival;
    }

    public function setLongitudeArrival(string $longitudeArrival): self
    {
        $this->longitudeArrival = $longitudeArrival;

        return $this;
    }

    public function getWaypointLattitudeOne(): ?string
    {
        return $this->waypointLattitudeOne;
    }

    public function setWaypointLattitudeOne(?string $waypointLattitudeOne): self
    {
        $this->waypointLattitudeOne = $waypointLattitudeOne;

        return $this;
    }

    public function getWaypointLongitudeOne(): ?string
    {
        return $this->waypointLongitudeOne;
    }

    public function setWaypointLongitudeOne(?string $waypointLongitudeOne): self
    {
        $this->waypointLongitudeOne = $waypointLongitudeOne;

        return $this;
    }

    public function getWaypointLattitudeTwo(): ?string
    {
        return $this->waypointLattitudeTwo;
    }

    public function setWaypointLattitudeTwo(string $waypointLattitudeTwo): self
    {
        $this->waypointLattitudeTwo = $waypointLattitudeTwo;

        return $this;
    }

    public function getWaypointLongitudeTwo(): ?string
    {
        return $this->waypointLongitudeTwo;
    }

    public function setWaypointLongitudeTwo(?string $waypointLongitudeTwo): self
    {
        $this->waypointLongitudeTwo = $waypointLongitudeTwo;

        return $this;
    }

    public function getWaypointLattitudeThree(): ?string
    {
        return $this->waypointLattitudeThree;
    }

    public function setWaypointLattitudeThree(?string $waypointLattitudeThree): self
    {
        $this->waypointLattitudeThree = $waypointLattitudeThree;

        return $this;
    }

    public function getWaypointLongitudeThree(): ?string
    {
        return $this->waypointLongitudeThree;
    }

    public function setWaypointLongitudeThree(?string $waypointLongitudeThree): self
    {
        $this->waypointLongitudeThree = $waypointLongitudeThree;

        return $this;
    }
}
