import {
  Login, Signup, Chat, Conversation, ProfileInfo, ProfileChange, ProfilePassword, ModalAvatar,
} from './pages';

import { renderDOM } from './utils/renderdom';

import * as styles from './styles.scss';
import images from '../static/images/avatar.jpg';
import icons from '../static/icons/*.svg';


const assets = { styles, icons, images };

const login = new Login(assets);

const signup = new Signup(assets);

const chat = new Chat(assets);

const profileInfo = new ProfileInfo(assets);

const profileChange = new ProfileChange(assets);

const profilePassword = new ProfilePassword(assets);

const conversation = new Conversation(assets);

const modalAvatar = new ModalAvatar(assets);



login.setProps({
  buttonClickSignup: signup,
  buttonClickLogin: chat,
});
signup.setProps({
  buttonClickLogin: login,
  buttonClickSignup: chat,
});
chat.setProps({
  openProfile: profileInfo,
  openConversation: conversation,
});
profileInfo.setProps({
  arrowBack: chat, 
  changeInfo: profileChange,
  changePassword: profilePassword, 
  linkChangeAvatar: modalAvatar,
  linkClickExit: login,
});
profileChange.setProps({
  arrowBack: profileInfo,
});

profilePassword.setProps({
  arrowBack: profileInfo,
});

renderDOM('#app', login);
