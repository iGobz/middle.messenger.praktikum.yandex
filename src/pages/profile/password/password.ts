import tmpl from './password.hbs';
import Block from '../../../utils/block';
import {
  Label, Input, Button, Link,
} from '../../../components';

import compile from '../../../utils/compile';
import { isValid } from '../../../utils/validator';
import { renderDOM } from '../../../utils/renderdom';

export class ProfilePassword extends Block {
  constructor(props: any) {
    super('div', props);
  }

  _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(element)) {
      element.classList.add(this.props.styles['input-error']);
      element.previousElementSibling?.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
      element.previousElementSibling?.classList.remove(this.props.styles['input-error']);
    }

    if (element.name == 'newPassword2') {
      const password1 = (element.form?.elements as { [key: string]: any }).newPassword;
      if (password1 && element.value !== password1.value) {
        element.classList.add(this.props.styles['input-error']);
        element.previousElementSibling?.classList.remove(this.props.styles['input-error']);
      }
    }

  }

  render() {

    const inputOldPassword = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'oldPassword',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputNewPassword = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'newPassword',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputNewPassword2 = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'newPassword2',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });

    const linkProfilePasswordReturn = new Link({
      class: this.props.styles['arrow-button'],
      imageBeforeClass: this.props.styles['profile-return-button'],
      imageBeforeSrc: this.props.icons.arrowback,
      events: {
        click: () => { renderDOM('#app', this.props.arrowBack); },
      },
    });

    const buttonSave = new Button({
      text: 'Сохранить',
      class: `${this.props.styles.button} ${this.props.styles['profile-change-password-save-button']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [
            inputOldPassword, inputNewPassword, inputNewPassword2,
          ];

          const formData: { [index: string]: any } = {};
          let isFormValid = true;
          inputs.map((input) => {
            const el = input.element as HTMLInputElement;
            if (!isValid(el)) {
              isFormValid = false;
              el.classList.add(this.props.styles['input-error']);
              el.previousElementSibling?.classList.add(this.props.styles['input-error']);
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
            console.log('Save clicked');
          }
        },
      },
    });

    const labelOldPassword = new Label({
      text: 'Старый пароль',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelNewPassword = new Label({
      text: 'Новый пароль',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelNewPassword2 = new Label({
      text: 'Повторите новый пароль',
      class: this.props.styles['profile-info-field-name'],
    });

    return compile(tmpl, {
      styles: this.props.styles,
      images: this.props.images,
      labelOldPassword,
      labelNewPassword,
      labelNewPassword2,
      inputOldPassword,
      inputNewPassword,
      inputNewPassword2,
      linkProfilePasswordReturn,
      buttonSave,
    });
  }
}
