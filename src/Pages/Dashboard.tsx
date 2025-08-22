// Pages/Dashboard.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAuth } from "../Auth/AuthContext";
import useTodos from "../Hooks/useTodos";
import { Statuses } from "../Data";
// ...existing code...
const Dashboard = () => {
  // Get todos from your custom hook
  const { user } = useAuth();
  const { todos } = useTodos(user?.jwt);

  // Count completed and pending todos
  const completedCount = todos?.data.filter(todo=> todo.todo_status === Statuses[2].name).length || 0;
  // Count pending todos
  const pendingCount = todos?.data.filter(todo=> todo.todo_status === Statuses[0].name).length || 0;

  // Prepare data for PieChart
  const data = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Todo Status Overview</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent = 0, x, y }) => (
                <text
                  x={x}
                  y={y}
                  fill="#333"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={16}
                  fontWeight="bold"
                >
                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                </text>
              )}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
// ...existing code...
