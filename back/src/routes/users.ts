import { Router } from 'express'
import { findEmail, findByEmail, createJWT, parseBoolean, handlePrice, hashing, verify } from '../helpers'
import { prisma } from '../database'
import { upload } from '../middlewares/multer'
import { Pagination } from '../classes'

const router = Router()

router.get("/users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        password: false,
        name: true,
        email: true,
        role: true,
        tel: true,
        cel: true,
        bio: true,
        createdAt: true,
        sex: true
      }
    })

    res.json(allUsers)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// TODO: CHANGE THIS API TO application/json and isolate image
router.post("/signup", upload.single('avatar'), async (req, res) => {
  try {
    // @ts-ignore
    const avatar = req.file.linkUrl
    const { name, email, password, role, tel, cel, sex, bio } = req.body;
    const user = await findEmail(email)

    if (user) {
      res.status(400).json({ error: "email já existe" })
    } else {

      const hash = await hashing(password);

      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          role,
          sex,
          bio,
          tel,
          cel,
          avatar
        }
      })

      const { password: pass, ...user } = createdUser
      const jwt = await createJWT(user.id, user.role)
      const userAndJwt = [user, jwt]
      res.json(userAndJwt)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

//  TODO: REMOVE THIS API
router.get("/email", async (req, res) => {
  try {
    const { email } = req.body

    const user = await findEmail(email)

    res.json(!!user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findByEmail(email)

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" })

    } else {
      const { password: hash, id, role } = user

      const isValid = await verify(hash, password)

      if (!isValid) {
        res.status(401).json({ error: "Senha incorreta" })
      } else {
        const jwt = await createJWT(id, role)
        res.json([user, jwt])
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get("/ad", async (req, res) => {
  try {
    const { search } = req.query as unknown as { search: string }
    const { hasPool, hasGarage, hasGourmet, hasInternet, isPetFriendly, maximumPrice, minimumPrice } = req.query as unknown as
      { hasPool: string, hasGarage: string, hasGourmet: string, hasInternet: string, isPetFriendly: string, maximumPrice: string, minimumPrice: string }

    const { skip: skipper = '0', take: takker = '20' } = req.query as unknown as Pagination
    const skip = parseInt(skipper)
    const take = parseInt(takker)

    const pool = parseBoolean(hasPool)
    const garage = parseBoolean(hasGarage)
    const gourmet = parseBoolean(hasGourmet)
    const internet = parseBoolean(hasInternet)
    const petFriendly = parseBoolean(isPetFriendly)
    const maxPrice = handlePrice(maximumPrice)
    const minPrice = handlePrice(minimumPrice)

    if (minPrice > maxPrice) res.status(400).json({ "error": "minimum price cannot be greater than maximum price" })

    let result
    if (!!search) {
      result = await prisma.property.findMany({
        skip,
        take,
        where: {
          isAdvertisement: true,
          hasGarage: garage,
          hasPool: pool,
          hasGourmet: gourmet,
          hasInternet: internet,
          isPetFriendly: petFriendly,
          vacancyPrice: {
            lte: maxPrice,
            gte: minPrice
          },
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            }, {
              neighborhood: {
                contains: search,
              }
            }, {
              city: {
                contains: search,
              }
            }, {
              description: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        }
      })
    } else {
      result = await prisma.property.findMany({
        skip,
        take,
        where: {
          isAdvertisement: true,
          hasGarage: garage,
          hasPool: pool,
          hasGourmet: gourmet,
          hasInternet: internet,
          isPetFriendly: petFriendly,
          vacancyPrice: {
            lte: maxPrice,
            gte: minPrice
          }
        }
      })
    }

    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get("/:id/property", async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const result = await prisma.property.update({
      where: {
        id
      },
      data: {
        viewed: {
          increment: 1,
        }
      }
    })

    const agreggate = await prisma.rent.aggregate({
      where: {
        propertyId: id
      },
      avg: {
        value: true
      }
    })

    const propertyWithAggregate = Object.assign(result, agreggate)
    res.json(propertyWithAggregate)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get('/ad/count', async (req, res) => {
  try {
    const all = await prisma.property.count({
      where: { isAdvertisement: true }
    })

    res.json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get("/:id/evaluate", async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const favorites = await prisma.rent.aggregate({
      where: {
        propertyId: id
      },
      avg: {
        value: true
      }
    })
    res.json(favorites)
  } catch (error) {
    console.log(error)
  }
})

export default router