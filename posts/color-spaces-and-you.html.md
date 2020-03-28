---
title: Color Spaces and You
teaser: >
  How many colors do you see?
  How do you represent the idea of colors using math?
  Is one representation better than the other?
date: 2021-03-27
tags: color
---

### Outline

* What is color?
  * Visible light, i.e. a visible part of the electromagnetic spectrum (show an image)
  * Different frequencies create different colors
  * An object appears as a certain color because it "absorbs" (scatters) all of the frequencies except some, which it reflects back to your eyes
  * How do you represent color in a computer as data? Read on...
* How do we see color?
  * Rods and cones
  * Both are sensitive to light but only cones are sensitive to individual frequencies
  * The minimum perceptible difference in frequency is around ??? nm,
    so given that the visible spectrum is ??? m,
    we can see ??? number of colors
  * Some scientists estimate we can see 1 million distinct hues: <https://en.wikipedia.org/wiki/Pentachromacy>
  * You might have heard that there are "red", "blue", and "green" cones
    (http://hyperphysics.phy-astr.gsu.edu/hbase/vision/rodcone.html)
    (for people with color blindness, some of their cones may function differently)
  * But actually each kind of cone is sensitive to a different range of frequencies
    and these ranges overlap
  * More than one kind of cone can activate at a given time
    and that's how we see such a wide spectrum of colors —
    we see the colors "in between" red and green
  * (Side note: there are some colors that should be impossible to see
    and yet we see them anyway — these are informally called "impossible colors" —
    see <https://en.wikipedia.org/wiki/Impossible_color>)
  * Also see the opponent process theory:
    <https://en.wikipedia.org/wiki/Opponent_process> —
    this is an older theory about how we see which has recently been challenged,
    now we think it's more of a complementary color situation.
  * Trichromatic theory
    * Early 1800s: Thomas Young proposed that there were three photoreceptors in the retina: <https://en.wikipedia.org/wiki/Trichromacy>
      * This was the dude that created the double-slit experiment to prove that light is a wave
    * 1851: Hermann von Helmholtz's *Treatise on Physiological Optics* <https://en.wikipedia.org/wiki/Trichromacy>
    * 1853: Grassman's law: <https://en.wikipedia.org/wiki/Grassmann%27s_laws_(color_science)>
      * <https://en.wikipedia.org/wiki/Hermann_Grassmann>
    * 1855: James Clerk Maxwell's spinning top: <https://en.wikipedia.org/wiki/Color_triangle>
      * First attempt to assign a mathematical formula to mixtures of colors, sort of a precursor to CIE
    * 1956: Gunnar Svaetichin: First actual physiological evidence of photoreceptors <https://en.wikipedia.org/wiki/Trichromacy>
    * 1965: More evidence <http://hyperphysics.phy-astr.gsu.edu/hbase/vision/colcon.html#c1>
* Additive-color theory
  * We've known that visible light contains different colors; Newton documented this in his *Opticks*
  * Goethe's *Theory of Colors* — psychology of colors: <https://archive.org/details/goethestheoryco01goetgoog/page/n7/mode/2up>
    * This has to do more with color theory than light theory
  * J.C. LeBlon's *Coloritto* — made a distinction between subtractive color and additive color
  * <https://en.wikipedia.org/wiki/Color_motion_picture_film#Physics_of_light_and_color>
* Representing colors using light theory
  * Color photographs
    * Autochrome Lumiere
    * Joly color screen
    * Paget process
    * Sergey Prokudin-Gorsky
    * 1899: Edward Raymond Turner <https://en.wikipedia.org/wiki/Color_motion_picture_film>
    * 1906: Kinemacolor: <https://en.wikipedia.org/wiki/Kinemacolor>
    * 1922: Technicolor: <https://en.wikipedia.org/wiki/Technicolor>
  * The first color projectors (for movies)
    * It's one thing to reproduce a picture using a photosensitive film,
      you can simply shine light through the film to project it
  * The first televisions
    * First time an image was not projected but reproduced using miniscule lights
    * 1884: Nipkow disk: <https://ethw.org/Nipkow_Scanning_Disk> —
      * Image chopped up into tiny bits, encoded using photosensitive cells, projected onto a receiver through electricity
    * 1899: Polumordvinov patent: <https://en.wikipedia.org/wiki/Field-sequential_color_system>
    * 1904: Frankenstein and Jaworki patent: <https://en.wikipedia.org/wiki/Field-sequential_color_system>
    * 1906: Kinemacolor: <https://en.wikipedia.org/wiki/Kinemacolor>
    * 1923: "Televisor" project by John Logie Baird: <https://ethw.org/John_Logie_Baird>
      * Mechanical implementation inspired by Nipkow
      * Picture was transmitted wirelessly through radio waves (radio was a new thing, mainly thanks to Marconi)
      * Color version added in 1927
    * 1923: Zworykin's patent: <https://ethw.org/Philo_T._Farnsworth>
    * 1924 (or 1933?): Vladimir Zworykin's iconoscope: <https://ethw.org/Vladimir_Zworykin> (RCA)
    * 1925: Zworykin's color TV: <https://www.thoughtco.com/color-television-history-4070934>
    * 1926: Boris Rosing's cathode-ray tube: <https://ethw.org/Milestones:Development_of_Electronic_Television,_1924-1941>
    * 1926: Bell Labs's cathode-ray tube: <https://ethw.org/Milestones:Development_of_Electronic_Television,_1924-1941>
    * 1926: Kenjiro Takayanagi's cathode-ray tube: <https://ethw.org/Milestones:Development_of_Electronic_Television,_1924-1941>
    * 1927: Kenjiro Takayanagi's Braun tube: <https://ethw.org/Milestones:Development_of_Electronic_Television,_1924-1941>
    * 1928: Baird's field-sequential color TV: <https://en.wikipedia.org/wiki/Field-sequential_color_system>
    * 1929: Vladimir Zworykin's cathode-ray tube: <https://ethw.org/Vladimir_Zworykin> (RCA)
    * 1930: Kenjiro Takayanagi's Kinescope: <https://ethw.org/Milestones:Development_of_Electronic_Television,_1924-1941>
    * 1930: Philo Farnsworth's patent: <https://ethw.org/Philo_T._Farnsworth>
    * 1935: Kenjiro Takayanagi's Iconoscope: <https://ethw.org/Milestones:Development_of_Electronic_Television,_1924-1941>
    * 1938: RCA (via Georges Valenci) introduces chroma-luminance model: <https://en.wikipedia.org/wiki/Shadow_mask>
    * 1938: Werner Flechsig's patent for the shadow mask: <https://en.wikipedia.org/wiki/RGB_color_model#Television>
    * 1939: RCA's NBC holds first TV broadcast at World's Fair: <https://ethw.org/Television>
    * 1940: Peter Goldmark's color system developed for CBS: <https://ethw.org/Peter_Goldmark>
    * 1947: Something about Kinescope?: <https://www.thoughtco.com/color-television-history-4070934>
    * 1947: Alfred Schroeder's shadow mask tube patent: <https://www.thoughtco.com/color-television-history-4070934>
      * This was developed independently of Flechsig's solution: <https://en.wikipedia.org/wiki/Shadow_mask#Shadow_mask>
      * Developed "a very unusual and plausible theory on how the human eye sees and distinguishes different colors": <https://ethw.org/Alfred_C._Schroeder>
    * 1950: CBS's color TV: <https://www.thoughtco.com/color-television-history-4070934>
    * 1951: RCA's tricolor tube: <https://www.inventionandtech.com/content/color-war-1?page=8>
      * Designed to be compatible with existing black-and-white TVs; split signal into color and luminance (Y)
    * 1953: Frank Gray (Bell Labs)'s award for contributions to color TV: <https://ethw.org/Frank_Gray>
    * 1953: RCA's color TVs: <https://www.thoughtco.com/color-television-history-4070934>
    * 1953: NTSC formed and accepts RCA tube design as standard: <https://www.inventionandtech.com/content/color-war-1?page=8>
      * The NTSC carried out a huge study on human color perception: <https://en.wikipedia.org/wiki/Shadow_mask#Market_introduction>
      * The colorimetry was based on CIE: <https://en.wikipedia.org/wiki/NTSC#Colorimetry>
  * Also see:
    * <https://books.google.com/books?id=BG89BAAAQBAJ&pg=PT44&lpg=PT44&dq=1904+german+patent+color+television&source=bl&ots=CLlrB8F8l7&sig=ACfU3U0bNBA8dd1htnt5J__AcF2pV-pbhg&hl=en&sa=X&ved=2ahUKEwjskpSO77voAhXMQs0KHYFKBMgQ6AEwFHoECAoQAQ#v=onepage&q&f=false>
    * <https://www.inventionandtech.com/content/color-war-1>
  * Color spaces
    * (s)RGB
    * P53
<!--
* Representing colors using pigment theory
  * Crayola
  * CMYK
  * Pantone
-->
* Representing colors using perceptual theory
  * CIE
    * International Commission on Illumination formed in 1913
      as successor to CIP (International Commission on Photometry) founded in 1900
      (<https://en.wikipedia.org/wiki/International_Commission_on_Illumination>)
    * CIE RGB was developed first based on experiments done by William David Wright and John Guild:
      <https://en.wikipedia.org/wiki/CIE_1931_color_space#Definition_of_the_CIE_XYZ_color_space>
    * It was also based on specific wavelengths of light:
      700 nm (red), 546.1 nm (green), and 435.8 nm (blue)
      * 546.1 nm and 435.8 nm were based on the spectrometry of mercury,
        700 nm was just an even number chosen based on the existing knowledge of the frequency range of red
    * CIE XYZ published in 1931: <https://en.wikipedia.org/wiki/CIE_1931_color_space>
    * Everything is defined relative to the "standard observer":
      <https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_standard_observer>
  * HSLuv
* Representing colors for the web now
  * Now: rgba, hsla
  * Future: lab, luv
  * Experimental: hsluv
* Resources
  * http://www.brucelindbloom.com/
  * https://programmingdesignsystems.com/color/perceptually-uniform-color-spaces/index.html
  * Solarized: https://ethanschoonover.com/solarized/
  * https://ninedegreesbelow.com/photography/gimp-srgb-lch-color-palettes.html
  * https://ninedegreesbelow.com/photography/lch-complements-and-color-harmonies.html
  * https://www.handprint.com/
  * https://www.xrite.com/-/media/xrite/files/whitepaper_pdfs/l10-001_a_guide_to_understanding_color_communication/l10-001_understand_color_en.pdf
  * http://dtpstudio.de/atlas/english/help/english/colourharmony_complementary.htm
  * https://en.wikipedia.org/wiki/Munsell_color_system
  * http://pteromys.melonisland.net/munsell/
