import { User } from "../../api/services/User/store";

export const getInitials = (user: User) =>
  [user.firstName, user.lastName]
    .map((name) => name?.[0]?.toLocaleUpperCase() ?? "")
    .join("");

export const stringAvatar = (user: User) => {
  const initials = getInitials(user);
  const r = Math.floor(parseInt(initials[0] || "k", 36) * 7);
  const g = Math.floor(parseInt(initials[1] || "l", 36) * 7);
  const b = Math.floor(parseInt(user.firstName?.[1] || "m", 36) * 7);

  return {
    sx: { bgcolor: `rgb(${r},${g},${b})`, cursor: "pointer" },
    children: initials,
  };
};
