"use client";
import React from "react";
import styles from "@/components/ui/style/ToolPageDetails.module.scss";
import ToolCardHeader from "@/components/Category/details/ToolCardHeader";
import ToolMainContent from "@/components/Category/details/ToolMainContent";
import ToolRightSidebar from "@/components/Category/details/ToolRightSidebar";

const ToolDetails = () => {
  return (
    <div className={styles.toolPage}>
      <header className={styles.headerSection}>
        <ToolCardHeader />
      </header>

      <div className={styles.pageLayout}>
        <main className={styles.mainSection}>
          <ToolMainContent /> {/* 70% width */}
        </main>

        <aside className={styles.sidebarSection}>
          <ToolRightSidebar /> {/* 15% width */}
        </aside>
      </div>
    </div>
  );
};

export default ToolDetails;
