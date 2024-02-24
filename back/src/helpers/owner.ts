export function verifyRole(req, res, next) {
  const rolePermited = ["OWNER", "ADMIN"]

  if (!checkRole(rolePermited, req.loggedUserRole))
    res.status(403).json({ "error": "Você não está autorizado a fazer essa operação" })
  next()
}

function checkRole(rolePermited: string[], roleToCheck: string): boolean {
  return rolePermited.some(rolePermited => rolePermited === roleToCheck)
}

export function handleImage(oldImages: string[], newImages: string[]): string[] {
  const arrayFilled = [...oldImages, ...newImages]
  return arrayFilled.filter(x => x)
}