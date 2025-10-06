"use client";

import React from "react";
import styles from "../../../components/ui/style/ProfilePage.module.scss";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className={styles.profileContainer}>
        <h2 className={styles.title}>Developer Profile</h2>

        <div className={styles.profileContent}>
          {/* Profile Avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <span>C</span>
              <button className={styles.editBtn}>✏️</button>
            </div>
          </div>

          {/* Profile Form */}
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label>Company Name</label>
              <input type="text" placeholder="Enter company name" />
            </div>

            <div className={styles.formGroup}>
              <label>Role</label>
              <select>
                <option>Select Role</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Fullstack Developer</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input type="text" placeholder="Enter first name" />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input type="text" placeholder="Enter last name" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email ID</label>
              <input type="email" placeholder="Enter email address" />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Industry</label>
                <select>
                  <option>Select Industry</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Country</label>
                <select>
                  <option>Select Country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.updateBtn}>Update →</button>
          <button className={styles.logoutBtn}>Logout ⏻</button>
          <button className={styles.deleteBtn}>Delete Account</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
