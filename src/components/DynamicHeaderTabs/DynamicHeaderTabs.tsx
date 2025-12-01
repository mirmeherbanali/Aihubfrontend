"use client";

import React, { useState } from "react";
import style from "../ui/style/DynamicHeaderTabs.module.scss";

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
    onTabChange?.(index);
    action.onClick?.();
  };

  return (
    <div className={style.radioInputs}>
      {actions.map((action, index) => (
        <label key={index} className={style.radio}>
          <input
            type="radio"
            name="dynamic-tabs"
            checked={activeIndex === index}
            onChange={() => handleSelect(index, action)}
          />
          <span className={style.name}>{action.label}</span>
        </label>
      ))}
    </div>
  );
};

export default DynamicHeaderTabs;
