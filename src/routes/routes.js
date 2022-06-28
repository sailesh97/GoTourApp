import httpProxy from 'express-http-proxy';

import { home, addCustomer, signIn} from '../controllers/auth-controller';

const tripMicroserviceUrl = process.env.TRIP_MICROSERVICE_URL;
const tripListServiceProxy = httpProxy(tripMicroserviceUrl);

const paymentMicroserviceUrl = process.env.PAYMENT_MICROSERVICE_URL;
const paymentServiceProxy = httpProxy(paymentMicroserviceUrl);

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
