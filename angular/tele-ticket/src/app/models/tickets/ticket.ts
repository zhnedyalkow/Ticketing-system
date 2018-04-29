export class Ticket {
    id: number;
    title: string;
    description: string;

    email: string;
    // users: [
    //     {
    //         email: string,
    //     }
    // ]

    teams: [
        {
            name: string,
        }
    ]
    dueDate: Date;
    createdAt: Date;
    labelId: number;
    ticketId: number;
    statusId: number;
    creator: object;
    assignedUser: object;
    label: object;
    status: object;

}