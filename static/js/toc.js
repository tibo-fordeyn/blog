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
    toc.appendChild(tocTitle);

    // -------------------------------------------------------------
    // Toevoegen van de TOC-inhoud op basis van de gevonden headers:
    // -------------------------------------------------------------
    headers.forEach(function(header) {
        var tocEntry = document.createElement('a');
        tocEntry.href = '#' + header.id;
        tocEntry.textContent = header.textContent;

        if (header.tagName.toLowerCase() === 'h3') {
            tocEntry.classList.add('h3'); // Class voor h3
        }

        tocEntry.id = 'toc-' + header.id;
        toc.appendChild(tocEntry);
    });

    // -------------------------------------------------------------
    // Zorg dat de TOC "sticky" wordt zodra we voorbij de eerste header scrollen
    // -------------------------------------------------------------
    function updateTocPosition() {
        var firstHeaderTop = firstHeader.getBoundingClientRect().top + window.scrollY; // Bepaal de top van de eerste header
        var tocHeight = toc.offsetHeight; // Hoogte van de TOC
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var maxTocTop = windowHeight * 0.7; // Maximaal 70% van de hoogte van het scherm

        if (scrollPosition < firstHeaderTop - 100) {
            // TOC nog niet sticky
            toc.style.position = 'absolute';
            toc.style.top = firstHeader.offsetTop + 'px'; // Plaats de TOC bij de eerste header
            isSticky = false;
        } else if (!isSticky && scrollPosition >= firstHeaderTop - 100) {
            // Maak TOC sticky
            toc.style.position = 'fixed';
            toc.style.top = Math.min(100, maxTocTop - tocHeight) + 'px';
            isSticky = true;
        }
    }

    // -------------------------------------------------------------
    // Bepaal welke header actief (gehighlight) is in de TOC
    // -------------------------------------------------------------
    function updateActiveSection() {
        var scrollPosition = window.scrollY + window.innerHeight / 2; // Scrollpositie plus helft van het venster
        var activeHeader = null;

        headers.forEach(function(header, index) {
            var headerTop = header.offsetTop;
            var nextHeaderTop = (index + 1 < headers.length)
                ? headers[index + 1].offsetTop
                : document.documentElement.scrollHeight;

            if (scrollPosition >= headerTop && scrollPosition < nextHeaderTop) {
                activeHeader = header;
            }
        });

        headers.forEach(function(header) {
            var tocEntry = document.getElementById('toc-' + header.id);
            if (header === activeHeader) {
                tocEntry.classList.add('active');
            } else {
                tocEntry.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------
    // Scroll- resize-events
    // -------------------------------------------------------------
    window.addEventListener('scroll', function() {
        updateTocPosition();
        updateActiveSection();
    });

    window.addEventListener('resize', function() {
        updateTocPosition();
        updateActiveSection();
    });

    // Initiële call
    updateTocPosition();
    updateActiveSection();
});
