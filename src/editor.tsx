import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { resolve } from 'path';

export default class Editor extends React.Component<any, any> {

  public editor;

  public editorDidMount(editor, monaco) {
    this.editor = editor;
    this.editor.focus();
  }

	public handleResize = () => this.editor.layout();
  
  public componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  public render() {
    const requireConfig = {
      url: resolve(__dirname, '../node_modules/monaco_editor/min/vs/loader.js'),
      paths: {
        'vs': resolve(__dirname, '../node_modules/monaco_editor/min/vs')
      }
    };
    return (
      <MonacoEditor
        width="calc(100vw - 8.5in)"
        height="1050"
        theme="vs-dark"
        language="markdown"
        options={ { wordWrap: true } }
        onChange={ this.props.onChange }
        editorDidMount={ (e, m) => this.editorDidMount(e, m) }
        defaultValue={ this.props.value }
      />
    );
  }
}