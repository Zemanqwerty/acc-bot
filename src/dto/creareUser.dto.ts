export class CreateUser {
    telegram_username: string;
    telegram_id: string

    constructor (username: string, id: string) {
        this.telegram_id = id;
        this.telegram_username = username
    }
}