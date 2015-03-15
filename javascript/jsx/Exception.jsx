export class Exception {
    constructor(message, data)
    {
        this.message = message;
        this.data = data;

        console.error(this.message, this.data);
    }
}
