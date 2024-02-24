export function verifyAdmin(req, res, next) {
  const rolePermited = "ADMIN"
  if (req.loggedUserRole !== rolePermited)
    res.status(403).json({ "error": "Você não está autorizado a fazer essa operação" })
  next()
}

export function handleDateAgo(today: Date, daysAgo: number = 30): Date {
  const thirtyDaysAgoInSeconds = new Date().setDate(today.getDate() - daysAgo)
  const thirtyDaysAgo = new Date(thirtyDaysAgoInSeconds)
  return thirtyDaysAgo
}