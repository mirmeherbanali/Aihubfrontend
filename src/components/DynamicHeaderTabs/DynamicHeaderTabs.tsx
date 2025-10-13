"use client";

import React, { useState } from "react";
import "../ui/style/DynamicHeaderTabs.scss";

interface TabAction {
  label: string;
  onClick?: () => void;
}

interface DynamicHeaderTabsProps {
  actions: TabAction[];
  defaultActive?: number;
}

const DynamicHeaderTabs: React.FC<DynamicHeaderTabsProps> = ({
  actions,
  defaultActive = 0
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActive);

  const handleTabClick = (index: number, action: TabAction) => {
    setActiveIndex(index);
    if (action.onClick) action.onClick();
  };

  return (
    <div className="dynamic-tabs">
      {actions.map((action, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            className={`tab-button ${isActive ? "active" : ""}`}
            onClick={() => handleTabClick(index, action)}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

export default DynamicHeaderTabs;
