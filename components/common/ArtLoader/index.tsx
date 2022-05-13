import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ContentLoader from "react-content-loader";

const ArtLoader = (props: any) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  const isMobile = width < 768;

  return (
    <ContentLoader
      viewBox="0 0 820 450"
      height={isMobile ? 200 : 450}
      width={isMobile ? 300 : 820}
      {...props}
    >
      <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
      <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
      <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
      <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
      <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
      <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
    </ContentLoader>
  );
};

export default ArtLoader;
