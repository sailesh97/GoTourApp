import { home, addCustomer, signIn, ensureToken, getProtectedInfo } from '../controllers/auth-controller';
// added
// import { hash } from '../utilities/hashing';
//added
const routes = (app) => {
    app.route("/")
        .get(home);

    app.route("/signUp")
        .post(async (req, res, next) => {
            // added
            // let customer = req.body;
            // customer.password = await hash(customer.password);
            /// added

            next();
        }, addCustomer);

        app.route("/signIn")
            .post(signIn);

        app.route("/api/protected")
            .get(ensureToken, getProtectedInfo);

}

export default routes;
