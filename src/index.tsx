import * as React from 'react';
import { render } from 'react-dom';
import Editor from './editor';
import Preview from './preview';
import { ipcRenderer } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const text = readFileSync(resolve(__dirname, '../example.md'), 'utf8');

class App extends React.Component<any, any> {
  public state = { value: text, initial: text };

  public componentDidMount() {
    ipcRenderer.on('save', (e, file) => writeFileSync(file, this.state.value, 'utf8'));
    ipcRenderer.on('open', (e, file) => this.setState({ initial: readFileSync(file, 'utf8') }));
  }

  public onChange = (editor, metadata, value) => {
    this.setState({ value });
  }

  public render() {
    return <div className="flex">
      <div className="editor">
        <Editor onChange={ this.onChange } value={ this.state.initial } />
      </div>
      <div className="preview">
        <Preview value={ this.state.value } />
      </div>
    </div>
  }
}

render(<App/>, document.getElementById('react-root'));
