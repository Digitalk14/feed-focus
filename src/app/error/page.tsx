"use client";
import { ErrorView } from "@/widgets";

export default function ErrorPage() {
  return (
    <ErrorView
      title="Sorry, something went wrong"
      description="Please try again later."
    />
  );
}
