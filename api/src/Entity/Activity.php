<?php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ActivityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: ActivityRepository::class)]

#[ApiResource(
    normalizationContext: ['groups' => ['activity']],
     denormalizationContext: ['groups' => ['activity']]
)]


class Activity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[Groups(['activity'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startAt = null;

    #[Groups(['activity'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endAt = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 255)]
    private ?string $lattitude = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 255)]
    private ?string $longitude = null;

    #[ORM\ManyToMany(targetEntity: Trip::class, mappedBy: 'TripActivity',cascade: ['persist'])]
    private Collection $trips;

    #[Groups(['activity'])]
    #[ORM\Column(length: 10, nullable: true)]
    private ?int $rating = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 255)]
    private ?string $photo = null;

    #[Groups(['activity'])]
    #[ORM\Column(length: 255)]
    private ?string $type = null;

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
            $trip->addTripActivity($this);
        }

        return $this;
    }

    public function removeTrip(Trip $trip): self
    {
        if ($this->trips->removeElement($trip)) {
            $trip->removeTripActivity($this);
        }

        return $this;
    }

    public function getRating(): ?string
    {
        return $this->rating;
    }

    public function setRating(?string $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }
}
