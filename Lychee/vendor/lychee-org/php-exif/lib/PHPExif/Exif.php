<?php

namespace PHPExif;

use DateTime;

/**
 * PHP Exif Reader
 *
 * Responsible for all the read operations on a file's EXIF metadata
 *
 * @category    PHPExif
 * @package     Exif
 */
class Exif
{
    public const ALTITUDE              = 'altitude';
    public const APERTURE              = 'aperture';
    public const AUTHOR                = 'author';
    public const CAMERA                = 'camera';
    public const CAPTION               = 'caption';
    public const CITY                  = 'city';
    public const COLORSPACE            = 'ColorSpace';
    public const CONTENTIDENTIFIER     = 'contentIdentifier';
    public const COPYRIGHT             = 'copyright';
    public const COUNTRY               = 'country';
    public const CREATION_DATE         = 'creationdate';
    public const CREDIT                = 'credit';
    public const DESCRIPTION           = 'description';
    public const DURATION              = 'duration';
    public const EXPOSURE              = 'exposure';
    public const FILESIZE              = 'FileSize';
    public const FILENAME              = 'FileName';
    public const FOCAL_LENGTH          = 'focalLength';
    public const FOCAL_DISTANCE        = 'focalDistance';
    public const FRAMERATE             = 'framerate';
    public const GPS                   = 'gps';
    public const HEADLINE              = 'headline';
    public const HEIGHT                = 'height';
    public const HORIZONTAL_RESOLUTION = 'horizontalResolution';
    public const IMGDIRECTION          = 'imgDirection';
    public const ISO                   = 'iso';
    public const JOB_TITLE             = 'jobTitle';
    public const KEYWORDS              = 'keywords';
    public const LATITUDE              = 'latitude';
    public const LONGITUDE             = 'longitude';
    public const LENS                  = 'lens';
    public const MAKE                  = 'make';
    public const MICROVIDEOOFFSET      = 'MicroVideoOffset';
    public const MIMETYPE              = 'MimeType';
    public const ORIENTATION           = 'Orientation';
    public const SOFTWARE              = 'software';
    public const SOURCE                = 'source';
    public const STATE                 = 'state';
    public const SUBLOCATION           = 'Sublocation';
    public const TITLE                 = 'title';
    public const VERTICAL_RESOLUTION   = 'verticalResolution';
    public const WIDTH                 = 'width';



    /**
     * The mapped EXIF data
     */
    protected array $data = array();

    /**
     * The raw EXIF data
     */
    protected array $rawData = array();

    /**
     * Class constructor
     *
     * @param array $data
     */
    public function __construct(array $data = array())
    {
        $this->setData($data);
    }

    /**
     * Sets the raw EXIF data
     *
     * @param array $data The data to set
     * @return Exif Current instance for chaining
     */
    public function setRawData(array $data): Exif
    {
        $this->rawData = $data;

        return $this;
    }

    /**
     * Returns all EXIF data in the raw original format
     *
     * @return array
     */
    public function getRawData(): array
    {
        return $this->rawData;
    }

    /**
     * Sets the mapped EXIF data
     *
     * @param array $data The data to set
     * @return Exif Current instance for chaining
     */
    public function setData(array $data): Exif
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Returns the mapped EXIF data
     *
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * Returns the Aperture F-number
     *
     * @return string|false
     */
    public function getAperture(): string|false
    {
        if (!isset($this->data[self::APERTURE])) {
            return false;
        }

        return $this->data[self::APERTURE];
    }

    /**
     * Sets the Aperture F-number
     *
     * @param string $value
     * @return Exif
     */
    public function setAperture(string $value): Exif
    {
        $this->data[self::APERTURE] = $value;

        return $this;
    }

    /**
     * Returns the Author
     *
     * @return string|false
     */
    public function getAuthor(): string|false
    {
        if (!isset($this->data[self::AUTHOR])) {
            return false;
        }

        return $this->data[self::AUTHOR];
    }

    /**
     * Sets the Author
     *
     * @param string $value
     * @return Exif
     */
    public function setAuthor(string $value): Exif
    {
        $this->data[self::AUTHOR] = $value;

        return $this;
    }

    /**
     * Returns the Headline
     *
     * @return string|false
     */
    public function getHeadline(): string|false
    {
        if (!isset($this->data[self::HEADLINE])) {
            return false;
        }

        return $this->data[self::HEADLINE];
    }

    /**
     * Sets the Headline
     *
     * @param string $value
     * @return Exif
     */
    public function setHeadline(string $value): Exif
    {
        $this->data[self::HEADLINE] = $value;

        return $this;
    }

    /**
     * Returns the Credit
     *
     * @return string|false
     */
    public function getCredit(): string|false
    {
        if (!isset($this->data[self::CREDIT])) {
            return false;
        }

        return $this->data[self::CREDIT];
    }

    /**
     * Sets the Credit
     *
     * @param string $value
     * @return Exif
     */
    public function setCredit(string $value): Exif
    {
        $this->data[self::CREDIT] = $value;

        return $this;
    }

    /**
     * Returns the source
     *
     * @return string|false
     */
    public function getSource(): string|false
    {
        if (!isset($this->data[self::SOURCE])) {
            return false;
        }

        return $this->data[self::SOURCE];
    }

    /**
     * Sets the Source
     *
     * @param string $value
     * @return Exif
     */
    public function setSource(string $value): Exif
    {
        $this->data[self::SOURCE] = $value;

        return $this;
    }

    /**
     * Returns the Jobtitle
     *
     * @return string|false
     */
    public function getJobtitle(): string|false
    {
        if (!isset($this->data[self::JOB_TITLE])) {
            return false;
        }

        return $this->data[self::JOB_TITLE];
    }

    /**
     * Sets the Jobtitle
     *
     * @param string $value
     * @return Exif
     */
    public function setJobtitle(string $value): Exif
    {
        $this->data[self::JOB_TITLE] = $value;

        return $this;
    }

    /**
     * Returns the ISO speed
     *
     * @return string|false
     */
    public function getIso(): string|false
    {
        if (!isset($this->data[self::ISO])) {
            return false;
        }

        return $this->data[self::ISO];
    }

    /**
     * Sets the ISO
     *
     * @param string $value
     * @return Exif
     */
    public function setIso(string $value): Exif
    {
        $this->data[self::ISO] = $value;

        return $this;
    }

    /**
     * Returns the Exposure
     *
     * @return string|false
     */
    public function getExposure(): string|false
    {
        if (!isset($this->data[self::EXPOSURE])) {
            return false;
        }

        return $this->data[self::EXPOSURE];
    }

    /**
     * Sets the Exposure
     *
     * @param string $value
     * @return Exif
     */
    public function setExposure(string $value): Exif
    {
        $this->data[self::EXPOSURE] = $value;

        return $this;
    }

    /**
     * Returns the Exposure
     *
     * @return float|false
     */
    public function getExposureMilliseconds(): float|false
    {
        if (!isset($this->data[self::EXPOSURE])) {
            return false;
        }

        if (is_numeric($this->data[self::EXPOSURE])) {
            return $this->data[self::EXPOSURE] + 0;
        }

        $exposureParts = explode('/', $this->data[self::EXPOSURE]);

        return (int) reset($exposureParts) / (int) end($exposureParts);
    }

    /**
     * Returns the focus distance, if it exists
     *
     * @return string|false
     */
    public function getFocusDistance(): string|false
    {
        if (!isset($this->data[self::FOCAL_DISTANCE])) {
            return false;
        }

        return $this->data[self::FOCAL_DISTANCE];
    }

    /**
     * Sets the focus distance
     *
     * @param string $value
     * @return Exif
     */
    public function setFocusDistance(string $value): Exif
    {
        $this->data[self::FOCAL_DISTANCE] = $value;

        return $this;
    }

    /**
     * Returns the width in pixels, if it exists
     *
     * @return string|false
     */
    public function getWidth(): string|false
    {
        if (!isset($this->data[self::WIDTH])) {
            return false;
        }

        return $this->data[self::WIDTH];
    }

    /**
     * Sets the width
     *
     * @param string $value
     * @return Exif
     */
    public function setWidth(string $value): Exif
    {
        $this->data[self::WIDTH] = $value;

        return $this;
    }

    /**
     * Returns the height in pixels, if it exists
     *
     * @return string|false
     */
    public function getHeight(): string|false
    {
        if (!isset($this->data[self::HEIGHT])) {
            return false;
        }

        return $this->data[self::HEIGHT];
    }

    /**
     * Sets the height
     *
     * @param string $value
     * @return Exif
     */
    public function setHeight(string $value): Exif
    {
        $this->data[self::HEIGHT] = $value;

        return $this;
    }

    /**
     * Returns the title, if it exists
     *
     * @return string|false
     */
    public function getTitle(): string|false
    {
        if (!isset($this->data[self::TITLE])) {
            return false;
        }

        return $this->data[self::TITLE];
    }

    /**
     * Sets the title
     *
     * @param string $value
     * @return Exif
     */
    public function setTitle(string $value): Exif
    {
        $this->data[self::TITLE] = $value;

        return $this;
    }

    /**
     * Returns the caption, if it exists
     *
     * @return string|false
     */
    public function getCaption(): string|false
    {
        if (!isset($this->data[self::CAPTION])) {
            return false;
        }

        return $this->data[self::CAPTION];
    }

    /**
     * Sets the caption
     *
     * @param string $value
     * @return Exif
     */
    public function setCaption(string $value): Exif
    {
        $this->data[self::CAPTION] = $value;

        return $this;
    }

    /**
     * Returns the copyright, if it exists
     *
     * @return string|false
     */
    public function getCopyright(): string|false
    {
        if (!isset($this->data[self::COPYRIGHT])) {
            return false;
        }

        return $this->data[self::COPYRIGHT];
    }

    /**
     * Sets the copyright
     *
     * @param string $value
     * @return Exif
     */
    public function setCopyright(string $value): Exif
    {
        $this->data[self::COPYRIGHT] = $value;

        return $this;
    }

    /**
     * Returns the keywords, if they exists
     *
     * @return array|false
     */
    public function getKeywords(): array|false
    {
        if (!isset($this->data[self::KEYWORDS])) {
            return false;
        }

        return $this->data[self::KEYWORDS];
    }

    /**
     * Sets the keywords
     *
     * @param string|array $value
     * @return Exif
     */
    public function setKeywords(string|array $value): Exif
    {
        $this->data[self::KEYWORDS] = $value;

        return $this;
    }

    /**
     * Returns the camera, if it exists
     *
     * @return string|false
     */
    public function getCamera(): string|false
    {
        if (!isset($this->data[self::CAMERA])) {
            return false;
        }

        return $this->data[self::CAMERA];
    }

    /**
     * Sets the camera
     *
     * @param string $value
     * @return Exif
     */
    public function setCamera(string $value): Exif
    {
        $this->data[self::CAMERA] = $value;

        return $this;
    }

    /**
     * Returns the horizontal resolution in DPI, if it exists
     *
     * @return string|false
     */
    public function getHorizontalResolution(): string|false
    {
        if (!isset($this->data[self::HORIZONTAL_RESOLUTION])) {
            return false;
        }

        return $this->data[self::HORIZONTAL_RESOLUTION];
    }

    /**
     * Sets the horizontal resolution in DPI
     *
     * @param string $value
     * @return Exif
     */
    public function setHorizontalResolution(string $value): Exif
    {
        $this->data[self::HORIZONTAL_RESOLUTION] = $value;

        return $this;
    }

    /**
     * Returns the vertical resolution in DPI, if it exists
     *
     * @return string|false
     */
    public function getVerticalResolution(): string|false
    {
        if (!isset($this->data[self::VERTICAL_RESOLUTION])) {
            return false;
        }

        return $this->data[self::VERTICAL_RESOLUTION];
    }

    /**
     * Sets the vertical resolution in DPI
     *
     * @param string $value
     * @return Exif
     */
    public function setVerticalResolution(string $value): Exif
    {
        $this->data[self::VERTICAL_RESOLUTION] = $value;

        return $this;
    }

    /**
     * Returns the software, if it exists
     *
     * @return string|false
     */
    public function getSoftware(): string|false
    {
        if (!isset($this->data[self::SOFTWARE])) {
            return false;
        }

        return $this->data[self::SOFTWARE];
    }

    /**
     * Sets the software
     *
     * @param string $value
     * @return Exif
     */
    public function setSoftware(string $value): Exif
    {
        $this->data[self::SOFTWARE] = trim($value);

        return $this;
    }

    /**
     * Returns the focal length in mm, if it exists
     *
     * @return string|false
     */
    public function getFocalLength(): string|false
    {
        if (!isset($this->data[self::FOCAL_LENGTH])) {
            return false;
        }

        return $this->data[self::FOCAL_LENGTH];
    }

    /**
     * Sets the focal length in mm
     *
     * @param string $value
     * @return Exif
     */
    public function setFocalLength(string $value): Exif
    {
        $this->data[self::FOCAL_LENGTH] = $value;

        return $this;
    }

    /**
     * Returns the creation datetime, if it exists
     *
     * @return DateTime|false
     */
    public function getCreationDate(): DateTime|false
    {
        if (!isset($this->data[self::CREATION_DATE])) {
            return false;
        }

        return $this->data[self::CREATION_DATE];
    }

    /**
     * Sets the creation datetime
     *
     * @param \DateTime $value
     * @return Exif
     */
    public function setCreationDate(DateTime $value): Exif
    {
        $this->data[self::CREATION_DATE] = $value;

        return $this;
    }

    /**
     * Returns the colorspace, if it exists
     *
     * @return string|false
     */
    public function getColorSpace(): string|false
    {
        if (!isset($this->data[self::COLORSPACE])) {
            return false;
        }

        return $this->data[self::COLORSPACE];
    }

    /**
     * Sets the colorspace
     *
     * @param string $value
     * @return Exif
     */
    public function setColorSpace(string $value): Exif
    {
        $this->data[self::COLORSPACE] = $value;

        return $this;
    }

    /**
     * Returns the mimetype, if it exists
     *
     * @return string|false
     */
    public function getMimeType(): string|false
    {
        if (!isset($this->data[self::MIMETYPE])) {
            return false;
        }

        return $this->data[self::MIMETYPE];
    }

    /**
     * Sets the mimetype
     *
     * @param string $value
     * @return Exif
     */
    public function setMimeType(string $value): Exif
    {
        $this->data[self::MIMETYPE] = $value;

        return $this;
    }

    /**
     * Returns the filesize, if it exists
     *
     * @return int|false
     */
    public function getFileSize(): int|false
    {
        if (!isset($this->data[self::FILESIZE])) {
            return false;
        }

        return $this->data[self::FILESIZE];
    }

    /**
     * Sets the filesize
     *
     * @param int $value
     * @return Exif
     */
    public function setFileSize(int $value): Exif
    {
        $this->data[self::FILESIZE] = $value;

        return $this;
    }

    /**
     * Returns the filename, if it exists
     *
     * @return string|false
     */
    public function getFileName(): string|false
    {
        if (!isset($this->data[self::FILENAME])) {
            return false;
        }

        return $this->data[self::FILENAME];
    }

    /**
     * Sets the filename
     *
     * @param string $value
     * @return Exif
     */
    public function setFileName(string $value): Exif
    {
        $this->data[self::FILENAME] = $value;

        return $this;
    }

    /**
     * Returns the orientation, if it exists
     *
     * @return string|false
     */
    public function getOrientation(): string|false
    {
        if (!isset($this->data[self::ORIENTATION])) {
            return false;
        }

        return $this->data[self::ORIENTATION];
    }

    /**
     * Sets the orientation
     *
     * @param string $value
     * @return Exif
     */
    public function setOrientation(string $value): Exif
    {
        $this->data[self::ORIENTATION] = $value;

        return $this;
    }

    /**
     * Returns GPS coordinates, if it exists
     *
     * @return string|false
     */
    public function getGPS(): string|false
    {
        if (!isset($this->data[self::GPS])) {
            return false;
        }

        return $this->data[self::GPS];
    }

    /**
     * Sets the GPS coordinates
     *
     * @param string $value
     * @return Exif
     */
    public function setGPS(string $value): Exif
    {
        $this->data[self::GPS] = $value;

        return $this;
    }

    /**
     * Sets the description value
     *
     * @param string $value
     * @return Exif
     */
    public function setDescription(string $value): Exif
    {
        $this->data[self::DESCRIPTION] = $value;

        return $this;
    }

    /**
     * Returns description, if it exists
     *
     * @return string|false
     */
    public function getDescription(): string|false
    {
        if (!isset($this->data[self::DESCRIPTION])) {
            return false;
        }

        return $this->data[self::DESCRIPTION];
    }


    /**
     * Sets the Make value
     *
     * @param string $value
     * @return Exif
     */
    public function setMake(string $value): Exif
    {
        $this->data[self::MAKE] = $value;

        return $this;
    }

    /**
     * Returns make, if it exists
     *
     * @return string|false
     */
    public function getMake(): string|false
    {
        if (!isset($this->data[self::MAKE])) {
            return false;
        }

        return $this->data[self::MAKE];
    }

    /**
     * Sets the altitude value
     *
     * @param float $value
     * @return Exif
     */
    public function setAltitude(float $value): Exif
    {
        $this->data[self::ALTITUDE] = $value;

        return $this;
    }

    /**
     * Returns altitude, if it exists
     *
     * @return float|false
     */
    public function getAltitude(): float|false
    {
        if (!isset($this->data[self::ALTITUDE])) {
            return false;
        }

        return $this->data[self::ALTITUDE];
    }

    /**
     * Sets the altitude value
     *
     * @param float $value
     * @return Exif
     */
    public function setLongitude(float $value): Exif
    {
        $this->data[self::LONGITUDE] = $value;

        return $this;
    }

    /**
     * Returns altitude, if it exists
     *
     * @return float|false
     */
    public function getLongitude(): float|false
    {
        if (!isset($this->data[self::LONGITUDE])) {
            return false;
        }

        return $this->data[self::LONGITUDE];
    }

    /**
     * Sets the latitude value
     *
     * @param float $value
     * @return Exif
     */
    public function setLatitude(float $value): Exif
    {
        $this->data[self::LATITUDE] = $value;

        return $this;
    }

    /**
     * Returns latitude, if it exists
     *
     * @return float|false
     */
    public function getLatitude(): float|false
    {
        if (!isset($this->data[self::LATITUDE])) {
            return false;
        }

        return $this->data[self::LATITUDE];
    }

    /**
     * Sets the imgDirection value
     *
     * @param float $value
     * @return Exif
     */
    public function setImgDirection(float $value): Exif
    {
        $this->data[self::IMGDIRECTION] = $value;

        return $this;
    }

    /**
     * Returns imgDirection, if it exists
     *
     * @return float|false
     */
    public function getImgDirection(): float|false
    {
        if (!isset($this->data[self::IMGDIRECTION])) {
            return false;
        }

        return $this->data[self::IMGDIRECTION];
    }


    /**
     * Sets the Make value
     *
     * @param string $value
     * @return Exif
     */
    public function setLens(string $value): Exif
    {
        $this->data[self::LENS] = $value;

        return $this;
    }

    /**
     * Returns make, if it exists
     *
     * @return string|false
     */
    public function getLens(): string|false
    {
        if (!isset($this->data[self::LENS])) {
            return false;
        }

        return $this->data[self::LENS];
    }

    /**
     * Sets the content identifier value
     *
     * @param string $value
     * @return Exif
     */
    public function setContentIdentifier(string $value): Exif
    {
        $this->data[self::CONTENTIDENTIFIER] = $value;

        return $this;
    }

    /**
     * Returns content identifier, if it exists
     *
     * @return string|false
     */
    public function getContentIdentifier(): string|false
    {
        if (!isset($this->data[self::CONTENTIDENTIFIER])) {
            return false;
        }

        return $this->data[self::CONTENTIDENTIFIER];
    }


    /**
     * Sets the framerate value
     *
     * @param string $value
     * @return Exif
     */
    public function setFramerate(string $value): Exif
    {
        $this->data[self::FRAMERATE] = $value;

        return $this;
    }

    /**
     * Returns content identifier, if it exists
     *
     * @return string|false
     */
    public function getFramerate(): string|false
    {
        if (!isset($this->data[self::FRAMERATE])) {
            return false;
        }

        return $this->data[self::FRAMERATE];
    }


    /**
     * Sets the duration value
     *
     * @param string $value
     * @return Exif
     */
    public function setDuration(string $value): Exif
    {
        $this->data[self::DURATION] = $value;

        return $this;
    }

    /**
     * Returns duration, if it exists
     *
     * @return string|false
     */
    public function getDuration(): string|false
    {
        if (!isset($this->data[self::DURATION])) {
            return false;
        }
        return $this->data[self::DURATION];
    }

    /**
     * Sets the duration value
     *
     * @param string $value
     * @return Exif
     */
    public function setMicroVideoOffset(string $value): Exif
    {
        $this->data[self::MICROVIDEOOFFSET] = $value;

        return $this;
    }

    /**
     * Returns duration, if it exists
     *
     * @return string|false
     */
    public function getMicroVideoOffset(): string|false
    {
        if (!isset($this->data[self::MICROVIDEOOFFSET])) {
            return false;
        }

        return $this->data[self::MICROVIDEOOFFSET];
    }

    /**
     * Sets the sublocation value
     *
     * @param string $value
     * @return Exif
     */
    public function setSublocation(string $value): Exif
    {
        $this->data[self::SUBLOCATION] = $value;

        return $this;
    }

    /**
     * Returns sublocation, if it exists
     *
     * @return string|false
     */
    public function getSublocation(): string|false
    {
        if (!isset($this->data[self::SUBLOCATION])) {
            return false;
        }

        return $this->data[self::SUBLOCATION];
    }

    /**
     * Sets the city value
     *
     * @param string $value
     * @return Exif
     */
    public function setCity(string $value): Exif
    {
        $this->data[self::CITY] = $value;

        return $this;
    }

    /**
     * Returns city, if it exists
     *
     * @return string|false
     */
    public function getCity(): string|false
    {
        if (!isset($this->data[self::CITY])) {
            return false;
        }

        return $this->data[self::CITY];
    }

    /**
     * Sets the state value
     *
     * @param string $value
     * @return Exif
     */
    public function setState(string $value): Exif
    {
        $this->data[self::STATE] = $value;

        return $this;
    }

    /**
     * Returns state, if it exists
     *
     * @return string|false
     */
    public function getState(): string|false
    {
        if (!isset($this->data[self::STATE])) {
            return false;
        }

        return $this->data[self::STATE];
    }

    /**
     * Sets the country value
     *
     * @param string $value
     * @return Exif
     */
    public function setCountry(string $value): Exif
    {
        $this->data[self::COUNTRY] = $value;

        return $this;
    }

    /**
     * Returns country, if it exists
     *
     * @return string|false
     */
    public function getCountry(): string|false
    {
        if (!isset($this->data[self::COUNTRY])) {
            return false;
        }

        return $this->data[self::COUNTRY];
    }
}
