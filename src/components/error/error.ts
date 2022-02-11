import tmpl from './error.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

import * as styles from './error.scss';

interface ErrorProps {
  code: number,
  message: string,
}

export class ErrorComponent extends Block {
  constructor(props: ErrorProps) {
    super('button', props);
  }

  render() {
    return compile(tmpl, {
      styles,
      ...this.props,
    });
  }
}
