import tmpl from './avatar.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';
import User from '../../utils/user';
import { AvatarImage } from '../avatar-image';

interface AvatarProps {
  events?: {
    click: (e: Event) => {}
  }
}

export class Avatar extends Block {

  _avatarImage: AvatarImage;

  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {


    const src = User.instance.getData('avatar') 
                ? 'https://ya-praktikum.tech/api/v2/resources' + User.instance.getData('avatar')
                : this.props.icons.user;

    const avatarImage = new AvatarImage({
      class: this.props.styles['profile-avatar-image'],
      src: src,
    });

    this._avatarImage = avatarImage;

    return compile(tmpl, {
      avatarImage,
      ...this.props,
    });
  }
}
