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

* Three problems
  * How do you recreate another color accurately via combinations of light?
  * How do we as humans perceive color? What is color?
  * How do you represent a color mathematically? Are there theoretical colors?
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
    * 1901: People already knew about additive and subtractive synthesis, about RGB and about frequencies:
      <https://books.google.com/books?id=Oks-AQAAMAAJ&pg=PA7&lpg=PA7&dq=stained+gelatine+filters+color+photography&source=bl&ots=c7F54FuGtu&sig=ACfU3U33Fl2qAoEY7EXTSCYq4164ASIVEQ&hl=en&sa=X&ved=2ahUKEwjf98aa9L3oAhVWHM0KHXhsDSoQ6AEwFHoECA0QAQ#v=onepage&q=stained%20gelatine%20filters%20color%20photography&f=false>
    * 1956: Gunnar Svaetichin: First actual physiological evidence of photoreceptors <https://en.wikipedia.org/wiki/Trichromacy>
    * 1965: More evidence <http://hyperphysics.phy-astr.gsu.edu/hbase/vision/colcon.html#c1>
  * <https://en.wikipedia.org/wiki/Color_vision>
  * Color is subjective — it doesn't map 1-to-1 with the electromagnetic spectrum
    * Not all languages have the same words for colors:
      <https://www.youtube.com/watch?v=2TtnD4jmCDQ>
    * The Ancient Greeks didn't have a word for blue:
      <https://www.wnycstudios.org/podcasts/radiolab/episodes/211119-colors>
    * There are four women in the world who can see many more colors than the average human:
      <https://www.bbc.com/future/article/20140905-the-women-with-super-human-vision>
  * Here's an important idea:
    There's discrete quanta of light that objects give off.
    That's how different colored light used to be created without the use of filters or gels.
    For instance, neon, a chemical element that is a gas at room temperature,
    gives off bright red when electricity is run through it.
    This is what spectrometry looks for.
    (See: <https://en.wikipedia.org/wiki/History_of_spectroscopy>)
    And then, there's the cones in our eyes that are receptive to a spectrum of frequencies
    and get stimulated in varying degrees.
    So there's a mapping between the spectral distribution of an object
    and the resulting stimulation of cones.
    That function is irreversible,
    because there are many spectral distributions
    that result in the same response.
    So if you want to reproduce a color
    all you have to do is stimulate the cones in the same way —
    doesn't matter what color the actual object is.
    <https://medium.com/hipster-color-science/a-beginners-guide-to-colorimetry-401f1830b65a>
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
      * How is this different from CIE RGB? <https://en.wikipedia.org/wiki/SRGB>
      * Define: primary, chromaticities, gamma curve, color gamut
      * There is a SHIT TON of stuff that was considered to create this
      * This is actually what computer screens are designed to support, not just RGB
        (RGB defines the components, sRGB defines the color space [but there's also CIE RGB])
      * Also see: <https://en.wikipedia.org/wiki/International_Telecommunication_Union>
    * Adobe RGB: <https://en.wikipedia.org/wiki/Adobe_RGB_color_space>
    * DCI-P3: <https://en.wikipedia.org/wiki/DCI-P3>
      * Also Display P3?
      * Most monitors that want to support more colors than sRGB support this
    * ICC profiles
<!--
* Representing colors using pigment theory
  * Crayola
  * CMYK
  * Pantone
-->
* Representing colors using perceptual theory
  * CIE
    * [There's a LOT of stuff here, this may end up being the bulk of the article]
    * International Commission on Illumination formed in 1913
      as successor to CIP (International Commission on Photometry) founded in 1900
      (<https://en.wikipedia.org/wiki/International_Commission_on_Illumination>)
  * CIE RGB
    * CIE RGB was developed first based on experiments done by William David Wright and John Guild:
      <https://en.wikipedia.org/wiki/CIE_1931_color_space#Definition_of_the_CIE_XYZ_color_space>
      * Both of them published papers in the *Transactions of the Optical Society*
      * J. Guild was doing research at the Optics Department at the National Physical Laboratory,
        W. D. Wright was doing research for the Medical Research Council,
        and more generally for the Technical Optical Department of the Imperial College.
        Each knew about each other's work in this way.
      * These papers aren't free to access but can be read via deepdyve.com (monthly sub).
        The first paper by Guild seems to be *The Transformation of Trichromatic Mixture Data*,
        published in 1924
        (<https://www.deepdyve.com/lp/iop-publishing/the-transformation-of-trichromatic-mixture-data-algebraic-methods-UsQRB2AZYN?articleList=%2Fsearch%3Fauthor%3DJ.%2BGuild%26page%3D2%26sort%3Doldest>)
        the first paper by Wright seems to be *A Trichromatic Colorimeter with Spectral Primaries*,
        published in 1928
        (<https://www.deepdyve.com/lp/iop-publishing/a-trichromatic-colorimeter-with-spectral-primaries-LVbXygslit?articleList=%2Fsearch%3Fauthor%3DW.%2BD.%2BWright>).
      * Some of this was based on work by F. E. Ives and H. E. Ives,
        but also indirectly Lovibond, Abney, etc.
      * Guild and Wright mention reference colors in their experiments,
        but how did they produce these?
        Did they electrify gases to produce colors?
        Probably not,
        as this technique was not used in 1901 —
        see British Journal of Photograph, Vol. 48, y p. 7
        <https://books.google.com/books?id=Oks-AQAAMAAJ&pg=PA7&lpg=PA7&dq=stained+gelatine+filters+color+photography&source=bl&ots=c7F54FuGtu&sig=ACfU3U33Fl2qAoEY7EXTSCYq4164ASIVEQ&hl=en&sa=X&ved=2ahUKEwjf98aa9L3oAhVWHM0KHXhsDSoQ6AEwFHoECA0QAQ#v=onepage&q=stained%20gelatine%20filters%20color%20photography&f=false>.
        It was probably glass containers with either stained collodium, stained gelatine, or a colored fluid (using chemicals to achieve a pigment).
      * Using collodion was used in the photographic world.
        One such figure was Vogel, the "founder of orthochromatic photography", who published a paper about collodion in 1873
        (See The Photographic Times, Vol. 20, p. 270:
        <https://www.google.com/books/edition/The_Photographic_Times/irYaAAAAYAAJ?hl=en&gbpv=1&dq=stained+collodium&pg=PA271&printsec=frontcover>)
      * Collodion for photography was known since 1862,
        see a paper by Thomas Sutton:
        <https://www.google.com/books/edition/The_Collodion_Processes_Wet_and_Dry/Rz53ELLAVzQC>
      * Gelatine (emulsions and then dry plates) replaced collodion as a means of coloring light in 1871
        by Richard L. Maddox, see <https://en.wikipedia.org/wiki/Dry_plate>
      * Anyway, the paper in which Guild really gets into CIE stuff is
        *The C.I.E. Colorimetric Standards and Their Use*,
        Trans. Opt. Soc., Vol. 33, 1931-1932 —
        by this point Guild had become a part of the CIE
      * The standard illuminant they used was based on the N.P.L. Standard White Light.
        Where did this come from?
        It seems like Guild and Young used some preliminary data on this illumant in their studies,
        but the data on the illuminant wasn't actually published until 1931.
        We also know from this paper that Guild actually used both a gas-filled lamp AND a liquid filter.
        (see Davis/Gibson, Bureau of Standards Journal of Research, Vol. 7, No. 5, p. 971
        <https://archive.org/details/relativespectral7579davi/page/n3/mode/2up>)
    * It was also based on specific wavelengths of light:
      700 nm (red), 546.1 nm (green), and 435.8 nm (blue)
      * 546.1 nm and 435.8 nm were based on the spectrometry of mercury,
        700 nm was just an even number chosen based on the existing knowledge of the frequency range of red
      * How did we know what the spectrum of mercury was?
      * In 1815 Fraunhofer used diffraction grating to split light and record spectra of different sources, such as the sun and different flames;
        Herschel, Talbot, Wheatstone, Foucault, and Angstrom all worked on this as well,
        but Bunsen and Kirchhoff used Fraunhofer's work to connect frequencies to specific chemical compounds and elements.
        They invented the spectroscope (<https://en.wikipedia.org/wiki/Gustav_Kirchhoff)>
        and published a paper in 1860 that detailed the spectra of six elements.
        [What were they? The paper is in German]
        <https://en.wikipedia.org/wiki/History_of_spectroscopy>
    * CIE XYZ published in 1931: <https://en.wikipedia.org/wiki/CIE_1931_color_space>
    * Everything is defined relative to the "standard observer":
      <https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_standard_observer>
    * **What is white?** <https://en.wikipedia.org/wiki/White_point>
    * What are illuminants? <https://en.wikipedia.org/wiki/Standard_illuminant>
      * Why was 2856 K chosen for Illuminant A? Why is B 4874 K and C 6774 K?
    * It seems that the idea of a color temperature was well known by 1932 — when did they come up with the Kelvin nomenclature?
      * Color temperatures: <https://en.wikipedia.org/wiki/Color_temperature>
      * Although Kelvin did some experiments with carbon,
        he didn't name the color temperature scale after himself
        <https://www.birket.com/reading-room/technical-library/lord-kelvin-never-saw-the-light-understanding-color-temperature-tom-king-2012/>
      * Something to do with black-body radiation:
        Black bodies were being studied in the late 19th century —
        Kirchoff coined the term: <https://en.wikipedia.org/wiki/Gustav_Kirchhoff>
        also see Boltzmann, Wien, Langley
        <http://galileo.phys.virginia.edu/classes/252/black_body_radiation.html>
      * The temperature of the Sun was determined in the early 1800s by Josef Stefan.
        It was later experimentally proven in 1888 and 1904:
        <https://en.wikipedia.org/wiki/Stefan%E2%80%93Boltzmann_law#Temperature_of_the_Sun>
      * In 1905 Max Planck developed a new theory of black-body radiation
        that gave rise to the idea of quanta:
        <https://en.wikipedia.org/wiki/Ultraviolet_catastrophe>
        <https://en.wikipedia.org/wiki/Electromagnetic_radiation#Particle_model_and_quantum_theory>
      * Josef Stefan and Ludwig Boltzmann developed a law that correlated the temperature of a black body and the power it generates:
        <https://en.wikipedia.org/wiki/Stefan%E2%80%93Boltzmann_law>
        This is interesting, but is not as useful as:
      * **Planck's law**:
        *This* is the law that relates temperature, frequency of radiation,
        and the spectral flux (i.e. power over time) of a black body.
        In other words,
        although a black body can produce radiation at all kinds of frequencies,
        that radiation will peak (in terms of energy produced)
        at certain frequencies for certain temperatures.
        (You can derive Stefan-Boltzmann's law and Wien's approximation from this.)
        See: <https://en.wikipedia.org/wiki/Planck%27s_law>
      * P.S. The model of the atom we know today wasn't fully discovered until 1913 by Bohr:
        <https://en.wikipedia.org/wiki/Bohr_model>
    * What is the "Planckian locus"? When did this enter the vernacular?
  * CIE L*a*b*
    * Based on work by MacAdam, then Richard Hunter
      <https://www.xrite.com/blog/history-of-color-measurement>
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
  * https://wolfcrow.com/what-is-the-difference-between-cie-lab-cie-rgb-cie-xyy-and-cie-xyz/
    * This site has a lot of nice articles about colors and color spaces,
      but as soon as you show the CIE chromaticity diagram,
      I feel like people's eyes are going to glaze over.
      Is there a way that we can make an interactive thing
      and build up the CIE color space from first principles?
  * https://medium.com/hipster-color-science/a-beginners-guide-to-colorimetry-401f1830b65a
    * This is a decent article as well,
      and I like the pictures,
      but it gets into complicated topics way too fast.
      Is there a way to start simpler?
  * Paper that proves color temperature of the Standard Observer that Young and Guild used:
    <https://books.google.com/books?id=zWE1AQAAIAAJ&pg=PA791&lpg=PA791&dq=wright+guild+paper&source=bl&ots=ZGA3hR8DkD&sig=ACfU3U2WAZ8HmYNRwujywIsm5Rg6RwqQKg&hl=en&sa=X&ved=2ahUKEwiCqqPI5L3oAhXVHc0KHRAaD_QQ6AEwCHoECAoQAQ#v=onepage&q=wright%20guild%20paper&f=false>
  * <https://philservice.typepad.com/Wright-Guild_and_CIE_RGB_and_XYZ.pages.pdf>
