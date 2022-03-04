import tmpl from './image.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

export interface ImageProps {
  src: string,
  class?: string,
  events?: {
    click: (e: Event) => void
  }
}

export class Image extends Block {
  constructor(props: ImageProps) {
    super('image', props);
  }

  render() {
    // // this.element.dataset.id = this.getId();
    // console.log(this);
    return compile(tmpl, this.props);
  }
}
