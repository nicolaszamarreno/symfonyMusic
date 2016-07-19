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
     * @ORM\Column(name="date_creat", type="date", nullable=true)
     */
    private $dateCreat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_out", type="date", nullable=true)
     */
    private $dateOut;

    /**
     * @var string
     *
     * @ORM\Column(name="genre", type="string", length=255)
     */
    private $genre;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

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
     * @ORM\Column(name="nb_music", type="integer", nullable=true)
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
     * Set dateCreat
     *
     * @param \DateTime $dateCreat
     *
     * @return Playlist
     */
    public function setDateCreat($dateCreat)
    {
        $this->dateCreat = $dateCreat;

        return $this;
    }

    /**
     * Get dateCreat
     *
     * @return \DateTime
     */
    public function getDateCreat()
    {
        return $this->dateCreat;
    }

    /**
     * Set dateOut
     *
     * @param \DateTime $dateOut
     *
     * @return Playlist
     */
    public function setDateOut($dateOut)
    {
        $this->dateOut = $dateOut;

        return $this;
    }

    /**
     * Get dateOut
     *
     * @return \DateTime
     */
    public function getDateOut()
    {
        return $this->dateOut;
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
     * Set title
     *
     * @param string $title
     *
     * @return Playlist
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
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
     * @return integer
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
     * @return integer
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
     * @return integer
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
     * @return boolean
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
     * @return integer
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
