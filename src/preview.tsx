import { ipcRenderer as ipc } from 'electron';
import Markwright from 'markwright';
import * as React from 'react';
import { resolve } from 'path';
import * as Typography from 'typography';
import github from 'typography-theme-github';

export default class Preview extends React.Component<any, any> {
  public state = {
    content: '',
    theme: 'markwright',
    variant: '',
    css: ''
  };

  public componentDidMount() {
    ipc.on('editor.change', (e, content) => this.setState({ content }));
    ipc.on('editor.theme', (e, theme) => this.setState({ theme }));
    ipc.on('editor.variant', (e, variant) => this.setState({ variant }));
    this.setState({ css: new Typography(github).toString() });
  }

  public render() {
    const defaultTheme = this.state.theme === 'markwright';
    const path = resolve(
      __dirname,
      `../assets/themes/${ this.state.theme }/${ this.state.theme }.css`
    );
    return (
      <div className={ this.state.variant }>
        { defaultTheme
          ? <style type="text/css" data-no-css-polyfill>{ this.state.css }</style>
          : null 
        }
        <link
          rel="stylesheet"
          type="text/css"
          href={path}
        />
        <Markwright content={this.state.content} />
      </div>
    );
  }
}
