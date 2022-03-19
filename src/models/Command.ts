export class Command {

    name: string;
    alias: string[];
    description: string;
    action: any;

    constructor(name: string,alias:string[],description: string, action: any) {
        this.name = name;
        this.alias = alias;
        this.description = description
        this.action = action
    }
}