<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TripRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TripRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' =>['trip', 'housing', 'travel', 'activity']],
    denormalizationContext: ['groups' => ['trip', 'housing', 'travel', 'activity']])]
class Trip
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['trip'])]
    private ?int $id = null;

    #[Groups(['trip'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $startAt = null;

    #[Groups(['trip'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photo = null;

    #[Groups(['trip'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $endAt = null;

    #[Groups(['trip'])]

    #[ORM\Column(length: 10, nullable: true)]
    private ?float $rating = null;

    #[Groups(['trip'])]
    #[Assert\NotBlank()]
    #[ORM\Column(length: 10)]
    private ?bool $public = null;

    #[Groups(['trip'])]
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'trips',cascade: ['persist'])]
    private Collection $users;


    #[Groups(['trip'])]
    #[ORM\ManyToMany(targetEntity: Housing::class, inversedBy: 'trips',cascade: ['persist'])]
    private Collection $TripHousing;

    #[Groups(['trip'])]
    #[ORM\ManyToMany(targetEntity: Travel::class, inversedBy: 'trips',cascade: ['persist'])]
    private Collection $TripTravel;

    #[Groups(['trip'])]
    #[ORM\ManyToMany(targetEntity: Activity::class, inversedBy: 'trips',cascade: ['persist'])]
    private Collection $TripActivity;

    #[Groups(['trip'])]
    #[Assert\NotBlank()]
    #[Assert\Lenght(min:2,max:150)]
    #[ORM\Column(length: 150)]
    private ?string $name = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->TripHousing = new ArrayCollection();
        $this->TripTravel = new ArrayCollection();
        $this->TripActivity = new ArrayCollection();
    }

    /**
     * @return float|null
     */
    public function getRating(): ?float
    {
        return $this->rating;
    }

    /**
     * @param float|null $rating
     */
    public function setRating(?float $rating): void
    {
        $this->rating = $rating;
    }

    /**
     * @return bool|null
     */
    public function getPublic(): ?bool
    {
        return $this->public;
    }

    /**
     * @param bool|null $public
     */
    public function setPublic(?bool $public): void
    {
        $this->public = $public;
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(?\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->endAt;
    }

    public function setEndAt(?\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addTrip($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeTrip($this);
        }

        return $this;
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

    /**
     * @return Collection<int, Housing>
     */
    public function getTripHousing(): Collection
    {
        return $this->TripHousing;
    }

    public function addTripHousing(Housing $tripHousing): self
    {
        if (!$this->TripHousing->contains($tripHousing)) {
            $this->TripHousing->add($tripHousing);
        }

        return $this;
    }

    public function removeTripHousing(Housing $tripHousing): self
    {
        $this->TripHousing->removeElement($tripHousing);

        return $this;
    }

    /**
     * @return Collection<int, Travel>
     */
    public function getTripTravel(): Collection
    {
        return $this->TripTravel;
    }

    public function addTripTravel(Travel $tripTravel): self
    {
        if (!$this->TripTravel->contains($tripTravel)) {
            $this->TripTravel->add($tripTravel);
        }

        return $this;
    }

    public function removeTripTravel(Travel $tripTravel): self
    {
        $this->TripTravel->removeElement($tripTravel);

        return $this;
    }

    /**
     * @return Collection<int, Activity>
     */
    public function getTripActivity(): Collection
    {
        return $this->TripActivity;
    }

    public function addTripActivity(Activity $tripActivity): self
    {
        if (!$this->TripActivity->contains($tripActivity)) {
            $this->TripActivity->add($tripActivity);
        }

        return $this;
    }

    public function removeTripActivity(Activity $tripActivity): self
    {
        $this->TripActivity->removeElement($tripActivity);

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
}
