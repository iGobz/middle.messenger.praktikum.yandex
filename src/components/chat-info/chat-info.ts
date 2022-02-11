import tmpl from './chat-info.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface ChatInfoProps {
  images: Record<string, any>,
  styles: Record<string, any>,
  name: string,
  time: string,
  text: string,
  unread: number | string | undefined,
  events?: {
    click: () => void
  }
}

export class ChatInfo extends Block {
  constructor(props: ChatInfoProps) {
    super('div', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
