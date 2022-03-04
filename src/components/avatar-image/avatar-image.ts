import { Image, ImageProps } from '../image';
import GlobalEventBus from '../../utils/globaleventbus';
import User from '../../utils/user';


export class AvatarImage extends Image {

  constructor(props: ImageProps) {
    super(props);

    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_CHANGEAVATAR_SUCCEED,
      this.onChangeAvatarSucceed.bind(this));
  }

  onChangeAvatarSucceed(xhr: XMLHttpRequest) {

    const user = JSON.parse(xhr.responseText);
    User.instance.setData({ avatar: user.avatar });
    
    this.setProps({
      src: 'https://ya-praktikum.tech/api/v2/resources' + user.avatar,
    });
  }
}
