document.addEventListener('DOMContentLoaded', function() {
    var toc = document.getElementById('toc');
    var headers = document.querySelectorAll('h2, h3');
    var firstHeader = headers[0];
    var isSticky = false;

    // Reset de inhoud van de TOC
    toc.innerHTML = '';

    // Voeg "Contents:" toe
    var tocTitle = document.createElement('div');
    tocTitle.id = 'toc-title';
    tocTitle.textContent = 'Contents:';
    tocTitle.style.fontSize = '18px';
    tocTitle.style.marginBottom = '10px';
    tocTitle.style.borderBottom = '1px solid white';
    tocTitle.style.paddingBottom = '5px';
    tocTitle.style.display = 'inline-block';
    toc.appendChild(tocTitle);

    // Voeg TOC-inhoud toe op basis van de headers
    headers.forEach(function(header) {
        var tocEntry = document.createElement('a');
        tocEntry.href = '#' + header.id;
        tocEntry.textContent = header.textContent;
        if (header.tagName.toLowerCase() === 'h3') {
            tocEntry.classList.add('h3');
        }
        tocEntry.id = 'toc-' + header.id;
        toc.appendChild(tocEntry);
    });

    // Functie om het zoomniveau te detecteren
    function detectZoom() {
        return window.outerWidth / window.innerWidth; // Verhouding tussen outerWidth en innerWidth
    }

    // Functie om de TOC-positie bij te werken
    function updateTocPosition() {
        var firstHeaderTop = firstHeader.getBoundingClientRect().top + window.scrollY;
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var maxTocTop = windowHeight * 0.7;

        if (scrollPosition < firstHeaderTop - 100) {
            toc.style.position = 'absolute';
            toc.style.top = firstHeader.offsetTop + 'px';
            isSticky = false;
        } else if (!isSticky && scrollPosition >= firstHeaderTop - 100) {
            toc.style.position = 'fixed';
            toc.style.top = Math.min(100, maxTocTop - toc.offsetHeight) + 'px';
            isSticky = true;
        }
    }

    // Functie om de actieve sectie te markeren
    function updateActiveSection() {
        var scrollPosition = window.scrollY + window.innerHeight / 2;
        var activeHeader = null;

        headers.forEach(function(header, index) {
            var headerTop = header.offsetTop;
            var nextHeaderTop = (index + 1 < headers.length) ? headers[index + 1].offsetTop : document.documentElement.scrollHeight;

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

    // Functie om de TOC zichtbaar te maken of te verbergen afhankelijk van de zoom
    function handleZoom() {
        var zoomLevel = detectZoom();
        if (zoomLevel > 1.2) {
            toc.style.display = 'none'; // Verberg de TOC bij te hoge zoom
        } else {
            toc.style.display = 'block'; // Toon de TOC bij normaal zoomniveau
        }
    }

    // Event listener voor scrollen
    window.addEventListener('scroll', function() {
        updateTocPosition();
        updateActiveSection();
    });

    // Event listener voor het wijzigen van de venstergrootte of zoom
    window.addEventListener('resize', function() {
        handleZoom();
        updateTocPosition();
        updateActiveSection();
    });

    // Initieel de TOC-positie, actieve sectie, en zoomniveau bijwerken
    handleZoom();
    updateTocPosition();
    updateActiveSection();
});
