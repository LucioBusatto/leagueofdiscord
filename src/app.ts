import express, {Application} from 'express'


export class App{

    private app: Application

    constructor() {
        this.app = express()
    }

    async listen(){
        await this.app.listen(3000)
        console.log('Server on port ', 3000)
    }
}