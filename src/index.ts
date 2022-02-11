import Block from './utils/block';
import {
  Login, Signup, Chat, Conversation, ProfileInfo, ProfileChange, ProfilePassword, ModalAvatar,
} from './pages';

import { renderDOM } from './utils/renderdom';

import * as styles from './styles.scss';
import images from '../static/images/avatar.jpg';
import icons from '../static/icons/*.svg';

type RoutingType = {
  loginPage: {
    buttonSignup: Block,
    buttonLogin: Block
  },
  signupPage: {
    buttonSignup: Block,
    buttonLogin: Block
  },
  chatPage: {
    openProfile: Block,
    openConversation: Block
  },
  profileInfo: {
    arrowBack: Block,
    changeInfo: Block,
    changePassword: Block,
    linkClickExit: Block,
    changeAvatar: Block
  },
  profileChange: {
    arrowBack: Block
  },
  profilePassword: {
    arrowBack: Block
  },
};

const assets = { styles, icons, images };

const login = new Login(assets);

const signup = new Signup(assets);

const chat = new Chat(assets);

const profileInfo = new ProfileInfo(assets);

const profileChange = new ProfileChange(assets);

const profilePassword = new ProfilePassword(assets);

const conversation = new Conversation(assets);

const modalAvatar = new ModalAvatar(assets);

const routing: RoutingType = {
  loginPage: {
    buttonLogin: chat,
    buttonSignup: signup,
  },
  signupPage: {
    buttonLogin: login,
    buttonSignup: chat,
  },
  chatPage: {
    openProfile: profileInfo,
    openConversation: conversation,
  },
  profileInfo: {
    arrowBack: chat,
    changeInfo: profileChange,
    changePassword: profilePassword,
    changeAvatar: modalAvatar,
    linkClickExit: login,
  },
  profileChange: {
    arrowBack: profileInfo,
  },
  profilePassword: {
    arrowBack: profileInfo,
  },
};

login.setProps({
  buttonClickSignup: routing.loginPage.buttonSignup,
  buttonClickLogin: routing.loginPage.buttonLogin,
});
signup.setProps({
  buttonClickLogin: routing.signupPage.buttonLogin,
  buttonClickSignup: routing.signupPage.buttonSignup,
});
chat.setProps({
  openProfile: routing.chatPage.openProfile,
  openConversation: routing.chatPage.openConversation,
});
profileInfo.setProps({
  arrowBack: routing.profileInfo.arrowBack,
  linkClickChangeInfo: routing.profileInfo.changeInfo,
  linkClickChangePassword: routing.profileInfo.changePassword,
  linkClickExit: routing.profileInfo.linkClickExit,
  linkChangeAvatar: routing.profileInfo.changeAvatar,
});
profileChange.setProps({
  arrowBack: routing.profileChange.arrowBack,
});

profilePassword.setProps({
  arrowBack: routing.profilePassword.arrowBack,
});

renderDOM('#app', login);
