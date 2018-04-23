export class AppConfig {
    readonly apiUrl: string;
    readonly jwt_issuer: string;

    constructor() {
        this.apiUrl = 'http://localhost:3001';
        this.jwt_issuer = 'tasmanianDevil';
    }
}
