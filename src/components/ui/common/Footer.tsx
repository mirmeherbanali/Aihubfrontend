"use client";

import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      © {new Date().getFullYear()} Aidirectory. All rights reserved.
    </AntFooter>
  );
}
