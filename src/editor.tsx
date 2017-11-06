import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/gfm/gfm';

export default class Editor extends React.Component<any, any> {
  public render() {
    return (
      <CodeMirror
        options={{ mode: 'gfm', lineNumbers: true, lineWrapping: true, theme: this.props.theme }}
        value={ this.props.value }
        onChange={this.props.onChange}
      />
    );
  }
}
