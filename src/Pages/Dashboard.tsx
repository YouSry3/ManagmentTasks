// Pages/Dashboard.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAuth } from "../Auth/AuthContext";
import useTodos from "../Hooks/useTodos";

const data = [
  { name: "Completed Tasks", value: 65 },
  { name: "In Progress", value: 20 },
  { name: "Pending", value: 15 },
];
// 

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];
const {user} = useAuth();

const {todos} = useTodos(user?.jwt);

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-8">📊 Dashboard Overview</h1>

      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Project Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
