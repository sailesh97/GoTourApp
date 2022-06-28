import httpProxy from 'express-http-proxy';

import { home, addCustomer, signIn} from '../controllers/auth-controller';

const tripListServiceProxy = httpProxy('http://localhost:3000');
const paymentServiceProxy = httpProxy('http://localhost:4000');

export default class Routes{
    constructor(app){
        this.app = app;
    }

    appRoutes(){
        this.app.route("/")
        .get(home);

        this.app.route("/signUp")
            .post(addCustomer);

        this.app.route("/signIn")
            .post(signIn);

        this.app.route("/tripList")
            .get((req, res) => {
                tripListServiceProxy(req, res);
            });      
        
        this.app.route("/payments")
            .get((req, res) => {
                paymentServiceProxy(req, res);
            });      
    }

    routesConfig(){
        this.appRoutes();
    }    
}
