import { Router } from 'express'
import { PrismaPromise } from '@prisma/client'
import { prisma } from '../database'
import { bothConfirmation, checkIfSameUser, createJWT, handlePrice, handleValue, parseBoolean } from '../helpers'
import { upload } from '../middlewares/multer'
import { Property } from '../classes'

const router = Router()

router.get("/:id/user", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        email: true,
        avatar: true,
        sex: true,
        bio: true,
        tel: true,
        cel: true,
        property: true
      }
    })
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

router.get("/full-user", async (req, res) => {
  try {

    // @ts-ignore
    const id = req.loggedUserId

    const result = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        property: true,
        interests: true,
        favorited: true,
        rent: true
      }
    })
    const { password, ...user } = result
    res.json(user)

  } catch (err) {
    console.log(err)
  }
})

// TODO: split api in api to change data and api to change photo
router.patch("/user", upload.single('avatar'), async (req, res) => {
  try {
    // @ts-ignore
    const id = req.loggedUserId
    // @ts-ignore
    const avatar = req.file.linkUrl

    const { name, tel, cel, bio } = req.body
    const { sex } = req.body

    const result = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        sex,
        avatar,
        tel,
        cel,
        bio
      }
    }
    )

    const { password, ...user } = result
    res.json(user)

  } catch (err) {
    console.log(err)
  }
})

router.delete("/user", async (req, res) => {
  try {
    // @ts-ignore
    const id = req.loggedUserId

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      res.status(404).json({ "error": "objeto não encontrado" })
    }

    const deleteInterest = prisma.interest.deleteMany({
      where: {
        userId: id
      }
    })

    const deleteRent = prisma.rent.deleteMany({
      where: {
        guestId: id
      }
    })

    const deleteProperty = prisma.property.deleteMany({
      where: {
        ownerId: id
      }
    })

    const deleteUser = prisma.user.delete({
      where: {
        id
      }
    })

    const transactional = await prisma.$transaction([deleteInterest, deleteRent, deleteProperty, deleteUser])
    res.status(204).json(transactional)
  } catch (err) {
    console.log(err)
  }
})

router.get("/favorites", async (req, res) => {
  try {
    // @ts-ignore
    const id = req.loggedUserId

    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        favorited: true
      }
    })

    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

// TODO: change api path to "/:property_id/favorites"
router.patch("/property/:property_id/favorites", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.loggedUserId
    const id = parseInt(req.params.property_id)

    const favorites = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        favorited: {
          where: {
            id
          }
        }
      }
    })

    let result

    if (favorites.favorited.length === 0) {
      result = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          favorited: {
            connect: {
              id
            }
          }
        },
        include: {
          favorited: true
        }
      })
    } else {
      result = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          favorited: {
            disconnect: {
              id
            }
          }
        },
        include: {
          favorited: true
        }
      })
    }

    const { password, ...user } = result
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// TODO: change api path to /evaluation
router.get("/evaluate", async (req, res) => {
  try {
    // @ts-ignore
    const id = req.loggedUserId

    const evaluate = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        rent: {
          select: {
            value: true,
            comment: true
          }
        }
      }
    })

    res.json(evaluate)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// TODO: remove
router.get("/evaluates", async (req, res) => {
  try {
    const evaluates = await prisma.rent.findMany({
      select: {
        value: true,
        comment: true
      }
    })

    res.json(evaluates)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get("/property/:id/rent", async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const query = await prisma.rent.findMany({
      where: {
        propertyId: id,
        isActive: true
      },
      include: {
        guest: true,
        property: true
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

    const propertyWithAggregate = Object.assign(query, agreggate)
    res.json(propertyWithAggregate)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get("/rent", async (req, res) => {
  try {
    // @ts-ignore
    const guestId = req.loggedUserId

    const rent = await prisma.rent.findMany({
      where: {
        guestId,
        isActive: true
      },
      include: {
        property: true
      }
    })

    res.json(rent)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// TODO: remove
router.get("/rent/property/:id/user", async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    // @ts-ignore
    const userId = req.loggedUserId

    const result = await prisma.property.findUnique({
      where: {
        id
      },
      select: {
        ownerId: true,
        rent: {
          select: {
            guest: true
          }
        }
      }
    })

    checkIfSameUser(userId, result.ownerId, res)

    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.post("/property/:property_id/interest", async (req, res) => {
  try {
    // @ts-ignore
    const id = req.loggedUserId
    const propertyId = parseInt(req.params.property_id)

    const interest = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        interests: {
          where: {
            propertyId
          }
        }
      }
    })

    if (interest.interests.length !== 0) res.status(400).json({ "error": "Interesse nesta propriedade já foi cadastrado" })

    const result = await prisma.interest.create({
      data: {
        userId: id,
        propertyId
      }
    })

    res.status(201).json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.patch("/property/:property_id/interest", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.loggedUserId
    const propertyId = parseInt(req.params.property_id)

    const interest = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        interests: {
          where: {
            propertyId
          }
        }
      }
    })

    let result
    if (interest.interests.length === 0) {
      result = await prisma.interest.create({
        data: {
          userId,
          propertyId
        }
      })
    } else {
      result = await prisma.interest.deleteMany({
        where: {
          userId,
          propertyId
        },

      })
    }

    res.status(204).json(interest)

  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.patch("/:id/interest", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.loggedUserId;
    const id = parseInt(req.params.id)
    const { uConfirmation } = req.body

    const query = await prisma.interest.findUnique({
      where: {
        id
      }
    })

    if (!query) res.status(404).json({ "error": "interest não encontrado" })
    checkIfSameUser(userId, query.userId, res)

    const result = await prisma.interest.update({
      where: {
        id
      },
      data: {
        uConfirmation
      }
    })

    const resultConfirmation = await bothConfirmation(result)

    if (resultConfirmation)
      res.json(resultConfirmation)
    res.json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.delete("/property/:property_id/interest", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.loggedUserId
    const propertyId = parseInt(req.params.property_id)

    const interest = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        interests: {
          where: {
            propertyId
          }
        }
      }
    })

    if (interest.interests.length === 0) res.status(400).json({ "error": "Não interesse cadastrado para que possa ser deletado" })

    const result = await prisma.interest.deleteMany({
      where: {
        userId,
        propertyId
      }
    })

    res.status(204).json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.delete("/:id/interest", async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const interest = await prisma.interest.findUnique({
      where: {
        id
      }
    })

    // @ts-ignore
    checkIfSameUser(interest.userId, req.loggedUserId, res)

    if (interest) res.status(400).json({ "error": "Não interesse cadastrado para que possa ser deletado" })

    const result = await prisma.interest.delete({
      where: {
        id
      }
    })

    res.status(204).json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// router.post("/rent/evaluate", async (req, res) => {
//   try {
//     const { comment, value, propertyId } = req.body
//     // @ts-ignore
//     const userId = req.loggedUserId

//     const checkEvaluate = await prisma.rent.findFirst({
//       where: {
//         guestId: userId,
//         isActive: true
//       }
//     })

//     if (checkEvaluate.value) res.status(400).json({ "error": "Usuário já avaliou" })

//     const result = await prisma.rent.create({
//       data: {
//         comment,
//         value,
//         guest: {
//           connect: {
//             id: userId
//           }
//         },
//         property: {
//           connect: {
//             id: propertyId
//           }
//         }
//       }
//     })

//     res.json(result)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ "error": "Houve um erro com o servidor" })
//   }
// })

router.patch("/rent/evaluate", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.loggedUserId;
    const { value, comment } = req.body as unknown as { value: number, comment: string }

    const result = await prisma.rent.updateMany({
      where: {
        guestId: userId,
        isActive: true
      },
      data: {
        comment,
        value
      }
    })

    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// TODO: fix to block evaluation if user not has been guest
router.patch("/rent/:id/evaluate", async (req, res) => {
  try {
    // @ts-ignore
    const id = parseInt(req.params.id)
    const { value, comment } = req.body as unknown as { value: number, comment: string }

    const result = await prisma.rent.update({
      where: {
        id
      },
      data: {
        comment,
        value
      }
    })

    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

// TODO: refactor api to isolate upload img to property creation
router.post("/property", upload.array('img'), async (req, res) => {
  try {
    // @ts-ignore
    const id = req.loggedUserId;
    // @ts-ignore
    const img: string[] = req.files.map(value => (value.linkUrl))

    const { name,
      description,
      category,
      cep,
      street,
      neighborhood,
      city,
      uf,
      country,
      number,
      complement
    } = req.body as unknown as Property

    const {
      vacancyPrice,
      hasPool,
      hasGarage,
      hasGourmet,
      hasInternet,
      isPetFriendly,
      isAdvertisement,
      vacancyNumber
    } = req.body as {
      vacancyPrice: string,
      hasPool: string,
      hasGarage: string,
      hasGourmet: string,
      hasInternet: string,
      isPetFriendly: string,
      isAdvertisement: string,
      vacancyNumber: string
    }

    const pool = parseBoolean(hasPool)
    const garage = parseBoolean(hasGarage)
    const gourmet = parseBoolean(hasGourmet)
    const internet = parseBoolean(hasInternet)
    const petFriendly = parseBoolean(isPetFriendly)
    const advertisement = parseBoolean(isAdvertisement)
    const price = handlePrice(vacancyPrice)
    const vacancyNum = handleValue(vacancyNumber)

    const propertyResult: PrismaPromise<Property> = prisma.property.create({
      data: {
        name,
        description,
        category,
        vacancyPrice: price,
        cep,
        street,
        neighborhood,
        city,
        uf,
        country,
        number,
        complement,
        hasPool: pool,
        hasGarage: garage,
        hasGourmet: gourmet,
        hasInternet: internet,
        isPetFriendly: petFriendly,
        isAdvertisement: advertisement,
        vacancyNumber: vacancyNum,
        img,
        owner: {
          connect: {
            id
          }
        }
      }
    })

    const ownerResult = prisma.user.update({
      where: {
        id
      },
      data: {
        role: 'OWNER'
      }
    })

    const transactional = await prisma.$transaction([propertyResult, ownerResult])

    const OWNER_POSITION = 1
    const jwt = await createJWT(transactional[OWNER_POSITION].id, transactional[OWNER_POSITION].role)

    res.json([transactional, jwt])

  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.delete("/:id/rent", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.loggedUserId;
    const id = parseInt(req.params.id)

    const query = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        rent: {
          where: {
            id
          }
        }
      }
    })

    if (!query.rent[0].guestId) res.status(404).json({ "error": "Rent não cadastrado" })
    checkIfSameUser(query.rent[0].guestId, userId, res)

    const rentUpdate = await prisma.rent.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    })

    res.status(204).json(rentUpdate)
  } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

export default router