import { propertyCategory, userRole, userSex } from '@prisma/client'
import faker from 'faker-br'
import { prisma } from '../src/database'
import { hashing } from '../src/helpers'

const user: userRole = "USER"
const owner: userRole = "OWNER"
const apart: propertyCategory = "APARTMENT"
const house: propertyCategory = "HOUSE"
const male: userSex = "MALE"
const female: userSex = "FEMALE"

const length = 50
const mean = Math.floor(length / 2)

const users = Array.from({ length }).map((v, i) => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar: faker.image.avatar(),
  role: i < mean ? user : owner,
  bio: faker.lorem.sentence(),
  sex: i < mean ? male : female,
  tel: faker.phone.phoneNumberFormat(),
  cel: faker.phone.phoneNumberFormat()
}))

const properties = Array.from({ length }).map((v, i) => ({
  ownerId: i + 1,
  name: faker.name.firstName(),
  description: faker.lorem.paragraph(),
  img: faker.image.imageUrl(),
  category: i < mean ? apart : house,
  cep: faker.address.zipCode(),
  street: faker.address.streetName(),
  neighborhood: faker.address.county(),
  city: faker.address.city(),
  uf: faker.address.stateAbbr(),
  country: faker.address.countryCode(),
  number: `${Math.floor(Math.random() * 100)}`,
  complement: faker.address.secondaryAddress(),
  vacancyPrice: parseFloat(faker.commerce.price()),
  hasGarage: true,
  hasGourmet: true,
  hasInternet: true,
  isPetFriendly: true,
  isAdvertisement: true,
  vacancyNumber: Math.floor(Math.random() * (i - 1) + 1),
  viewed: Math.floor(Math.random() * (i - 0) + 0),
}))

const rents = Array.from({ length }).map((v, i) => ({
  value: Math.floor(Math.random() * (5 - 1) + 1),
  comment: faker.lorem.paragraph(),
  isActive: i < mean ? false : true,
  guestId: length - i,
  propertyId: i + 1
}))

const interests = Array.from({ length }).map((v, i) => ({
  uConfirmation: i < mean ? false : true,
  pConfirmation: i < mean ? false : true,
  userId: length - i,
  propertyId: i + 1
}))

async function main() {
  const hash = await hashing(process.env.ADMIN_PASSWORD)

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@repool.com.br',
      password: hash,
      role: 'ADMIN',
      avatar: faker.image.avatar(),
      bio: "Olá, sou o Administrador do sistema Repool. Aqui você pode escolher uma república, um lugar que deseja viver durante sua fase como estudante universitário, por um preço baixo e na qualidade que desejar",
      tel: "xxxx-xxxx",
      cel: "yyyy-yyyy",
      property: {
        create: {
          name: 'Casa Lilás',
          description: 'Uma casa muito Lilás',
          img: ['https://i.pinimg.com/originals/3a/03/a9/3a03a9db749385c3c8f2dedc5ea2e9c3.jpg',
            'http://2.bp.blogspot.com/_STMEfocjkw4/TU6DryxaoJI/AAAAAAAACik/rOiLfB12cqc/s1600/WCT_13+de+janeiro+de+2011_0089.jpg',
            'https://cf.bstatic.com/images/hotel/max1024x768/238/238665580.jpg'
          ],
          category: 'HOUSE',
          cep: '22222222',
          street: 'rua das ruas',
          neighborhood: 'bairro',
          city: 'Seropédica',
          uf: 'RJ',
          country: 'BR',
          number: '10',
          complement: 'Próximo à UFRRJ',
          vacancyPrice: 555.0,
          hasGarage: true,
          hasGourmet: true,
          hasInternet: true,
          isPetFriendly: true,
          isAdvertisement: true,
        }
      }
    }
  })

  await prisma.user.createMany({
    data: users
  })

  await prisma.property.createMany({
    data: properties
  })

  await prisma.interest.createMany({
    data: interests
  })

  await prisma.rent.createMany({
    data: rents
  })
}

main().catch((e) => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})

