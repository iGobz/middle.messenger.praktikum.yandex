import tmpl from './info.hbs';
import Block from '../../../utils/block';
import compile from '../../../utils/compile';

import { Link, Avatar } from '../../../components';
import { renderDOM } from '../../../utils/renderdom';

export class ProfileInfo extends Block {
  constructor(props: any) {
    super('div', props);
  }

  render() {
    const changeAvatar = new Avatar({
      ...this.props,
      events: {
        click: () => { renderDOM('#modal', this.props.linkChangeAvatar); },
      },
    });

    const linkProfileReturn = new Link({
      class: this.props.styles['arrow-button'],
      imageBeforeClass: this.props.styles['profile-return-button'],
      imageBeforeSrc: this.props.icons.arrowback,
      events: {
        click: () => { renderDOM('#app', this.props.arrowBack); },
      },
    });

    const linkChangeInfo = new Link({
      class: this.props.styles['profile-info-link-change-info'],
      text: 'Изменить данные',
      events: {
        click: () => { renderDOM('#app', this.props.linkClickChangeInfo); },
      },
    });
    const linkChangePassword = new Link({
      class: this.props.styles['profile-info-link-change-password'],
      text: 'Изменить пароль',
      events: {
        click: () => { renderDOM('#app', this.props.linkClickChangePassword); },
      },
    });
    const linkExit = new Link({
      class: this.props.styles['profile-info-link-exit'],
      text: 'Выйти',
      events: {
        click: () => { renderDOM('#app', this.props.linkClickExit); },
      },
    });

    return compile(tmpl, {
      changeAvatar,
      linkProfileReturn,
      linkChangeInfo,
      linkChangePassword,
      linkExit,
      ...this.props,
    });
  }
}
