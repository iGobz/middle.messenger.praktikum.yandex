import tmpl from './conversation.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

import { Link, Input } from '../../components';
import { isValid } from '../../utils/validator';

export class Conversation extends Block {
  constructor(props: any) {
    super('div', props);
  }

  render() {
    const inputMessage = new Input({
      type: 'textarea',
      class: `${this.props.styles.input} ${this.props.styles['input-conversation-message-box']}`,
      name: 'message',
      placeholder: 'Сообщение',
    });

    const linkSend = new Link({
      class: this.props.styles['arrow-button'],
      imageBeforeClass: this.props.styles['send-button'],
      imageBeforeSrc: this.props.icons.arrow,
      events: {
        click: () => {
          const inputs = [inputMessage];

          const formData: { [index: string]: any } = {};
          let isFormValid = true;
          inputs.map((input) => {
            const el = input.element as HTMLInputElement;
            if (!isValid(el)) {
              isFormValid = false;
              el.classList.add(this.props.styles['input-error']);
            } else {
              const name = el.getAttribute('name');
              const { value } = el;
              if (name) {
                formData[name] = value;
              }
            }
          });
          if (isFormValid) {
            console.log(formData);
          }
        },
      },
    });

    return compile(tmpl, {
      inputMessage,
      linkSend,
      ...this.props,
    });
  }
}
