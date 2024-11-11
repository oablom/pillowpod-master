// _not-found.tsx for vercel rendering
"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

const NotFoundPage = () => {
  useEffect(() => {
    console.error("Page not found");
  }, []);
  return (
    <EmptyState
      title="Damnit, the page is missing!"
      subtitle="Please consult Oa for assistance."
    />
  );
};

export default NotFoundPage;
