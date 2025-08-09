import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  username?: string;
  [key: string]: any;
}

export function getUserFromToken(): DecodedToken | null {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
