// import {APIGatewayEvent} from 'aws-lambda';
// import { google } from "googleapis";
// import request from "request-promise";
// import key from "./config/firstnextprojext-4a732042923a.json";

// export class AnalyticsProvider {

//     private requestBody: any;
//     private requestHeader: any;
//     private request: APIGatewayEvent;
//     private urlString: string = "";
//     private endDate: string = "";
//     private token: any;

//     constructor(req: APIGatewayEvent) {
//         this.request = req;

//         this.requestBody = (req.body) ? JSON.parse(req.body) : {};
//         this.requestHeader = ((req as APIGatewayEvent).multiValueHeaders) ? (req as APIGatewayEvent).multiValueHeaders : {};

//         this.urlString = this.requestBody?.url;
//         this.endDate = this.requestBody?.endDate;
//     }

//     private async getToken() {
//         if (!this.token) {
//             const jwtClient = new google.auth.JWT(
//                 key.client_email,
//                 undefined,
//                 key.private_key,
//                 ["https://www.googleapis.com/auth/analytics.readonly"],
//                 undefined
//             );

//             this.token = await jwtClient.authorize();
//         }

//         return this.token;
//     }

//     async getURLAnalyticsData() {
//         await this.getToken();
        
//         let resp;
//         let urlListResponse;
//         try {
//             let pageView = 0;
//             if (this.urlString) {
//                 resp = await this.getViewsBasedOnPage();
//                 const { totalsForAllResults } = JSON.parse(resp);
//                 pageView = totalsForAllResults["ga:pageviews"];
//             } else {
//                 resp = await this.totalPageView();
//                 const { totalsForAllResults } = JSON.parse(resp);
//                 pageView = totalsForAllResults["ga:pageviews"];
//             }

//             urlListResponse = await this.getTopURL();
//             const { rows } = JSON.parse(urlListResponse);

//             return {
//                 pageViews: pageView,
//                 topPost: rows
//             };
//         } catch (error) {
//             resp = {};
//             return {
//                 status: 400
//             }
//         }
//     }

//     private async getViewsBasedOnPage() {
//         const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga:214292350&dimensions=ga:pagePath&metrics=ga:pageviews&filters=ga:pagePath==${this.urlString}&start-date=2019-01-01&end-date=${this.endDate}&max-results=1`;

//         const options = {
//             url,
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             auth: {
//                 "bearer": this.token.access_token
//             }
//         }

//         const resp = await request(options);
//         return resp;
//     }

//     private async getTopURL() {
//         const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga:214292350&dimensions=ga:landingPagePath,ga:pageTitle&metrics=ga:pageviews&sort=-ga:pageviews&start-date=2019-01-01&end-date=${this.endDate}&max-results=20&filters=ga:medium==organic`;

//         const options = {
//             url,
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             auth: {
//                 "bearer": this.token.access_token
//             }
//         }

//         const resp = await request(options);
//         return resp;
//     }

//     private async totalPageView() {
//         const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga:214292350&metrics=ga:pageviews&start-date=2019-01-01&end-date=${this.endDate}&max-results=1`;

//         const options = {
//             url,
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             auth: {
//                 "bearer": this.token.access_token
//             }
//         }

//         const resp = await request(options);
//         return resp;
//     }
// }