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

## Changes
Syntax is slightly different. Instead of being determined with a combinations
of blockquotes, line rules and other things, everything that isn't plain text
or a one-column table is enclosed in triple backticks - like a code block in
standard Markdown.

However, instead of a language, each block is given a name that corresponds to
some particular kind of styling. These blocks can be custom for each theme; you
should check the theme's README for a list of blokc types.