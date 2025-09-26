"use client";

import { Typography, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { COLORS } from "@/constants/colors";

const { Title, Paragraph } = Typography;

export default function Page() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* Gradient Floating Circles */}
      <div className="gradient-circle blue" />
      <div className="gradient-circle pink" />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Title */}
        <Title level={2} style={{ marginBottom: 16, fontSize: 42, fontWeight: 700 }}>
          Discover The Best{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#3b82f6,#9333ea,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Websites & Tools
          </span>
        </Title>

        {/* Subtitle */}
        <Paragraph style={{ fontSize: 16, color: COLORS.darkGray, marginBottom: 20 }}>
          <span style={{ color: COLORS.primaryBlue }}>26819</span> AIs and{" "}
          <span style={{ color: COLORS.primaryBlue }}>459</span> categories in the best AI
          tools directory. AI tools list & GPTs store are updated daily.
        </Paragraph>

        {/* Sponsored */}
        <Paragraph style={{ fontSize: 14, marginBottom: 30 }}>
          <b>Sponsored by </b>
          <a href="https://skywork.ai" style={{ color: COLORS.primaryBlue }}>
            Skywork
          </a>
          .
        </Paragraph>

        {/* Search Input */}
        <div style={{ maxWidth: 600, margin: "0 auto 20px" }}>
          <Input
            size="large"
            placeholder="Ask anything"
            suffix={
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                style={{
                  background: COLORS.accentBlue,
                  borderColor: COLORS.accentBlue,
                }}
              />
            }
            style={{
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Action Buttons */}
        <Space size="middle">
          <Button type="primary" size="large">
            Submit a Tool
          </Button>
          <Button size="large">Discover Categories</Button>
        </Space>
      </div>

      {/* Floating Gradient Animations */}
      <style jsx>{`
        .gradient-circle {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.5;
          z-index: 0;
          animation: float 12s ease-in-out infinite alternate;
        }
        .gradient-circle.blue {
          top: -200px;
          left: -200px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%);
          animation-delay: 0s;
        }
        .gradient-circle.pink {
          bottom: -200px;
          right: -200px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%);
          animation-delay: 6s;
        }
        @keyframes float {
          from {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          to {
            transform: translateY(40px) translateX(40px) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
