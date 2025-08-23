// Pages/Dashboard.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../Auth/AuthContext";
import useTodos from "../Hooks/useTodos";
import { Statuses } from "../Data";

const Dashboard = () => {
  const { user } = useAuth();
  const { todos } = useTodos(user?.jwt);

  // Counts
  const completedCount =
    todos?.data.filter((todo) => todo.todo_status === Statuses[2].name).length ||
    0;
  const pendingCount =
    todos?.data.filter((todo) => todo.todo_status === Statuses[0].name).length ||
    0;
  const inProgressCount =
    todos?.data.filter((todo) => todo.todo_status === Statuses[1].name).length ||
    0;

  const totalCount = completedCount + pendingCount + inProgressCount;

  // Pie chart data
  const data = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
    { name: "In Progress", value: inProgressCount },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  return (
    <>
      <h2 className="text-center text-2xl font-bold mb-8">
        Todo Status Overview
      </h2>

      {/* Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent = 0 }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-700">Completed</h4>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {completedCount}
          </p>
          <span className="text-sm text-gray-500">
            {(totalCount ? (completedCount / totalCount) * 100 : 0).toFixed(0)}%
          </span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-700">In Progress</h4>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {inProgressCount}
          </p>
          <span className="text-sm text-gray-500">
            {(totalCount ? (inProgressCount / totalCount) * 100 : 0).toFixed(0)}%
          </span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-700">Pending</h4>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            {pendingCount}
          </p>
          <span className="text-sm text-gray-500">
            {(totalCount ? (pendingCount / totalCount) * 100 : 0).toFixed(0)}%
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
