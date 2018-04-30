export class Ticket {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    AssignedUser: {
        email: string,
        id: number,
        name: string,
    };
    Creator: {
        email: string,
        id: number,
        name: string,
    };
    Label: {
        title: string,
    };
    Status: {
        name: string,
    }
    Team: {
        name: string,
        TeamManagerId: number,
    };
}