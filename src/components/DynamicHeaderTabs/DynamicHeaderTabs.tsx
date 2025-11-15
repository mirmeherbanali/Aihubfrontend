"use client";

import React, { useState } from "react";
import "../ui/style/SideBar.module.scss";

interface TabAction {
  label: string;
  onClick?: () => void;
}

interface DynamicHeaderTabsProps {
  actions: TabAction[];
  defaultActive?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
}

const DynamicHeaderTabs: React.FC<DynamicHeaderTabsProps> = ({
  actions,
  defaultActive = 0,
  activeIndex: externalActiveIndex,
  onTabChange
}) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActive);

  const isControlled = externalActiveIndex !== undefined;
  const activeIndex = isControlled ? externalActiveIndex : internalActiveIndex;

  const handleSelect = (index: number, action: TabAction) => {
    if (!isControlled) setInternalActiveIndex(index);
    if (onTabChange) onTabChange(index);
    if (action.onClick) action.onClick();
  };

  return (
    <div className="radio-inputs">
      {actions.map((action, index) => (
        <label className="radio" key={index}>
          <input
            type="radio"
            name="dynamicTabs"
            checked={activeIndex === index}
            onChange={() => handleSelect(index, action)}
          />
          <span className="name">{action.label}</span>
        </label>
      ))}
    </div>
  );
};

export default DynamicHeaderTabs;
