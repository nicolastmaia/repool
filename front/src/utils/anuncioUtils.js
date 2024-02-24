module.exports = {
  extractComodidades: (anuncio) => {
    const { hasPool, hasGarage, hasGourmet, hasInternet, isPetFriendly } = anuncio;

    anuncio.comodidades = [];

    if (isPetFriendly) anuncio.comodidades.push({ nome: 'pet' });
    if (hasPool) anuncio.comodidades.push({ nome: 'pool' });
    if (hasGarage) anuncio.comodidades.push({ nome: 'garage' });
    if (hasGourmet) anuncio.comodidades.push({ nome: 'gourmet' });
    if (hasInternet) anuncio.comodidades.push({ nome: 'wifi' });

    return anuncio;
  },

  checkIfFavorite: (anuncio, favorites) => {
    anuncio.isFavorite = !!favorites.find((element) => element.id === anuncio.id);
    return anuncio;
  },

  checkIfInterest: (anuncio, user) => {
    anuncio.interest = user.interests.find((element) => element.propertyId === anuncio.id);

    anuncio.isInterest = !!anuncio.interest;
    return anuncio;
  },

  checkIfActiveRent: (anuncio, user) => {
    anuncio.rent = null;
    if (user.rent.length > 0) {
      const rent = user.rent.find((element) => element.propertyId === anuncio.id);
      anuncio.rent = rent && rent.isActive ? rent : null;
    }
    return anuncio;
  },

  checkIfMyProperty: (anuncio, myProperties) => {
    anuncio.isMyProperty = !!myProperties.find((element) => element.id === anuncio.id);
    return anuncio;
  },
};
