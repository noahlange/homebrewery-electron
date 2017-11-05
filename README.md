# Homebrewery Electron
The Homebrewery app, on your desktop.

## Build + Running
First you'll need to download the standalone CSS file to your application
directory. If you have cURL or wget, use those. Otherwise, open the URLs in
your browser and just download those puppies.

```
git clone https://github.com/noahlange/homebrewery-electron.git
cd homebrewery-electron
yarn
curl https://github.com/Silverwolf90/inconsolata-js-ligatures/blob/master/Inconsolata.otf?raw=true > Inconsolata.otf
curl https://raw.githubusercontent.com/stolksdorf/homebrewery/master/phb.standalone.css > phb.standalone.css
yarn build
yarn start
```

## Outstanding Issues
- clean up UI
- smart page rendering (for larger documents)
- text snippets
- libre fonts?

## Configuring
- specify your preferred codemirror theme in index.html
- specify your preferred editor font in styles.css

## Caveats
- it's currently designed for Mac, so if it looks like crap, you're welcome to
  fix it and open a PR. I probably won't spend oodles of time making it look
  nice on Windows + Linux.
- wouldn't recommend distributing exported PDFs without replacing fonts + assets