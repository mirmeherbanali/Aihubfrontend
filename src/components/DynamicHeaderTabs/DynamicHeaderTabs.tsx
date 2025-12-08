"use client";

import React from "react";
import style from "../ui/style/DynamicHeaderTabs.module.scss";

interface TabAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface DynamicHeaderTabsProps {
  actions: TabAction[];
  activeIndex: number;
  onTabChange?: (index: number) => void;
}

const DynamicHeaderTabs: React.FC<DynamicHeaderTabsProps> = ({
  actions,
  activeIndex,
  onTabChange,
}) => {
  return (
    <div className={style.tabsWrapper}>
      {actions.map((action, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={index}
            type="button"
            className={`${style.tabButton} ${isActive ? style.active : ""}`}
            onClick={() => {
              onTabChange?.(index);
              action.onClick?.();
            }}
          >
            {action.icon && <span className={style.icon}>{action.icon}</span>}
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

export default DynamicHeaderTabs;
