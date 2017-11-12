import * as React from 'react';
import { render } from 'react-dom';
import Editor from './editor';
import Preview from './preview';
import { ipcRenderer as ipc } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as Store from 'electron-store';
const store = new Store();

class App extends React.Component<any, any> {
  public state = {
    value: '',
    variant: store.get('theme.variant', ''),
    edition: store.get('theme.id', 'tufte'),
    css: store.get('theme.css', '../assets/tufte.css')
  };

  public componentDidMount() {
    ipc.on('save', (e, file) =>
      writeFileSync(file, this.state.value, 'utf8')
    );
    ipc.on('open', (e, file) =>
      this.setState({ value: readFileSync(file, 'utf8') })
    );
    ipc.on('theme.variant', (e, variant) => this.setState({ variant }));
    ipc.on('theme.id', (e, edition) => this.setState({ edition }));
    ipc.on('theme.css', (e, css) => this.setState({ css }));
  }

  public onChange = (value, e) => this.setState({ value });

  public render() {
    return (
      <div className="flex">
        <div className="editor">
          <Editor
            onChange={this.onChange}
            value={this.state.value}
          />
        </div>
        <div className={`preview ${ this.state.edition } ${this.state.variant}`}>
          <Preview value={this.state.value} />
        </div>
        <link type="text/css" rel="stylesheet" href={ this.state.css } />
      </div>
    );
  }
}

render(<App />, document.getElementById('react-root'));
