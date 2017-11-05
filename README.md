# Homebrewery Electron
[stolksdorf's](https://github.com/stolksdorf) Homebrewery app, on your desktop,
with some twists.

```
git clone https://github.com/noahlange/homebrewery-electron.git
cd homebrewery-electron
yarn
yarn build
yarn start
```

## Outstanding Issues
- clean up UI
- smart page rendering (for larger documents)
- text snippets

## Configuring
- specify preferred codemirror theme in index.html
- specify preferred editor font in styles.css

## Caveats
- it's currently designed for Mac, so if it looks like crap, you're welcome to
  fix it and open a PR. I probably won't spend oodles of time making it look
  nice on Windows + Linux.

## Syntax
Syntax is slightly different. Instead of being determined with a combinations of
blockquotes, line rules and other things, everything that isn't plain text or a
simple table is enclosed in triple backticks - like a code block.

However, instead of a language, each block is given a name that corresponds to
some particular kind of styling.

| Block       | Name              | CSS class                       |
|:-----------:|:-----------------:|:-------------------------------:|
| Spell list  | spells            | .block-spells                   |
| Descriptive | descriptive       | .block-descriptive              |
| Stat Block  | stats, stats-wide | .block-stats, .block-stats-wide |
| Class Table | class, class-wide | .block-class, .block-class-wide |
| Table       | table, table-wide | .block-table, .block-table-wide |
| TOC         | toc               | .block-toc                      |