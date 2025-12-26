import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";
import { AuthContext } from "../Contexts/AuthProvider";

export const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [followingMap, setFollowingMap] = useState({}); // userId -> true/false
  const [followersCount, setFollowersCount] = useState({});
  const [followingCount, setFollowingCount] = useState({});

  /* CHECK FOLLOWING  */
  const checkFollowing = async (userId) => {
    if (!isLoggedIn || userId) return false;

    try {
      const res = await API.get(`/api/follow/is-following/${userId}`);
      return res.data.following;
    } catch {
      return false;
    }
  };

  /* ================= FOLLOW ================= */
  const followUser = async (userId) => {
    setFollowingMap(prev => ({ ...prev, [userId]: true }));
    setFollowersCount(prev => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1
    }));

    try {
      await API.post("/api/follow/follow", { followerId: userId });
    } catch (err) {
      // rollback
      setFollowingMap(prev => ({ ...prev, [userId]: false }));
    }
  };

  /* ================= UNFOLLOW ================= */
  const unfollowUser = async (userId) => {
    setFollowingMap(prev => ({ ...prev, [userId]: false }));
    setFollowersCount(prev => ({
      ...prev,
      [userId]: Math.max((prev[userId] || 1) - 1, 0)
    }));

    try {
      await API.delete(`/api/follow/unfollow/${userId}`);
    } catch (err) {
      // rollback
      setFollowingMap(prev => ({ ...prev, [userId]: true }));
    }
  };

  /* ================= LOAD COUNTS ================= */
  const loadFollowCounts = async (userId) => {
    try {
      const [followersRes, followingRes] = await Promise.all([
        API.get(`/api/follow/followers/${userId}`),
        API.get(`/api/follow/following/${userId}`)
      ]);

      setFollowersCount(prev => ({
        ...prev,
        [userId]: followersRes.data.count
      }));

      setFollowingCount(prev => ({
        ...prev,
        [userId]: followingRes.data.count
      }));
    } catch {}
  };

  return (
    <FollowContext.Provider
      value={{
        followUser,
        unfollowUser,
        checkFollowing,
        followingMap,
        followersCount,
        followingCount,
        loadFollowCounts
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
