export class Comment {
    description: string;
    createdAt: string;
    User: [
        {
            name: string,
            email: string,
            avatar: string
        }
    ]
}