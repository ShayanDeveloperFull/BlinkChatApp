import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })    //Remember that the "user"  in the object is a custom proprety name. You could've made it shorthand and just said {userId}
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV !== "development"
  })

  return token
}