<?php

namespace AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Playlist
 *
 * @ORM\Table(name="playlist")
 * @ORM\Entity(repositoryClass="AdminBundle\Repository\PlaylistRepository")
 */
class Playlist
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_creation", type="date", unique=true)
     */
    private $dateCreation;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_expiration", type="date")
     */
    private $dateExpiration;

    /**
     * @var string
     *
     * @ORM\Column(name="genre", type="string", length=255)
     */
    private $genre;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255)
     */
    private $titre;

    /**
     * @var int
     *
     * @ORM\Column(name="nb_like", type="integer", nullable=true)
     */
    private $nbLike;

    /**
     * @var int
     *
     * @ORM\Column(name="nb_follow", type="integer", nullable=true)
     */
    private $nbFollow;

    /**
     * @var int
     *
     * @ORM\Column(name="nb_music", type="integer")
     */
    private $nbMusic;

    /**
     * @var bool
     *
     * @ORM\Column(name="statut", type="boolean")
     */
    private $statut;

    /**
     * @var int
     *
     * @ORM\Column(name="nb_listen", type="integer", nullable=true)
     */
    private $nbListen;

    /**
     *
     * @ORM\OneToOne(targetEntity="UserBundle\Entity\Image", cascade={"persist"}))
     * @ORM\JoinColumn(name="image_playlist", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     *
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", nullable=false, referencedColumnName="id")
     */
    private $author;



    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set dateCreation
     *
     * @param \DateTime $dateCreation
     *
     * @return Playlist
     */
    public function setDateCreation($dateCreation)
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    /**
     * Get dateCreation
     *
     * @return \DateTime
     */
    public function getDateCreation()
    {
        return $this->dateCreation;
    }

    /**
     * Set dateExpiration
     *
     * @param \DateTime $dateExpiration
     *
     * @return Playlist
     */
    public function setDateExpiration($dateExpiration)
    {
        $this->dateExpiration = $dateExpiration;

        return $this;
    }

    /**
     * Get dateExpiration
     *
     * @return \DateTime
     */
    public function getDateExpiration()
    {
        return $this->dateExpiration;
    }

    /**
     * Set genre
     *
     * @param string $genre
     *
     * @return Playlist
     */
    public function setGenre($genre)
    {
        $this->genre = $genre;

        return $this;
    }

    /**
     * Get genre
     *
     * @return string
     */
    public function getGenre()
    {
        return $this->genre;
    }

    /**
     * Set titre
     *
     * @param string $titre
     *
     * @return Playlist
     */
    public function setTitre($titre)
    {
        $this->titre = $titre;

        return $this;
    }

    /**
     * Get titre
     *
     * @return string
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Set nbLike
     *
     * @param integer $nbLike
     *
     * @return Playlist
     */
    public function setNbLike($nbLike)
    {
        $this->nbLike = $nbLike;

        return $this;
    }

    /**
     * Get nbLike
     *
     * @return int
     */
    public function getNbLike()
    {
        return $this->nbLike;
    }

    /**
     * Set nbFollow
     *
     * @param integer $nbFollow
     *
     * @return Playlist
     */
    public function setNbFollow($nbFollow)
    {
        $this->nbFollow = $nbFollow;

        return $this;
    }

    /**
     * Get nbFollow
     *
     * @return int
     */
    public function getNbFollow()
    {
        return $this->nbFollow;
    }

    /**
     * Set nbMusic
     *
     * @param integer $nbMusic
     *
     * @return Playlist
     */
    public function setNbMusic($nbMusic)
    {
        $this->nbMusic = $nbMusic;

        return $this;
    }

    /**
     * Get nbMusic
     *
     * @return int
     */
    public function getNbMusic()
    {
        return $this->nbMusic;
    }

    /**
     * Set statut
     *
     * @param boolean $statut
     *
     * @return Playlist
     */
    public function setStatut($statut)
    {
        $this->statut = $statut;

        return $this;
    }

    /**
     * Get statut
     *
     * @return bool
     */
    public function getStatut()
    {
        return $this->statut;
    }

    /**
     * Set nbListen
     *
     * @param integer $nbListen
     *
     * @return Playlist
     */
    public function setNbListen($nbListen)
    {
        $this->nbListen = $nbListen;

        return $this;
    }

    /**
     * Get nbListen
     *
     * @return int
     */
    public function getNbListen()
    {
        return $this->nbListen;
    }

    /**
     * Set image
     *
     * @param \UserBundle\Entity\Image $image
     *
     * @return Playlist
     */
    public function setImage(\UserBundle\Entity\Image $image = null)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return \UserBundle\Entity\Image
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set author
     *
     * @param \UserBundle\Entity\User $author
     *
     * @return Playlist
     */
    public function setAuthor(\UserBundle\Entity\User $author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return \UserBundle\Entity\User
     */
    public function getAuthor()
    {
        return $this->author;
    }
}
