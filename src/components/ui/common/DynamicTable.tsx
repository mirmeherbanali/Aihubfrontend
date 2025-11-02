"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { TableColumn, TableAction } from "@/types/table.types";
import styles from "../style/DynamicTable.module.scss";

type DynamicTableProps<T extends { _id: string }> = {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  bulkActions?: { label: string; onClick: (rows: T[]) => void }[];
  searchKey?: keyof T;
  itemsPerPage?: number;
  filterKeys?: (keyof T)[]; // 👈 only these columns get filters
};

export default function DynamicTable<T extends { _id: string }>({
  columns,
  data,
  actions = [],
  bulkActions = [],
  searchKey,
  itemsPerPage = 10,
  filterKeys = [], // 👈 default: no filters
}: DynamicTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<T["_id"]>>(new Set());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<{ [key: string]: string }>({});
  const [openDropdown, setOpenDropdown] = useState<T["_id"] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🧩 Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setOpenDropdown(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // 🧠 Dynamic filter values
  const dynamicFilterValues = useMemo(() => {
    const result: { [key: string]: string[] } = {};

    columns.forEach((col) => {
      const filteredDataset = data?.filter((item) =>
        Object.entries(appliedFilters).every(([key, value]) => {
          if (!value || key === col.key) return true; // ignore self
          return String(item[key as keyof T]) === value;
        })
      );

      result[col.key as string] = Array.from(
        new Set(filteredDataset.map((d) => String(d[col.key])))
      );
    });

    return result;
  }, [data, appliedFilters, columns]);

  // 🔍 Search + Filter logic
  const filteredData = useMemo(() => {
    return data
      .filter((row) =>
        searchKey && search
          ? String(row[searchKey]).toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((row) =>
        Object.entries(appliedFilters).every(([key, value]) => {
          if (!value) return true;
          return String(row[key as keyof T]) === value;
        })
      );
  }, [data, appliedFilters, search, searchKey]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Toggle select row
  const toggleRow = (_id: T["_id"]) => {
    const newSet = new Set(selectedRows);
    newSet.has(_id) ? newSet.delete(_id) : newSet.add(_id);
    setSelectedRows(newSet);
  };

  return (
    <div className={styles.tableContainer}>
      {/* 🌟 Filters */}
      <div className={styles.filters}>
        {filterKeys.map((key) => {
          const col = columns.find((c) => c.key === key);
          if (!col) return null;

          return (
            <select
              key={String(col.key)}
              value={appliedFilters[col.key as string] || ""}
              onChange={(e) => {
                const val = e.target.value;
                setAppliedFilters((prev) => ({
                  ...prev,
                  [col.key as string]: val,
                }));
                setCurrentPage(1);
              }}
            >
              <option value="">All {col.label}</option>
              {dynamicFilterValues[col.key as string]?.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          );
        })}

        {searchKey && (
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      {/* 🌟 Bulk Actions */}
      {bulkActions.length > 0 && selectedRows.size > 0 && (
        <div className={styles.bulkActions}>
          {bulkActions.map((b) => (
            <button
              key={b.label}
              onClick={() =>
                b.onClick(data.filter((row) => selectedRows.has(row._id)))
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      {/* 🌟 Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedRows.size === paginatedData.length &&
                  paginatedData.length > 0
                }
                onChange={() => {
                  const allSelected = selectedRows.size === paginatedData.length;
                  const newSet = new Set<T["_id"]>();
                  if (!allSelected) paginatedData.forEach((row) => newSet.add(row._id));
                  setSelectedRows(newSet);
                }}
              />
            </th>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            {actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row) => (
            <tr key={row._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.has(row._id)}
                  onChange={() => toggleRow(row._id)}
                />
              </td>

              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(row) : String(row[col.key]) || "-"}
                </td>
              ))}

              {actions.length > 0 && (
                <td className={styles.actions}>
                  <div className={styles.dropdownWrapper} ref={dropdownRef}>
                    <button
                      className={styles.threeDots}
                      onClick={() =>
                        setOpenDropdown(openDropdown === row._id ? null : row._id)
                      }
                    >
                      ⋮
                    </button>
                    {openDropdown === row._id && (
                      <div className={styles.dropdownMenu}>
                        {actions.map((act) => (
                          <button
                            key={act.label}
                            disabled={act.disabled?.(row)}
                            onClick={() => {
                              act.onClick(row);
                              setOpenDropdown(null);
                            }}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🌟 Pagination */}
      <div className={styles.pagination}>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <div>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            {"<"}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
