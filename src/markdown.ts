import * as Markdown from 'markdown-it';
import * as sanitize from 'sanitize-html';
import fence from './fence';

const md = new Markdown({
  html: true,
  typographer: true,
  xhtmlOut: true,
  highlight: code => md.render(code)
}).use(fence);

export default function render(text: string) {
  text = text.replace('\\col', '<div class="col-break"></div>');
  const html = md.render(text);
  return sanitize(html, {
    allowedTags: [ 'h1', 'h2', 'img', ...sanitize.defaults.allowedTags ],
    allowedAttributes: {
      a: ['href'],
      div: ['class'],
      img: [ 'src' ]
    },
    allowedClasses: [
      'page-number',
      'footnote'
    ]
  });
}
