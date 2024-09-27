document.addEventListener('DOMContentLoaded', function() {
    var toc = document.getElementById('toc');
    var headers = document.querySelectorAll('h2, h3'); // Selecteer zowel h2 als h3 headers
    var firstHeader = headers[0]; // Pak de eerste header op de pagina
    var isSticky = false; // Houd bij wanneer de TOC sticky wordt

    // Verwijder eerst eventuele dubbele "Contents:" (reset de inhoud van de TOC)
    toc.innerHTML = '';

    // Voeg "Contents:" toe als een enkel div-element bovenaan de TOC
    var tocTitle = document.createElement('div');
    tocTitle.id = 'toc-title';
    tocTitle.textContent = 'Contents:';
    tocTitle.style.fontSize = '18px';
    tocTitle.style.marginBottom = '10px';
    tocTitle.style.borderBottom = '1px solid white';
    tocTitle.style.paddingBottom = '5px';
    tocTitle.style.display = 'inline-block'; // Voorkom dat de onderlijning over de hele breedte gaat
    toc.appendChild(tocTitle); // Voeg het toe aan het begin van de TOC-container

    // TOC laten zien bij laden van de pagina
    toc.style.display = 'block';

    // Voeg TOC-inhoud toe op basis van de headers
    headers.forEach(function(header) {
        var tocEntry = document.createElement('a');
        tocEntry.href = '#' + header.id;
        tocEntry.textContent = header.textContent;

        // Voeg een class toe aan subhoofdstukken (h3)
        if (header.tagName.toLowerCase() === 'h3') {
            tocEntry.classList.add('h3'); // Voeg class voor h3 toe
        }

        tocEntry.id = 'toc-' + header.id;
        toc.appendChild(tocEntry);
    });

    // Functie om de TOC sticky te maken zodra we voorbij de eerste header scrollen
    function updateTocPosition() {
        var firstHeaderTop = firstHeader.getBoundingClientRect().top + window.scrollY; // Bepaal de top van de eerste header
        var tocHeight = toc.offsetHeight; // Hoogte van de TOC
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var maxTocTop = windowHeight * 0.7; // Maximaal 70% van de hoogte van het scherm

        // Zorg ervoor dat de TOC soepel verspringt naar sticky wanneer de gebruiker voorbij de eerste header scrolt
        if (scrollPosition < firstHeaderTop - 100) {
            toc.style.position = 'absolute';
            toc.style.top = firstHeader.offsetTop + 'px'; // Plaats de TOC bij de eerste header
            isSticky = false;
        } else if (!isSticky && scrollPosition >= firstHeaderTop - 100) {
            toc.style.position = 'fixed';  // Maak de TOC fixed zodra je voorbij de eerste header komt
            toc.style.top = Math.min(100, maxTocTop - tocHeight) + 'px'; // Houd de TOC tot max 70% van het scherm
            isSticky = true;
        }
    }

    // Functie om te bepalen welke header actief moet zijn
    function updateActiveSection() {
        var scrollPosition = window.scrollY + window.innerHeight / 2; // Scrollpositie plus de helft van het venster
        var activeHeader = null;

        headers.forEach(function(header, index) {
            var headerTop = header.offsetTop;
            var nextHeaderTop = (index + 1 < headers.length) ? headers[index + 1].offsetTop : document.documentElement.scrollHeight;

            // Controleer of de huidige scrollpositie binnen het bereik van deze header valt
            if (scrollPosition >= headerTop && scrollPosition < nextHeaderTop) {
                activeHeader = header;
            }
        });

        // Update de TOC om de juiste header als actief te markeren
        headers.forEach(function(header) {
            var tocEntry = document.getElementById('toc-' + header.id);
            if (header === activeHeader) {
                tocEntry.classList.add('active');
            } else {
                tocEntry.classList.remove('active');
            }
        });
    }

    // Functie om te controleren of de TOC zichtbaar moet zijn op basis van zoomniveau en vensterbreedte
    function checkVisibility() {
        // Bepaal het zoomniveau via window.devicePixelRatio
        var zoomLevel = window.devicePixelRatio * 100;

        // Haal de vensterbreedte op
        var windowWidth = window.innerWidth;

        // TOC verbergen bij zoomniveaus van 140% of meer of bij vensterbreedtes kleiner dan 1000px
        if (zoomLevel > 140 || windowWidth < 1000) {
            toc.style.display = 'none';
        } else {
            toc.style.display = 'block';
        }
    }

    // Event listener voor scrollen met debounce alleen voor de TOC positie
    window.addEventListener('scroll', function() {
        updateTocPosition(); // Dit mag nog steeds met een minimale vertraging

        // Directe update zonder debounce voor actieve sectie highlight
        updateActiveSection();

        // Controleer de zichtbaarheid bij scrollen
        checkVisibility();
    });

    // Event listener voor zoom of venstergrootte veranderingen
    window.addEventListener('resize', function() {
        checkVisibility();
        updateTocPosition();
        updateActiveSection();
    });

    // Initiële update van de actieve sectie en zichtbaarheid
    checkVisibility();
    updateTocPosition();
    updateActiveSection();
});