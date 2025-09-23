import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const barRadius = {
  reviews: [8, 8, 0, 0],
  pending: [8, 8, 0, 0],
  flagged: [8, 8, 0, 0],
};

export const AdminbusinessChart = ({ businessdata }) => {
  return (
    <div>
      <div className="mt-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={businessdata}
            margin={{ top: 0, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="left"
              iconType="circle"
              wrapperStyle={{
                paddingBottom: 30,
              }}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              className="content1"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              className="content1"
              domain={[0, 600]}
              ticks={[0, 100, 200, 300, 400, 500, 600]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="Reviews"
              fill="#035140"
              barSize={20}
              radius={barRadius.reviews}
            />
            <Bar
              dataKey="Pending"
              fill="#9AB9B3"
              barSize={20}
              radius={barRadius.pending}
            />
            <Bar
              dataKey="Flagged"
              fill="url(#pattern-flagged)"
              barSize={20}
              radius={barRadius.flagged}
            />
            <defs>
              <pattern
                id="pattern-flagged"
                patternUnits="userSpaceOnUse"
                width={6}
                height={6}
              >
                <rect width={6} height={6} fill="#004D40" />
                <path
                  d="M0,6 l6,-6 M-1,1 l2,-2 M5,7 l2,-2"
                  stroke="#fff"
                  strokeWidth={1}
                />
              </pattern>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AdminIndividualChart = ({ businessdata }) => {
  return (
    <div>
      <div className="mt-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={businessdata}
            margin={{ top: 0, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="left"
              iconType="circle"
              wrapperStyle={{
                paddingBottom: 30,
              }}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              className="content1"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666" }}
              className="content1"
              domain={[0, 600]}
              ticks={[0, 100, 200, 300, 400, 500, 600]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="Reviews"
              fill="#B37A0F"
              barSize={20}
              radius={barRadius.reviews}
            />
            <Bar
              dataKey="Pending"
              fill="#E8C990"
              barSize={20}
              radius={barRadius.pending}
            />
            <Bar
              dataKey="Flagged"
              fill="url(#pattern-flagged) "
              barSize={20}
              radius={barRadius.flagged}
            />
            <defs>
              <pattern
                id="pattern-flagged"
                patternUnits="userSpaceOnUse"
                width={6}
                height={6}
              >
                <rect width={6} height={6} fill="#CF8602" />
                <path
                  d="M0,6 l6,-6 M-1,1 l2,-2 M5,7 l2,-2"
                  stroke="#fff"
                  strokeWidth={1}
                />
              </pattern>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const renderCenterText = () => {
  return (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="content "
      fill="#333"
    >
      23K{" "}
      <tspan x="50%" dy="1.2em" fontSize="12">
        Reviews
      </tspan>
    </text>
  );
};

export const AdminuserAccount = ({ value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full  ">
      <h3 className="content">Overall active user account</h3>
      <ResponsiveContainer width="100%" height={370}>
        <PieChart>
          {renderCenterText()}
          <Pie
            data={value}
            dataKey="value"
            startAngle={160}
            endAngle={-200}
            innerRadius={56}
            outerRadius={86}
            paddingAngle={4}
          >
            {value.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            {renderCenterText()}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center items-center gap-6 py-3 md:hidden">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex flex-col items-start">
              <span className="text-base font-semibold">{item.value}k</span>
              <div className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            </div>
            {index === 0 && <div className="h-6 w-px bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-1 hidden md:block">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div className="md:flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.name}</span>
            </div>
            <span className="content">
              {item.value.toString().padStart(2, "0")}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
