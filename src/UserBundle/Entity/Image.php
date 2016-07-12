<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints\File;
use Doctrine\Common\Collections\ArrayCollection;



/**
 * Image
 *
 * @ORM\Entity()
 * @ORM\Table(name="image")
 * @ORM\HasLifecycleCallbacks
 */
class Image
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(name="url", type="string", length=255,nullable=true)
     */
    public $url;

    /**
     * @ORM\Column(name="alt", type="string", length=255,nullable=true)
     */
    public $alt;

    /**
     * Image file
     *
     * @var File
     *
     * @Assert\File(
     *     maxSize = "5M",
     *     mimeTypes = {"image/jpeg", "image/gif", "image/png", "image/tiff","image/jpg"},
     *     maxSizeMessage = "The maxmimum allowed file size is 5MB.",
     *     mimeTypesMessage = "Only the filetypes image are allowed."
     * )
     * @ORM\Column(nullable=true)
     */
    public $file;


    /**
     * @return mixed
     */
    public function getTempFilename()
    {
        return $this->tempFilename;
    }

    /**
     * @param mixed $tempFilename
     */
    public function setTempFilename($tempFilename)
    {
        $this->tempFilename = $tempFilename;
    }

    /**
     * @ORM\Column(name="size", type="string", length=255)
     */
    public $size;

    /**
     * @ORM\Column(name="type", type="string", length=255)
     */
    public $type;

    // On ajoute cet attribut pour y stocker le nom du fichier temporairement
    public $tempFilename;



    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Transform to string
     *
     * @return string
     */
    public function __toString()
    {
        return (string) $this->getId();
    }



    // Getters et setters
    public function getFile()
    {
        return $this->file;
    }

    // On modifie le setter de File, pour prendre en compte l'upload d'un fichier lorsqu'il en existe d�j� un autre
    public function setFile(UploadedFile $file)
    {
        $this->file = $file;
        // On v�rifie si on avait d�j� un fichier pour cette entit�
        if (null !== $this->url) {
            // On sauvegarde l'extension du fichier pour le supprimer plus tard
            $this->tempFilename = $this->url;

            // On r�initialise les valeurs des attributs url et alt
            $this->url = null;
            $this->alt = null;
            $this->size = null;
            $this->type = null;
        }
    }
    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function preUpload()
    {
        // Si jamais il n'y a pas de fichier (champ facultatif)
        if (null === $this->file) {
            return;
        }

        // Le nom du fichier est son id, on doit juste stocker �galement son extension
        // Pour faire propre, on devrait renommer cet attribut en � extension �, plut�t que � url �
        $this->url = $this->file->guessExtension();
        // Et on g�n�re l'attribut alt de la balise <img>, � la valeur du nom du fichier sur le PC de l'internaute
        $this->alt = $this->file->getClientOriginalName();
        $this->size = $this->file->getClientSize();
        $this->type = $this->file->getClientMimeType();
    }


    public function upload()
    {
        // Si jamais il n'y a pas de fichier (champ facultatif)
        if (null === $this->file) {
            return;
        }

        // Si on avait un ancien fichier, on le supprime
        if (null !== $this->tempFilename) {
            $oldFile = $this->getUploadRootDir().'/'.$this->id.'.'.$this->tempFilename;
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
        }

        // On d�place le fichier envoy� dans le r�pertoire de notre choix
        $this->file->move(
            $this->getUploadRootDir(), // Le r�pertoire de destination
            $this->id.$this->alt  // Le nom du fichier � cr�er, ici � id.extension �
        );
    }


    public function preRemoveUpload()
    {
        // On sauvegarde temporairement le nom du fichier, car il d�pend de l'id
        $this->tempFilename = $this->getUploadRootDir().'/'.$this->id.$this->alt;
    }


    public function removeUpload()
    {
        // En PostRemove, on n'a pas acc�s � l'id, on utilise notre nom sauvegard�
        if (file_exists($this->tempFilename)) {
            // On supprime le fichier
            unlink($this->tempFilename);
        }
    }


    public function getUploadDir()
    {
        // On retourne le chemin relatif vers l'image pour un navigateur (relatif au r�pertoire /web donc)
        return 'uploads/img';
    }


    public function getUploadRootDir()
    {
        // On retourne le chemin absolu vers l'image pour notre code PHP
        return __DIR__.'/../../../../web/'.$this->getUploadDir();
    }


    public function getWebPath()
    {
        return $this->getUploadDir().'/'.$this->getId().'.'.$this->getUrl().'.'.$this->getSize().'.'.$this->getType();
    }



    public function setUrl($url)
    {
        $this->url = $url;
        return $this;
    }


    public function getUrl()
    {
        return $this->url;
    }


    public function setAlt($alt)
    {
        $this->alt = $alt;
        return $this;
    }


    public function getAlt()
    {
        return $this->alt;
    }

    public function setSize($size)
    {
        $this->size = $size;
        return $this;
    }


    public function getSize()
    {
        return $this->size / 1024 . " kB";
    }
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }


    public function getType()
    {
        return $this->type;
    }
    public function __sleep()
    {
        $ref   = new \ReflectionClass(__CLASS__);
        $props = $ref->getProperties(\ReflectionProperty::IS_PROTECTED);

        $serialize_fields = array();

        foreach ($props as $prop) {
            $serialize_fields[] = $prop->name;
        }

        return $serialize_fields;
    }


}
