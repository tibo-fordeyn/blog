# article 1

Works perfectly, just install vim, install vim-plug with given link, install markdown. Then follow along.
sudo apt install vim markdown
sudo pacman -S vim markdown
+ add plug.vim file in autoload folder, like explained in link.

How to exactly download more snippets isn't explicitly mentioned. Only linked to recouces. So just follow those links.

install pandoc
sudo apt install pandoc
sudo pacman -S install pandoc

for the last part, install mupdf
sudo apt install mupdf
sudo pacman -S install mupdf

make sure to have pdflatex installed as well.
sudo apt-get install texlive-full
This will install the full version. Only the base is really needed for this though.
sudo pacman -S texlive-core

# article 2 
Voor dit artikel, als je ooit wilt uitbreiden, ik wil die symlinks automatisch updaten. Lijkt niet moeilijk, maar het is echt lastig om de mappen juist te identificeren.
Ik ga voorlopig gewoon niets zeggen overde symlink, behalve dat die bestaat, want het is eigenlijk toch niet zo belangrijk.
Idee:
Je maakt een lijst met alle mogelijke vakken die je hebt op dat moment, en dan geef je met
leader us "update symlink"
je pad mee aan een functie, die dan controleert of één van de mappen in je pad gelijk is aan die vaknaam, en als dat zo is, voert het gewoon dat commando uit met die vaknaam.
Dat is bijna waterdicht, kan enkel mislopen als je ooit twee keer exact dezelfde vaknaam hebt en dan wordt de symlink nutteloos veranderd.
Maar is vrij goed, je moet denken dat er geen erge gevolgen zijn, ergste dat kan gebeuren is dat enkele screenshots in een verkeerde map komen.


Je kunt daarna ook de demo aanpassen om te tonen hoe je de symlink doet werken, en hoe de mappen eruitzien. Maar eigenlijk moet dat echt niet perse, en op dat punt ben je echt gewoon met twee onderwerpen bezig.

Je kunt daarmee dan de hele post uitbreiden en ook gewoon over andere afbeeldingen hun pasting praten.
