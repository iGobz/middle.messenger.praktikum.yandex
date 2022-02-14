import tmpl from './login.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

import { Label, Input, Button } from '../../components';
import { isValid } from '../../utils/validator';
import { renderDOM } from '../../utils/renderdom';

export class Login extends Block {
  constructor(props: any) {
    super('div', props);
  }

  private _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(element)) {
      element.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
    }
  }

  render() {

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

    const buttonLogin = new Button({
      text: 'Авторизоваться',
      class: `${this.props.styles.button} ${this.props.styles['login-form-button-primary']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [inputLogin, inputPassword];

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
            renderDOM('#app', this.props.buttonClickLogin);
          }
        },
      },
    });
    const buttonSignup = new Button({
      text: 'Нет аккаунта?',
      class: `${this.props.styles.button} ${this.props.styles['login-form-button-secondary']}`,
      events: {
        click: (e) => { e.preventDefault(); renderDOM('#app', this.props.buttonClickSignup); },
      },
    });

    const labelLogin = new Label({
      text: 'Логин',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPassword = new Label({
      text: 'Пароль',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });

    return compile(tmpl, {
      styles: this.props.styles,
      buttonLogin,
      buttonSignup,
      labelLogin,
      labelPassword,
      inputLogin,
      inputPassword,
    });
  }
}
