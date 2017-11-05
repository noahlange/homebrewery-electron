import * as Markdown from 'marked';
const renderer = new Markdown.Renderer();

renderer.html = html => {
  const start = html.trim().substring(0, 4);
	const end = html.trim().slice(-6);
	if (start === '<div' && end === '</div>') {
		var openTag = html.substring(0, html.indexOf('>') + 1);
		html = html.substring(html.indexOf('>')+1);
		html = html.substring(0, html.lastIndexOf('</div>'));
		return `${openTag} ${Markdown(html)} </div>`;
	}
	return html;
};

export default function render(text: string) {
  return Markdown(text, { renderer });
}