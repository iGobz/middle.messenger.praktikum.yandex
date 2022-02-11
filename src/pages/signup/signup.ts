import tmpl from './signup.hbs';

import Block from '../../utils/block';
import { Label, Input, Button } from '../../components';

import compile from '../../utils/compile';
import { isValid } from '../../utils/validator';
import { renderDOM } from '../../utils/renderdom';

export class Signup extends Block {
  constructor(props: any) {
    super('div', props);
  }

  _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(element)) {
      element.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
    }
  }

  render() {
    
    const inputEmail = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-email']}`,
      name: 'email',
      validationType: 'email',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputLogin = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-login']}`,
      name: 'login',
      validationType: 'login',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputFirstName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-first-name']}`,
      name: 'first_name',
      validationType: 'name',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputSecondName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-second-name']}`,
      name: 'second_name',
      validationType: 'name',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputPhone = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-phone']}`,
      name: 'phone',
      validationType: 'phone',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });

    const inputPassword = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['input-password']}`,
      name: 'password',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputPassword2 = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['input-password']}`,
      name: 'password2',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });


    const buttonSignup = new Button({
      text: 'Зарегистрироваться',
      class: `${this.props.styles.button} ${this.props.styles['signup-form-button-primary']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [
            inputEmail, inputLogin, inputFirstName, inputSecondName, 
            inputPhone, inputPassword, inputPassword2,
          ];

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
            renderDOM('#app', this.props.buttonClickSignup);
          }
        },
      },
    });
    const buttonLogin = new Button({
      text: 'Войти',
      class: `${this.props.styles.button} ${this.props.styles['signup-form-button-secondary']}`,
      events: {
        click: (e) => { e.preventDefault(); renderDOM('#app', this.props.buttonClickLogin); },
      },
    });

    const labelEmail = new Label({
      text: 'Почта',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelLogin = new Label({
      text: 'Логин',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelFirstName = new Label({
      text: 'Имя',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelSecondName = new Label({
      text: 'Фамилия',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPhone = new Label({
      text: 'Телефон',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPassword = new Label({
      text: 'Пароль',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPassword2 = new Label({
      text: 'Пароль (еще раз)',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });

    return compile(tmpl, {
      styles: this.props.styles,
      labelEmail,
      labelLogin,
      labelFirstName,
      labelSecondName,
      labelPhone,
      labelPassword,
      labelPassword2,
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputPassword2,
      buttonLogin,
      buttonSignup,
    });
  }
}
