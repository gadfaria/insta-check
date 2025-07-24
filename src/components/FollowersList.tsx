import { User } from "lucide-react";
import "./FollowersList.css";

interface FollowersListProps {
  title: string;
  users: string[];
  type: "mutual" | "not-following-back";
}

function FollowersList({ title, users, type }: FollowersListProps) {
  if (users.length === 0) {
    return (
      <div className="followers-list">
        <h3>{title}</h3>
        <div className="empty-state">
          <User size={32} />
          <p>Nenhum usuário encontrado</p>
        </div>
      </div>
    );
  }

  function handleCardClick(username: string) {
    window.open(`https://www.instagram.com/${username}`, "_blank");
  }

  return (
    <div className="followers-list">
      <h3>
        {title} ({users.length})
      </h3>
      <div className="users-grid">
        {users.map((username, index) => (
          <div
            key={index}
            className={`user-card ${type}`}
            onClick={() => handleCardClick(username)}
          >
            <div className="user-avatar">
              <User size={20} />
            </div>
            <span className="username">@{username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowersList;
