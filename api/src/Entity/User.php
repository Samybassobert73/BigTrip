<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['user']])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user'])]
    #[Assert\Email]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[Groups(['user'])]
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column(nullable: false)]
    #[Assert\NotBlank]
    private ?string $password = null;

    #[Groups(['user'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 50, nullable: false)]
    private ?string $firstname = null;

    #[Groups(['user'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 50, nullable: false)]
    private ?string $lastname = null;

    #[Groups(['user'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 12, nullable: true)]
    private ?string $phone = null;

    #[ORM\ManyToMany(targetEntity: Trip::class, inversedBy: 'users')]
    private Collection $trips;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: PayementKind::class)]
    private Collection $PayementUser;

    public function __construct()
    {
        $this->trips = new ArrayCollection();
        $this->PayementUser = new ArrayCollection();
    }

   

   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = ['ROLE_USER'];

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

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
        }

        return $this;
    }

    public function removeTrip(Trip $trip): self
    {
        $this->trips->removeElement($trip);

        return $this;
    }

    /**
     * @return Collection<int, PayementKind>
     */
    public function getPayementUser(): Collection
    {
        return $this->PayementUser;
    }

    public function addPayementUser(PayementKind $payementUser): self
    {
        if (!$this->PayementUser->contains($payementUser)) {
            $this->PayementUser->add($payementUser);
            $payementUser->setUser($this);
        }

        return $this;
    }

    public function removePayementUser(PayementKind $payementUser): self
    {
        if ($this->PayementUser->removeElement($payementUser)) {
            // set the owning side to null (unless already changed)
            if ($payementUser->getUser() === $this) {
                $payementUser->setUser(null);
            }
        }
        return $this;
    }
}
