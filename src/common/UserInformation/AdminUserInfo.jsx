"use client";
import { useEffect } from "react";
import ToggleButton from "../ToggleButton/ToggleButton";
import { setTabs } from "@/store/slices/toggle.slice";
import { useDispatch, useSelector } from "react-redux";
import BusinessDataList from "@/components/Admin/Container/UserInformation/BusinessDataList";
import IndividualDataList from "@/components/Admin/Container/UserInformation/IndividualDataList";
import AdminUserList from "@/components/Admin/Container/UserInformation/AdminUserList";

const AdminUserInfo = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.toggleTabs);
  useEffect(() => {
    dispatch(setTabs(["Business Data", "Individual Data", "Admin User"]));
  }, []);

  return (
    <>
      <section className="">
        <ToggleButton />
        {activeTab === "Business Data" && <BusinessDataList />}
        {activeTab === "Individual Data" && <IndividualDataList />}
        {activeTab === "Admin User" && <AdminUserList />}
      </section>
    </>
  );
};
export default AdminUserInfo;
