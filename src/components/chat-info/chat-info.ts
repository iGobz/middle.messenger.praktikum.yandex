import tmpl from './chat-info.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

export interface ChatInfoProps {
    title: string,
    time: string,
    text: string,
    avatar: string,
    unread_count: string | number | undefined,
    styles: Record<string, any>,
    events?: {
        click: () => void
    }
}


export class ChatInfo extends Block {
    constructor(props: ChatInfoProps) {
        super('div', props);
    }

    render() {
        return compile(tmpl, this.props);
    }
}
