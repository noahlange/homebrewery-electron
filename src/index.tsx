import * as React from 'react';
import { render } from 'react-dom';
import Editor from './editor';
import Preview from './preview';
import { ipcRenderer } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as Store from 'electron-store';
const store = new Store();

const text = readFileSync(resolve(__dirname, '../example.md'), 'utf8');

class App extends React.Component<any, any> {
  public state = {
    value: text,
    initial: text,
    editorTheme: store.get('theme.editor', 'railscasts'),
    previewTheme: store.get('theme.preview', 'green')
  };

  public updateTheme() {
    document
      .getElementById('theme')
      .setAttribute(
        'href',
        `./node_modules/codemirror/theme/${this.state.editorTheme}.css`
      );
  }

  public componentDidMount() {
    this.updateTheme();
    ipcRenderer.on('save', (e, file) =>
      writeFileSync(file, this.state.value, 'utf8')
    );
    ipcRenderer.on('open', (e, file) =>
      this.setState({ initial: readFileSync(file, 'utf8') })
    );
    ipcRenderer.on('theme.preview', (e, file) =>
      this.setState({ previewTheme: file })
    );
    ipcRenderer.on('theme.editor', (e, editorTheme) => {
      this.setState({ editorTheme }, () => this.updateTheme());
    });
  }

  public onChange = (editor, metadata, value) => {
    this.setState({ value });
  };

  public render() {
    return (
      <div className="flex">
        <div className="editor">
          <Editor
            onChange={this.onChange}
            value={this.state.initial}
            theme={this.state.editorTheme}
          />
        </div>
        <div className={`preview ${this.state.previewTheme}`}>
          <Preview value={this.state.value} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('react-root'));
