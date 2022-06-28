import { home, addCustomer, signIn, ensureToken, /* getProtectedInfo */ } from '../controllers/auth-controller';

const routes = (app) => {
    app.route("/")
        .get(home);

    app.route("/signUp")
        .post(addCustomer);

        app.route("/signIn")
            .post(signIn);

        /* app.route("/api/protected")
            .get(ensureToken, getProtectedInfo); */

}

export default routes;
