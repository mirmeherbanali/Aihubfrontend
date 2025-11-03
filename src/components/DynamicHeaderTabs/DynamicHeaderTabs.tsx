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
  activeIndex?: number; // new
  onTabChange?: (index: number) => void; // optional callback
}

const DynamicHeaderTabs: React.FC<DynamicHeaderTabsProps> = ({
  actions,
  defaultActive = 0,
  activeIndex: externalActiveIndex,
  onTabChange
}) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(defaultActive);

  const isControlled = externalActiveIndex !== undefined;
  const activeIndex = isControlled ? externalActiveIndex : internalActiveIndex;

  const handleTabClick = (index: number, action: TabAction) => {
    if (!isControlled) setInternalActiveIndex(index);
    if (onTabChange) onTabChange(index); // notify parent
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

