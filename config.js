const port = 5051;
const baseURL = `http://localhost:${port}`;
module.exports = {
  JWTsecret: 'mysecret',
  baseURL: baseURL,
  port: port,
  oauth2Credentials: {
    client_id: "534837972708-5hr0n5jcgn7651q4ag3q7c1rnticanq7.apps.googleusercontent.com",
    project_id: "google auth", 
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url:"https://www.googleapis.com/userinfo/v2/me",
    client_secret: "hK0prG9FAClz6MWHw5BwXO7X",
    redirect_uris: [
      `${baseURL}/auth_callback`
    ],
    scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]

    
  }
};