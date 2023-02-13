import { verify } from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .json({ error: "Token requirido para autenticação!" });
  }
  try {
    const decoded = verify(token, '123456789')
    req.user = decoded;
  } catch (error) {
    return res
      .status(401)
      .json({ error: 'Token invalído ' })
  }
  return next();
}
