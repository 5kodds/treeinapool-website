import { ImageResponse } from "next/og";

export const alt =
  "TreeInAPool: We turn prototypes into products people pay for";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#f2f2f3",
        color: "#1d1f20",
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#416180",
          fontWeight: 600,
        }}
      >
        TreeInAPool
      </div>
      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          fontSize: 72,
          fontWeight: 600,
          textTransform: "uppercase",
          lineHeight: 1.05,
          letterSpacing: 1,
        }}
      >
        <div style={{ display: "flex" }}>We turn prototypes</div>
        <div style={{ display: "flex" }}>into products</div>
        <div style={{ display: "flex", color: "#416180" }}>people pay for.</div>
      </div>
    </div>,
    { ...size },
  );
}
