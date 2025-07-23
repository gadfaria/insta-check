import type { ReactNode } from "react";
import "./StatsCard.css";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "red";
}

function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default StatsCard;
