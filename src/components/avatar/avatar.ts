import tmpl from './avatar.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface AvatarProps {
  events?: {
    click: (e: Event) => {}
  }
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
