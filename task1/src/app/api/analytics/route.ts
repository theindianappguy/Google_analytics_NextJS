import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const propertyId = process.env.GA_PROPERTY_ID;
const key = process.env.GA_PRIVATE_KEY ?? "";
const DAYS = 7;
// const key1 = Buffer.from(key, "base64").toString()
// console.log(Buffer.from(process.env.PROJECT_ID ?? "", "base64").toString())
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    // project_id: JSON.parse(Buffer.from(process.env.PROJECT_ID ?? "", "base64").toString()),
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY,
  },
});

export async function GET(request: Request) {
  // return NextResponse.json({
  //   totalVisitors: 2,
  //   days: 7,
  // });

  try {
    console.log("Hello world1.........");
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${DAYS}daysAgo`,
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "year",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
      ],
    });

    console.log("Response: " + JSON.stringify(response));
    let totalVisitors = 0;
    response.rows?.forEach((row: any) => {
      totalVisitors += parseInt(row.metricValues[0].value);
    });

    return NextResponse.json({
      totalVisitors,
      days: 7,
    });

    
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json({ error: "Error fetching analytics data" });
  }
}