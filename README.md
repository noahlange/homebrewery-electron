![Homebrewery](assets/icon.png)

# Homebrewery Electron
[stolksdorf's](https://github.com/stolksdorf) Homebrewery app, on your desktop,
with some twists.

![Homebrewery Desktop](https://i.imgur.com/XXw3gJb.jpg)

```
git clone https://github.com/noahlange/homebrewery-electron.git
cd homebrewery-electron
yarn
yarn build
yarn start
```

If you're using NPM, the installation process is nearly identical.

```
git clone https://github.com/noahlange/homebrewery-electron.git
cd homebrewery-electron
npm install
npm run build
npm run start
```

## Fonts
Fonts, of course, are a perennially sticky issue. Most of them have free
alternatives available. Most of those will have restrictions on their public
use. It's recommended to consult the copyright holders or creators before
publicly distributing PDFs generated with the Homebrewery.

| Font                 | Role         | Edition  | Alternatives                                                           | Personal/Commercial Use |
|:---------------------|:------------:|:--------:|:-----------------------------------------------------------------------|------------------------:|
| Pterra               | Headings     | 3.5E     | [Pterra-dactyl](http://www.fontpalace.com/font-download/Pterra-dactyl) | ???                     |
| Celestia Antique     | Body         | 3.5E     | [Ugly Qua](https://www.fontsquirrel.com/fonts/UglyQua)                 | Yes, Yes                |
| Scala Sans           | Sidebar/Sans | 3.5E, 5E | Scaly Sans / Alegreya Sans                                             | Yes, ??? / Yes, Yes     |
| DnDLolthSCC          | Headings     | 4E       | [Ravenna](http://www.fontpalace.com/font-details/Ravenna/)             | ???                     |
| Mentor               | Body         | 4E       | [Utopia](https://ghostscript.com/~tor/stuff/fonts/utopia/)             | Yes / Yes               |
| Mentor Sans          | Body         | 4E       | [Belleza](https://fonts.google.com/specimen/Belleza)                   | Yes / Yes               |
| Modesto              | Title        | 5E       | Nodesto                                                                | Yes / ???               |
| Mrs. Eaves           | Headings     | 5E       | Mr. Eaves                                                              | Yes / ???               |
| Bookman              | Body         | 5E       | Bookmania                                                              | Yes / ???               |
| Dai Vernon Misdirect | Quote        | 5E       | Zatanna Misidrection                                                   | Yes / ???               |
| ???                  | Drop         | 5E       | Solbera                                                                | Yes / ???               |

- [list of TSR-era fonts](https://www.kirith.com/tsr-fonts/)
- [another list of TSR fonts](http://www.hahnlibrary.net/rpgs/tsrfonts.html)
- [list of 3.5e fonts](http://www.enworld.org/forum/showthread.php?269337-Font-used-in-the-D-amp-D-3-5-PHB-DMG-and-MM&p=5028438&viewfull=1#post5028438)
- [list of 4e fonts](http://taxidermicowlbear.weebly.com/dd-fonts.html)
- Solbera's 5e fonts included

## Outstanding Issues
- add AD&D, 2nd Edition themes
- color themes for 3.5E + 4E
- clean up 3.5E, 4E themes + add graphics
- clean up UX
- smarter page rendering (for larger documents)
- text snippets
- implement some sort of font management features

## Caveats
- it's currently designed for Mac, so if it looks like crap, you're welcome to
  fix it and open a PR. I probably won't spend oodles of time making it look
  nice on Windows + Linux.

## Syntax
Syntax is slightly different. Instead of being determined with a combinations of
blockquotes, line rules and other things, everything that isn't plain text or a
one-column table is enclosed in triple backticks - like a code block.

However, instead of a language, each block is given a name that corresponds to
some particular kind of styling.

| Block       | Name              | CSS class                       | Edition  |
|:-----------:|:-----------------:|:-------------------------------:|:--------:|
| Spell list  | spells            | .block-spells                   | 5e       |
| Note        | note              | .block-note                     | 5e       |
| Descriptive | descriptive       | .block-descriptive              | 5e       |
| Stat Block  | stats, stats-wide | .block-stats, .block-stats-wide | 5e       |
| Class Table | class, class-wide | .block-class, .block-class-wide | 5e       |
| Table       | table, table-wide | .block-table, .block-table-wide | 5e       |
| TOC         | toc               | .block-toc                      | 5e       |
| Sidebar     | sidebar           | .block-sidebar                  | 3.5e, 4e |
| Wide Sidebar| sidebar-wide      | .block-sidebar-wide             | 3.5e, 4e |