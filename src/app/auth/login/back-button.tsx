"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4 text-muted-text" />
      <p className="text-sm text-muted-text">Back</p>
    </button>
  );
};

export default BackButton;
