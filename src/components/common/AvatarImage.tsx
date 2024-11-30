import React from "react";
import { getInitials } from "../../utils/utilities";

function AvatarImage({ alt }: { alt: string }) {
  return (
    <div className="flex flex-none items-center justify-center bg-red-800 w-10 h-10 rounded-full fill-white text-white">
      {getInitials(alt)}
    </div>
  );
}

export default AvatarImage;
