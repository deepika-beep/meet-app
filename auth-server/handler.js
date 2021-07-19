const {google} = require('googleapis');
const { oAuth2 } = require('googleapis/build/src/apis/oauth2');
const OAuth2 =google.auth.OAuth2;
const calendar =google.calendar('v3');

/**
 * SCOPES allows you to set access levels; this is set to readonly for now because you don't have access rights to
 * update the calendar yourself. For more info, check out the SCOPES documentation at this link: https://developers.google.com/identity/protocols/oauth2/scopes
 */
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const credentials = {
  client_id:process.env.CLIENT_ID,
  project_id:process.env.PROJECT_ID,
  client_secret:process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri:"https://accounts.google.com/o/oauth2/auth",
  token_uri:"https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris:["https://deepika-beep.github.io/meet-app/"],
  javascript_origins:["https://deepika-beep.github.io","http://localhost:3000"],
};
  const{client_id,client_secret,calendar_id,redirect_uris} = credentials;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,  
    client_secret,
    redirect_uris[0]
  );
  /**
 *
 * The first step in the OAuth process is to generate a URL so users can log in with
 * Google and be authorized to see your calendar. After logging in, they’ll receive a code
 * as a URL parameter.
 *
 */
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the
   * "OAuth consent screen" settings in your project on your Google Console. Also, any passed
   *  scopes are the ones users will see when the consent screen is displayed to them.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type:"offline",
    scope:SCOPES,
  });
  return {
    statusCode:200,
    headers:{
      "Access-Control-Allow-Origin": "*",
    },
    body:JSON.stringify({
      authUrl:authUrl,
    }),
  };
};
module.exports.getAccessToken = async (event) => {
  // Create a new OAuthClient
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  // Return a new promise so you can asynchronously use the getToken method and return the result to your users.
  return new Promise((resolve,reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “err” and “token.”
     */
oAuth2Client.getToken(code,(err,token) => { 
if(err){
  return reject(err);
}
return resolve(token);
})
  }).then((token) => {
      // Respond with OAuth token 
      return{
        statusCode:200,
        headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
            },
        body:JSON.stringify(token),
      };
  })
  .catch((err) => {
    // Handle error
    console.error(err);
    return{
      statusCode:500,
      body:JSON.stringify(err),
    };
  });
};
module.exports.getCalendarEvents = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  
  oAuth2Client.setCredentials({access_token});
  return new Promise((resolve,reject) => {
    calendar.events.list({
      calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
    }
  }
  );
  })
  .then((results)=> {
    return{
      statusCode:200,
      headers:{
        'Access-Control-Allow-Origin': '*',
      },
      body:JSON.stringify({events:results.data.items})
    }
  })
  .catch((error) => {
    console.error(error);
    return{
      statusCode:500,
      headers: {
                'Access-Control-Allow-Origin': '*',
                },
            body: JSON.stringify(error),
    }
  });
 } 
