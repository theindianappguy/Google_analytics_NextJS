"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AnalyticsData from "./component/page";

export default function Home() {
  const { push } = useRouter();

  const GoToViewPage = (event: FormEvent) => {
    event.preventDefault();
    push(`/view`);
  };

  const GoToViewAbout = (event: FormEvent) => {
    event.preventDefault();
    push(`/about`);
  };

  return (
    <div>
        <h1>Google Analytics Data</h1>
        <AnalyticsData />
        <button onClick={GoToViewPage}>View Page</button>
        <button onClick={GoToViewAbout}>About Page</button>
    </div>
  );
}


