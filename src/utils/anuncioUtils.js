module.exports = {
  extractComodidades: (anuncio) => {
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

    return anuncio;
  },
};
