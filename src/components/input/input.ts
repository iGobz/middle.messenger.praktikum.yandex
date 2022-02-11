import tmpl from './input.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface InputProps {
  type: string,
  name: string,
  class?: string,
  placeholder?: string,
  value?: string,
  validationType?: string,
  events?: {
    blur?: () => void,
    focus?: () => void
  }
};

export class Input extends Block {

    constructor(props: InputProps) {
      super("div", props);
    }
  
    render() {
        return compile(tmpl, this.props);
    }
}
