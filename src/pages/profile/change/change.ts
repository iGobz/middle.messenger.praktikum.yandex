import tmpl from './change.hbs';
import Block from '../../../utils/block';
import {
  Label, Input, Button, Link,
} from '../../../components';

import compile from '../../../utils/compile';
import { isValid } from '../../../utils/validator';
import { renderDOM } from '../../../utils/renderdom';

export class ProfileChange extends Block {
  constructor(props: any) {
    super('div', props);
  }

  _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(event.target as HTMLInputElement)) {
      element.classList.add(this.props.styles['input-error']);
      element.previousElementSibling?.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
      element.previousElementSibling?.classList.remove(this.props.styles['input-error']);
    }
  }

  render() {
    const inputEmail = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'email',
      validationType: 'email',
      value: 'email@yandex.ru',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputLogin = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'login',
      validationType: 'login',
      value: 'ivanivanov',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputFirstName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'first_name',
      validationType: 'name',
      value: 'Иван',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputSecondName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'second_name',
      validationType: 'name',
      value: 'Иванов',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputDisplayName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'display_name',
      validationType: 'name',
      value: 'Иван',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputPhone = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'phone',
      validationType: 'phone',
      value: '+79991112233',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
      
    const linkProfileChangeReturn = new Link({
      class: this.props.styles['arrow-button'],
      imageBeforeClass: this.props.styles['profile-return-button'],
      imageBeforeSrc: this.props.icons.arrowback,
      events: {
        click: () => { renderDOM('#app', this.props.arrowBack); },
      },
    });

    const buttonSave = new Button({
      text: 'Сохранить',
      class: `${this.props.styles.button} ${this.props.styles['profile-change-save-button']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [
            inputEmail, inputLogin, inputFirstName, inputSecondName, inputPhone, inputDisplayName,
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

    const labelEmail = new Label({
      text: 'Почта',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelLogin = new Label({
      text: 'Логин',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelFirstName = new Label({
      text: 'Имя',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelSecondName = new Label({
      text: 'Фамилия',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelDisplayName = new Label({
      text: 'Имя в чате',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelPhone = new Label({
      text: 'Телефон',
      class: this.props.styles['profile-info-field-name'],
    });

    return compile(tmpl, {
      styles: this.props.styles,
      images: this.props.images,
      labelEmail,
      labelLogin,
      labelFirstName,
      labelSecondName,
      labelDisplayName,
      labelPhone,
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputDisplayName,
      inputPhone,
      linkProfileChangeReturn,
      buttonSave,
    });
  }
}
