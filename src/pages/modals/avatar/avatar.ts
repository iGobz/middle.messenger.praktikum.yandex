import tmpl from './avatar.hbs';
import Block from '../../../utils/block';
import compile from '../../../utils/compile';
import { Button } from '../../../components';

export class ModalAvatar extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => this.hideModal(e),
      },
    });
  }

  hideModal(e: Event) {
    const el = e.target as HTMLElement;
    if (!el) {
      return false;
    }
    if (el.classList.contains(this.props.styles['modal-container'])) {
      this.hide();
    }
  }

  render() {
    const buttonChange = new Button({
      text: 'Поменять',
      class: `${this.props.styles.button} ${this.props.styles['avatar-modal-change-avatar']}`,
      events: {
        click: (e) => { console.log(`${e.target} button clicked`); },
      },
    });

    return compile(tmpl, {
      buttonChange,
      ...this.props,
    });
  }
}
