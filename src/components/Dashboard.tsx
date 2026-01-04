import { Download, RefreshCw, UserMinus, UserPlus, Users, Clock } from "lucide-react";
import type { User } from "../App";
import "./Dashboard.css";
import FollowersList from "./FollowersList";
import StatsCard from "./StatsCard";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

function Dashboard({ user, onLogout }: DashboardProps) {
  const exportData = () => {
    const data = {
      user: user.username,
      followers: user.followers,
      following: user.following,
      analysis: {
        mutualFollows: mutualFollows.length,
        notFollowingBack: notFollowingBack.length,
        followerCount: user.followers.length,
        followingCount: user.following.length,
      },
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `instagram-analysis-${user.username}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const mutualFollows = user.followers.filter((follower) =>
    user.following.includes(follower)
  );

  const notFollowingBack = user.following.filter(
    (following) => !user.followers.includes(following)
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <h2>Análise para @{user.username}</h2>
          <p>
            Dados reais do seu Instagram •{" "}
            {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="header-actions">
          <button onClick={exportData} className="export-button">
            <Download size={16} />
            Exportar Análise
          </button>
          <button onClick={onLogout} className="logout-button">
            <RefreshCw size={16} />
            Novo Upload
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Seguidores"
          value={user.followers.length}
          icon={<Users size={24} />}
          color="blue"
        />
        <StatsCard
          title="Seguindo"
          value={user.following.length}
          icon={<UserPlus size={24} />}
          color="green"
        />
        <StatsCard
          title="Mútuos"
          value={mutualFollows.length}
          icon={<Users size={24} />}
          color="purple"
        />
        <StatsCard
          title="Não te seguem"
          value={notFollowingBack.length}
          icon={<UserMinus size={24} />}
          color="red"
        />
        <StatsCard
          title="Pendentes"
          value={user.pendingFollowers.length}
          icon={<Clock size={24} />}
          color="orange"
        />
      </div>

      <div className="insights-section">
        <div className="insight-card">
          <h3>📊 Insights da sua conta</h3>
          <div className="insights-grid">
            <div className="insight-item">
              <span className="insight-label">Taxa de reciprocidade:</span>
              <span className="insight-value">
                {((mutualFollows.length / user.followers.length) * 100).toFixed(
                  1
                )}
                %
              </span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Seguindo que não te seguem:</span>
              <span className="insight-value">{notFollowingBack.length}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Ratio seguindo/seguidores:</span>
              <span className="insight-value">
                {(user.following.length / user.followers.length).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="followers-section">
        <FollowersList
          title="Quem não te segue de volta"
          users={notFollowingBack}
          type="not-following-back"
        />
        <FollowersList
          title="Seguidores mútuos"
          users={mutualFollows}
          type="mutual"
        />
        {user.pendingFollowers.length > 0 && (
          <FollowersList
            title="Solicitações pendentes"
            users={user.pendingFollowers}
            type="pending"
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
