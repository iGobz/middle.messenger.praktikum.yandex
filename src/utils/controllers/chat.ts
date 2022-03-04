import { Input } from '../../components';
import ChatUserAPI from '../api/chat-user-api';
import CreateChatAPI from '../api/create-chat-api';
import DeleteChatAPI from '../api/delete-chat-api';
import GetChatTokenAPI from '../api/get-chat-token-api';
import GetChatUsersAPI from '../api/get-chat-users-api';
import GetChatsAPI from '../api/get-chats-api';
import GlobalEventBus from '../globaleventbus';

export default class ChatController {

    private _getChatsAPI: GetChatsAPI;
    
    private _createChatAPI: CreateChatAPI;

    private _getChatTokenAPI: GetChatTokenAPI;

    private _getChatUsersAPI: GetChatTokenAPI;

    private _chatUserAPI: ChatUserAPI;

    private _deleteChatAPI: DeleteChatAPI;

    constructor() {
        this._getChatsAPI = new GetChatsAPI();
        this._createChatAPI = new CreateChatAPI();
        this._getChatTokenAPI = new GetChatTokenAPI();
        this._getChatUsersAPI = new GetChatUsersAPI();
        this._chatUserAPI = new ChatUserAPI();
        this._deleteChatAPI = new DeleteChatAPI();
    }

    public async getChats() {

        try {
            const data = await this._getChatsAPI.request();
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATS_SUCCEED, data);
        } catch (error) {
            console.log('Get chats error: ', error);
        }
    }

    public async createChat(inputs: Input[]) {

        const data: any = {};

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>data)[element.name] = element.value;
        });

        try {
            await this._createChatAPI.request(data);
        } catch (error) {
            console.log('Create chat error: ', error);
        }
    }

    public async getChatToken(id: number) {
        try {
            const result = await this._getChatTokenAPI.request(id);
            const token = JSON.parse(result.responseText).token;
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATTOKEN_SUCCEED, {
                id,
                token,
            });

        } catch (error) {
            console.log('Get chat token error: ', error);
        }
    }

    public async getChatUsers(chatId: number) {
        try {
            const result = await this._getChatUsersAPI.request(chatId);
            const users = JSON.parse(result.responseText);
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATUSERS_SUCCEED, {
                chatId,
                users,
            });

        } catch (error) {
            console.log('Get chat users error: ', error);
        }
    }

    public async addChatUser(data: { userId: number, chatId: number }) {


        try {
            await this._chatUserAPI.update({
                users: [ data.userId ],
                chatId: data.chatId,
            });
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_ADDCHATUSER_SUCCEED);
        } catch (error) {
            console.log('Add chat user error: ', error);
        }
    }

    public async deleteChatUser(data: { userId: number, chatId: number }) {

        try {
            await this._chatUserAPI.delete({
                users: [ data.userId ],
                chatId: data.chatId,
            });
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_DELETECHATUSER_SUCCEED);
        } catch (error) {
            console.log('Delete chat user error: ', error);
        }
    }

    public async deleteChat(chatId: number) {
        
        try {
            await this._deleteChatAPI.delete({
                chatId,
            });
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_DELETECHAT_SUCCEED);
        } catch (error) {
            console.log('Delete chat error: ', error);
        }
    }

}