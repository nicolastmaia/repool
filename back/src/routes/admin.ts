import { Router } from 'express'
import { prisma } from '../database'
import { handleDateAgo } from '../helpers'

const router = Router()

router.get('/sex', async (req, res) => {
  try {

    const all = await prisma.user.count()

    const usersBySex = await prisma.user.groupBy({
      by: ["sex"],
      count: {
        sex: true
      }
    })

    const countBySex = { all, usersBySex }
    res.json(countBySex)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get('/sex-month', async (req, res) => {
  try {
    const today = new Date()
    const thirtyDaysAgo = handleDateAgo(today)

    const all = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    const usersBySexCreatedThirtyDaysAgo = await prisma.user.groupBy({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      by: ["sex"],
      count: {
        sex: true
      }
    })

    const countSex = { all, usersBySexCreatedThirtyDaysAgo }
    res.json(countSex)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get('/properties', async (req, res) => {
  try {
    const all = await prisma.property.count()

    const propertiesByUf = await prisma.property.groupBy({
      by: ["uf"],
      count: {
        uf: true
      }
    })

    const countProperty = { all, propertiesByUf }
    res.json(countProperty)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get('/properties-month', async (req, res) => {
  try {
    const today = new Date()
    const thirtyDaysAgo = handleDateAgo(today)

    const all = await prisma.property.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    const propertiesByUfCreatedThirtyDaysAgo = await prisma.property.groupBy({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      by: ["uf"],
      count: {
        uf: true
      }
    })

    const countProperty = { all, propertiesByUfCreatedThirtyDaysAgo }
    res.json(countProperty)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

router.get('/ad-month', async (req, res) => {
  try {
    const today = new Date()
    const thirtyDaysAgo = handleDateAgo(today)

    const all = await prisma.property.count({
      where: {
        isAdvertisement: true,
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    const propertiesInAdCreatedThirtyDaysAgo = await prisma.property.groupBy({
      where: {
        isAdvertisement: true
      },
      by: ["uf"],
      count: {
        uf: true
      }
    })

    const countProperty = { all, propertiesInAdCreatedThirtyDaysAgo }
    res.json(countProperty)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Houve um erro com o servidor" })
  }
})

export default router