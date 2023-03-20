// MSAL-node documentation: https://learn.microsoft.com/en-us/azure/active-directory-b2c/enable-authentication-in-node-web-app


import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import session from 'express-session'
import * as msal from '@azure/msal-node';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { storeData, getData } from '../frontend/AsyncStorage.js';
// The two above import statements will give errors related to CJS vs MJS

// Public Client Application Configuration
const publicClientConfig = {
    auth: {
        clientId: process.env.APP_CLIENT_ID, 
        authority: process.env.SIGN_UP_SIGN_IN_POLICY_AUTHORITY, 
        knownAuthorities: [process.env.AUTHORITY_DOMAIN], 
        redirectUri: process.env.APP_REDIRECT_URI,
        validateAuthority: false,
        navigateToLoginRequestUrl: true
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Initialize MSAL Node
const publicClientApplication = new msal.PublicClientApplication(publicClientConfig);

// App States for OAuth2.0 State Parameter
const APP_STATES = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    PASSWORD_RESET: 'password_reset',
    EDIT_PROFILE : 'update_profile'
}

// Request Configuration
const authCodeRequest = {
    redirectUri: publicClientConfig.auth.redirectUri,
};

const tokenRequest = {
    redirectUri: publicClientConfig.auth.redirectUri,
};

// express-session middleware
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set this to true on production
    }
}

// Create express instance and use express-session 
const app = express();
app.use(session(sessionConfig));


// Method to generate an auth code request
/**
 * @param {string} authority: the authority to request the auth code from 
 * @param {array} scopes: scopes to request the auth code for 
 * @param {string} state: state of the application
 * @param {Object} res: express middleware response object
 */
const getAuthCode = (authority, scopes, state, res) => {

    // prepare the request
    console.log("Fetching Authorization code")
    authCodeRequest.authority = authority;
    authCodeRequest.scopes = scopes;
    authCodeRequest.state = state;

    //Each time you fetch Authorization code, update the relevant authority in the tokenRequest configuration
    tokenRequest.authority = authority;

    // request an authorization code to exchange for a token
    return publicClientApplication.getAuthCodeUrl(authCodeRequest)
        .then((response) => {
            console.log("\nAuthCodeURL: \n" + response); 
            res.redirect(response)
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

// Routes
app.get('/', (req, res) => {
    console.log("Ping")
});

app.get('/signin',(req, res)=>{
    console.log('/signin')
    getAuthCode(process.env.SIGN_UP_SIGN_IN_POLICY_AUTHORITY, [], APP_STATES.LOGIN, res);
});

app.get('/password',(req, res)=>{
    console.log('/password')
    getAuthCode(process.env.RESET_PASSWORD_POLICY_AUTHORITY, [], APP_STATES.PASSWORD_RESET, res); 
});

app.get('/profile',(req, res)=>{
    console.log('/profile')
    getAuthCode(process.env.EDIT_PROFILE_POLICY_AUTHORITY, [], APP_STATES.EDIT_PROFILE, res); 
});

app.get('/signout',async (req, res)=>{
    console.log('/signout')    
    logoutUri = process.env.LOGOUT_ENDPOINT;
    req.session.destroy(() => {
        res.redirect(logoutUri);
    });
});

app.get('/redirect',(req, res)=>{
    console.log("\n/redirect")
    //determine the reason why the request was sent by checking the state
    if (req.query.state === APP_STATES.LOGIN) {
        //prepare the request for authentication        
        tokenRequest.code = req.query.code;
        publicClientApplication.acquireTokenByCode(tokenRequest).then((response) => {
            req.session.sessionParams = {user: response.account, idToken: response.idToken};
            // TODO: Figure out async storage for logged in users
            // storeData('name', response.account.given_name)
            global.name = "Landon"
            console.log("\nAuthToken: \n" + JSON.stringify(response));
            // console.log("\nName: " +  response.account.idTokenClaims.given_name);
            res.redirect("http://localhost:19006/redirect")
        })
        .catch((error)=>{
            console.log("\nErrorAtLogin: \n" + error);
        });
    }else if (req.query.state === APP_STATES.PASSWORD_RESET) {
        //If the query string has a error param
        if (req.query.error) {
            //and if the error_description contains AADB2C90091 error code
            //Means user selected the Cancel button on the password reset experience 
            if (JSON.stringify(req.query.error_description).includes('AADB2C90091')) {
                //Send the user home with some message
                //But always check if your session still exists
                alert(req.query.error_description)
                //res.render('signin', {showSignInButton: false, givenName: req.session.sessionParams.user.idTokenClaims.given_name, message: 'User has cancelled the operation'});
            }
        }else{
            res.redirect("http://localhost:19006")
        }        
        
    }else if (req.query.state === APP_STATES.EDIT_PROFILE){
    
        tokenRequest.scopes = [];
        tokenRequest.code = req.query.code;
        
        //Request token with claims, including the name that was updated.
        publicClientApplication.acquireTokenByCode(tokenRequest).then((response) => {
            req.session.sessionParams = {user: response.account, idToken: response.idToken};
            console.log("\AuthToken: \n" + JSON.stringify(response));
            res.redirect("http://localhost:19006")
        }).catch((error)=>{
            //Handle error
        });
    }else{
        res.status(500).send('We do not recognize this response!');
    }

});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on ` + process.env.SERVER_PORT);
});