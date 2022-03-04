import { Input } from '../../components';
import ChangeAvatarAPI from '../api/change-avatar-api';
import FindUserAPI from '../api/find-user-api';
import GetUserAPI from '../api/get-user-api';
import LoginAPI, { LoginRequest } from '../api/login-api';
import LogoutAPI from '../api/logout-api';
import SaveInfoAPI from '../api/save-info-api';
import SavePasswordAPI, { PasswordRequest } from '../api/save-password-api';
import SignupAPI from '../api/signup-api';
import GlobalEventBus from '../globaleventbus';
import Router from '../services/router';
import { UserData } from '../user';


export default class UserController {

    private _router: Router;

    private _loginAPI: LoginAPI;

    private _signupAPI: SignupAPI;

    private _logoutAPI: LogoutAPI;

    private _getUserAPI: GetUserAPI;

    private _saveInfoAPI: SaveInfoAPI;

    private _savePasswordAPI: SavePasswordAPI;

    private _changeAvatarAPI: ChangeAvatarAPI;

    private _findUserAPI: FindUserAPI;

    constructor(router: Router) {
        this._router = router;
        this._loginAPI = new LoginAPI();
        this._signupAPI = new SignupAPI();
        this._logoutAPI = new LogoutAPI();
        this._getUserAPI = new GetUserAPI();
        this._saveInfoAPI = new SaveInfoAPI();
        this._savePasswordAPI = new SavePasswordAPI();
        this._changeAvatarAPI = new ChangeAvatarAPI();
        this._findUserAPI = new FindUserAPI();
    }

    public async init() {
        GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETUSER);
        GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATS);
    }

    public async getUser() {
        try {
            const user = await this._getUserAPI.request();
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETUSER_SUCCEED, user);
        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETUSER_FAILED, error);
        }
    }

    public async logout(successPath?: string) {
        try {
            this._logoutAPI.request();

            // TODO: Переделать через EventBus
            if (successPath) {
                this._router.go(successPath);
            }
        } catch (error) {
            console.log('Logout await error', error);
        }

    }

    // TODO: Избавиться от Input
    public async login(inputs: Input[], successPath: string) {
        const user: LoginRequest = { login: '', password: '' };

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            user[element.name as keyof LoginRequest] = element.value;
        });

        try {
            await this._loginAPI.request(user);

            // TODO: Переделать через EventBus
            this._router.go(successPath);

            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_LOGIN_SUCCEED);
            // Останавливаем крутилку
        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_LOGIN_FAILED, error);
        }
    }

    public async signup(inputs: Input[], successPath: string) {
        const user: UserData = {};

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>user)[element.name] = element.value;
        });

        try {
            await this._signupAPI.request(user);
            this._router.go(successPath);
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SIGNUP_SUCCEED);

        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SIGNUP_FAILED, error);
        }
    }    

    public async findUser(inputs: Input[], options: { succeedEvent: string, failedEvent: string }) {
        const user: UserData = {};

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>user)[element.name] = element.value;
        });

        try {
            const result = await this._findUserAPI.request({ data: user });
            const users = JSON.parse(result.responseText);
            let found = false;
            let uFound;

            users.forEach((u: any) => {
                if (u.login === user.login) {
                    found = true;
                    uFound = u;
                }
            });
            if (!found) {
                const error = JSON.stringify({ reason: 'User not found' });
                GlobalEventBus.instance.EventBus.emit(options.failedEvent, error);
            } else {
                GlobalEventBus.instance.EventBus.emit(options.succeedEvent, uFound);
            }

        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(options.failedEvent, error);
        }
    }

    public async saveInfo(inputs: Input[]) {
        const user: UserData = {};

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>user)[element.name] = element.value;
        });

        try {
            await this._saveInfoAPI.update(user);
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SAVEINFO_SUCCEED, user);

        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SAVEINFO_FAILED, error);
        }
    }

    public async savePassword(inputs: Input[]) {
        const data: PasswordRequest = { oldPassword: '', newPassword: '' };

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>data)[element.name] = element.value;
        });

        try {
            await this._savePasswordAPI.update(data);
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SAVEPASSWORD_SUCCEED);

        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SAVEPASSWORD_FAILED, error);
        }
    }

    public async changeAvatar(formData: FormData) {

        try {
            for (var key of formData.keys()) {
                console.log(key, formData.get(key));
             }            
            const result = await this._changeAvatarAPI.update(formData);
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_CHANGEAVATAR_SUCCEED, result);

        } catch (error) {
            GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_CHANGEAVATAR_FAILED, error);
        }
    }
}