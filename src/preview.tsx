import * as React from 'react';
import markdown from './markdown';

export default class Preview extends React.Component<any, any> {
  public renderPage(text: string, i: number) {
    return (
      <div
        className="phb"
        key={i}
        dangerouslySetInnerHTML={{ __html: markdown(text) }}
      />
    );
  }

  public renderPages() {
    return this.props.value
      .split('\\page')
      .map((page, i) => this.renderPage(page, i));
  }

  public render() {
    return <div>{this.renderPages()}</div>;
  }
}
