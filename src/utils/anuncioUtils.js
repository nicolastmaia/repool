/* eslint-disable no-restricted-syntax */
module.exports = {
  extractComodidades: (anuncios) => {
    const tmpAnuncios = [];
    for (const anuncio of anuncios) {
      const {
        hasPool,
        hasGarage,
        hasGourmet,
        hasInternet,
        isPetFriendly,
      } = anuncio;

      anuncio.comodidades = [];

      if (isPetFriendly) anuncio.comodidades.push({ nome: 'pet' });
      if (hasPool) anuncio.comodidades.push({ nome: 'pool' });
      if (hasGarage) anuncio.comodidades.push({ nome: 'garage' });
      if (hasGourmet) anuncio.comodidades.push({ nome: 'gourmet' });
      if (hasInternet) anuncio.comodidades.push({ nome: 'wifi' });

      tmpAnuncios.push(anuncio);
    }
    return tmpAnuncios;
  },
};
