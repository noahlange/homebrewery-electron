import * as React from 'react';
import * as fm from 'front-matter';
import { autobind } from 'core-decorators';
import { debounce, throttle } from 'lodash-decorators';

import { ipcRenderer as ipc } from 'electron';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import * as WebView from 'react-electron-web-view';
import Editor from './editor';

export default class App extends React.Component<any, any> {
  public preview: WebView;
  public state = {
    value: '',
    theme: 'markwright',
    themes: ['markwright'],
    noSuchTheme: false,
    noSuchThemeName: ''
  };

  public componentDidMount() {
    this.preview = document.querySelector('webview');
    ipc.on('save', (e, file) => writeFileSync(file, this.state.value, 'utf8'));
    ipc.on('open', (e, file) =>
      this.setState({ value: readFileSync(file, 'utf8') })
    );

    const paths = readdirSync(resolve(__dirname, '../assets/themes'));
    this.setState({ themes: paths.filter(f => !f.startsWith('.')) });
  }

  @debounce(200)
  @autobind
  public onChange(value, e) {
    const { attributes, body } = fm(value);
    this.setState({ value }, this.preview.send('editor.change', body));
    this.preview.send('editor.variant', attributes.variant || '');
    if (attributes.theme) {
      if (this.state.themes.includes(attributes.theme)) {
        this.setState({ theme: attributes.theme, noSuchTheme: false });
        this.preview.send('editor.theme', attributes.theme);
      } else {
        this.setState({ noSuchTheme: true, noSuchThemeName: attributes.theme });
      }
    } else if (this.state.theme !== 'markwright') {
      this.setState({ theme: 'markwright', noSuchTheme: false });
      this.preview.send('editor.theme', 'markwright');
    }
  }

  public render() {
    return (
      <div className="flex">
        <div className="editor">
          <Editor onChange={this.onChange} value={this.state.value} />
        </div>
        <div className="preview">
          { this.state.noSuchTheme
            ? <div className="bbod">
              <div>
                <h2>Additional theme required!</h2>
                <p>The theme "{ this.state.noSuchThemeName }" was not found in the application's "assets/themes" directory. You should probably download it if you want to use it.</p>
              </div>
            </div>
            : null
          }
          <WebView
            autosize
            nodeintegration
            blinkfeatures="OverlayScrollbars"
            src={resolve(__dirname, '../public/preview.html')}
          />
        </div>
      </div>
    );
  }
}
