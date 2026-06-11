import { SpeedInsights } from "@vercel/speed-insights/next";

export default function SpeedInsightsExample({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SpeedInsights
        endpoint="https://example.com/api/speed-insights"
        sampleRate={1}
      />
      {children}
    </>
  );
}
