import tmpl from './password.hbs';
import Block from '../../../utils/block';
import { Label, Input, Button, Link } from '../../../components';

import compile from '../../../utils/compile';
import { isValid } from '../../../utils/validator';
import { renderDOM } from '../../../utils/renderdom';

export class ProfilePassword extends Block {

    constructor(props: any ) {
      super("div", props);
    }

    _onFocusChange(event: Event) {
      const element = event.target as HTMLInputElement;
      if(!isValid(event.target as HTMLInputElement)) {
          if(!element.classList.contains(this.props.styles['input-error'])) {
              element.classList.add(this.props.styles['input-error']);
          }
          if(!element.previousElementSibling?.classList.contains(this.props.styles['input-error'])) {
            element.previousElementSibling?.classList.add(this.props.styles['input-error']);
          }
      }
      else {
          element.classList.remove(this.props.styles['input-error']);
          element.previousElementSibling?.classList.remove(this.props.styles['input-error']);
        }
    }
     
    render() {

        const linkProfilePasswordReturn = new Link({
            class: this.props.styles['arrow-button'],
            imageBeforeClass: this.props.styles['profile-return-button'],
            imageBeforeSrc: this.props.icons['arrowback'],
            events: {
                click: () => { renderDOM('#app', this.props.arrowBack); }
            }
        });
        
        const buttonSave = new Button({
            text: "Сохранить",
            class: this.props.styles['button'] + ' ' + this.props.styles['profile-change-password-save-button'],
            events: {
              click: (e) => {
                e.preventDefault();

                const inputs = [
                  inputOldPassword, inputNewPassword, inputNewPassword2
                ];

                let formData: { [index: string]: any } = {};
                let isFormValid = true;
                inputs.map((input) => {
                  const el = input.element as HTMLInputElement;
                  if(!isValid(el)) {
                    isFormValid = false;
                    el.classList.add(this.props.styles['input-error']);
                    el.previousElementSibling?.classList.add(this.props.styles['input-error']);
                  } else {
                    const name = el.getAttribute('name');
                    const value = el.value;
                    if(name) {
                      formData[name] = value;
                    }              
                  }
                });
                if(isFormValid) {
                  console.log(formData);
                  console.log('Save clicked');
                }
              }
            }
        });

        const labelOldPassword = new Label({
            text: "Старый пароль",
            class: this.props.styles['profile-info-field-name']
        });
        const labelNewPassword = new Label({
            text: "Новый пароль",
            class: this.props.styles['profile-info-field-name']
        });
        const labelNewPassword2 = new Label({
            text: "Повторите новый пароль",
            class: this.props.styles['profile-info-field-name']
        });

      
        const inputOldPassword = new Input({
            type: 'password',
            class: this.props.styles['input'] + ' ' + this.props.styles['profile-change-field-value'],
            name: 'oldPassword',
            validationType: 'password',
            events: {
              blur: this._onFocusChange.bind(this),
              focus: this._onFocusChange.bind(this)
            }
          });
          const inputNewPassword = new Input({
            type: 'password',
            class: this.props.styles['input'] + ' ' + this.props.styles['profile-change-field-value'],
            name: 'newPassword',
            validationType: 'password',
            events: {
              blur: this._onFocusChange.bind(this),
              focus: this._onFocusChange.bind(this)
            }
          });
          const inputNewPassword2 = new Input({
            type: 'password',
            class: this.props.styles['input'] + ' ' + this.props.styles['profile-change-field-value'],
            name: 'newPassword2',
            validationType: 'password',
            events: {
              blur: this._onFocusChange.bind(this),
              focus: this._onFocusChange.bind(this)
            }
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
        buttonSave
      });
    }
}
