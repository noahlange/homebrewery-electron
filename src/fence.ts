import { assign, escapeHtml, unescapeAll } from 'markdown-it/lib/common/utils';

export default function divfence(md) {
  md.renderer.rules['fence'] = function(tokens, idx, options, env, slf) {
    var token = tokens[idx],
      info = token.info ? unescapeAll(token.info).trim() : '',
      langName = '',
      highlighted,
      i,
      tmpAttrs,
      tmpToken;

    if (info) {
      langName = info.split(/\s+/g)[0];
    }

    if (options.highlight) {
      highlighted =
        options.highlight(token.content, langName) || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }

    // If language exists, inject class gently, without modifying original token.
    // May be, one day we will add .clone() for token and simplify this part, but
    // now we prefer to keep things local.
    if (info) {
      i = token.attrIndex('class');
      tmpAttrs = token.attrs ? token.attrs.slice() : [];

      if (i < 0) {
        tmpAttrs.push(['class', 'block block-' + langName]);
      } else {
        tmpAttrs[i][1] += ' ' + 'block block-' + langName;
      }

      // Fake token just to render attributes
      tmpToken = {
        attrs: tmpAttrs
      };

      return (
        '<div' + slf.renderAttrs(tmpToken) + '>' + highlighted + '</div>\n'
      );
    }

    return (
      '<div class="block"' +
      slf.renderAttrs(token) +
      '>' +
      highlighted +
      '</div>\n'
    );
  };
}
