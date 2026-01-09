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
    if (!isLoggedIn || !userId) return false;

    try {
      const res = await API.get(`/api/follow/is-following/${userId}`);
      const isFollowing = res.data.following;
      // Update the followingMap with the actual state
      setFollowingMap(prev => ({ ...prev, [userId]: isFollowing }));
      return isFollowing;
    } catch {
      return false;
    }
  };

  /* LOAD FOLLOW STATE FOR A USER - Call this when viewing a profile/product */
  const loadFollowState = async (userId) => {
    if (!isLoggedIn || !userId) {
      // If not logged in, ensure it's set to false
      setFollowingMap(prev => ({ ...prev, [userId]: false }));
      return false;
    }

    // If we already have the state, don't refetch
    if (followingMap[userId] !== undefined) {
      return followingMap[userId];
    }

    try {
      const res = await API.get(`/api/follow/is-following/${userId}`);
      const isFollowing = res.data.following;
      setFollowingMap(prev => ({ ...prev, [userId]: isFollowing }));
      return isFollowing;
    } catch (err) {
      // On error, default to false
      setFollowingMap(prev => ({ ...prev, [userId]: false }));
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
      const res = await API.post("/api/follow/follow", { followerId: userId });
      console.log(res.data);
    } catch (err) {
      console.log(err);
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
        loadFollowState,
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
