import tmpl from './chat.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

import { Link, Input, ChatInfo } from '../../components';
import { isValid } from '../../utils/validator';
import { renderDOM } from '../../utils/renderdom';
import GlobalEventBus from '../../utils/globaleventbus';
import { ModalCreateChat } from '../modals';
import User from '../../utils/user';
import { Conversation } from '../conversation';

export interface ChatInfoData {
    id: number,
    title: string,
    avatar: string,
    unread_count: number | undefined,
    last_message?: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string,
        }
        time: string,
        content: string,
    }
}

export class Chat extends Block {

    private _chatInfos: ChatInfo[];

    constructor(props: any) {
        super('div', props);

        this.g.EventBus.on(
            GlobalEventBus.EVENTS.ACTION_GETCHATS_SUCCEED,
            this._onGetChatsSucceed.bind(this));
        this.g.EventBus.on(
            GlobalEventBus.EVENTS.ACTION_GETCHATTOKEN_SUCCEED,
            this._onGetChatTokenSucceed.bind(this));

        // this.g.EventBus.on(
        //     GlobalEventBus.EVENTS.ACTION_CONNECTCHAT_SUCCEED,
        //     this._onConnectChatSucceed.bind(this));
    }

    private _onGetChatTokenSucceed(data: { id: number, token: string }) {

        User.instance.addToken({
            id: data.id,
            token: data.token,
        });

        this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_CONNECTCHAT, {
            userId: User.instance.getData('id'),
            chatId: data.id,
            token: data.token,
        });

        this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATUSERS, data.id);
        // console.log(User.instance.getData());
    }

    private _onGetChatsSucceed(xhr: XMLHttpRequest) {

        this._chatInfos = [];
        const chats: ChatInfoData[] = JSON.parse(xhr.responseText);

        console.log('Chat props: ', this.props.icons);
        chats.forEach((chat) => {

            let timeString = '';
            if (chat.last_message?.time) {
                // TODO: Сформировать корректный формат времени последнего сообщения
                const time = new Date(chat.last_message.time);
                timeString = `${time.getHours()}:${time.getMinutes()}`;
            }
            const textString = chat.last_message?.content ? chat.last_message.content : '';

            this._chatInfos.push(new ChatInfo({
                title: chat.title,
                avatar: chat.avatar ? chat.avatar : this.props.icons.conversation,
                text: textString,
                unread_count: chat.unread_count,
                time: timeString,
                styles: this.props.styles,
                events: {
                    click: () => {
                        try {
                            const conversation = new Conversation({
                                chatId: chat.id,
                                styles: this.props.styles,
                                images: this.props.images,
                                icons: this.props.icons,
                            });
                            this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATTOKEN, chat.id);
                            // this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETMESSAGES, {
                            //         userId: User.instance.getData('id'),
                            //         chatId: chat.id,
                            //         token: User.instance.getToken(chat.id),
                            //     })
                            renderDOM('#conversation', conversation);

                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            }));
        });
        this.setProps({
            chatInfos: this._chatInfos,
        });
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

        const chatInfos: ChatInfo[] = [];
        this._chatInfos = chatInfos;

        const linkProfileOpen = new Link({
            text: 'Профиль ',
            class: this.props.styles['link-profile-open'],
            imageAfterSrc: this.props.icons.profilearrow,
            events: {
                click: () => {
                    this.props.router.go('/settings');
                },
            },
        });

        const linkAddChat = new Link({
            text: '+',
            class: this.props.styles['add-chat-container'],
            events: {
                click: () => {
                    const modalCreateChat = new ModalCreateChat({
                        styles: this.props.styles,
                    });

                    renderDOM('#modal', modalCreateChat);
                },
            },
        });

        const inputSearch = new Input({
            type: 'text',
            class: `${this.props.styles.input} ${this.props.styles['input-search-box']}`,
            name: 'search',
            placeholder: ' ',
            events: {
                blur: this._onFocusChange.bind(this),
                focus: this._onFocusChange.bind(this),
            },
        });

        return compile(tmpl, {
            chatInfos,
            linkProfileOpen,
            linkAddChat,
            inputSearch,
            ...this.props,
        });
    }
}
