// Coordinates supplied by Cantutas Cakes: GeoJSON uses [longitude, latitude].
const BRANCHES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature', id: 'cantutas-vino-tinto',
      geometry: { type: 'Point', coordinates: [-68.1257, -16.4842] },
      properties: {
        title: 'Pastelería Cantutas Cakes - Vino Tinto',
        description: 'Av. Baltazar de Salas (frente al Banco Sol), La Paz. Especialistas en tortas personalizadas y masitas.',
        'marker-color': '#E63946', 'marker-size': 'large'
      }
    },
    {
      type: 'Feature', id: 'cantutas-periferica',
      geometry: { type: 'Point', coordinates: [-68.1205, -16.4801] },
      properties: {
        title: 'Pastelería Cantutas Cakes - Periférica',
        description: 'Av. Gral. Juan José Torrez #270 (frente al Colegio Suárez Figueroa).',
        'marker-color': '#4A90E2', 'marker-size': 'large'
      }
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('branch-list');
  const mapContainer = document.getElementById('branches-map');
  BRANCHES.features.forEach((feature, index) => {
    const [lng, lat] = feature.geometry.coordinates;
    const card = document.createElement('article');
    card.className = 'branch-card';
    card.style.setProperty('--marker-color', feature.properties['marker-color']);
    const heading = document.createElement('h3');
    heading.textContent = feature.properties.title.replace('Pastelería Cantutas Cakes - ', '');
    const description = document.createElement('p');
    description.textContent = feature.properties.description;
    const directions = document.createElement('a');
    directions.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    directions.target = '_blank';
    directions.rel = 'noopener noreferrer';
    directions.textContent = 'Cómo llegar';
    const show = document.createElement('button');
    show.type = 'button';
    show.textContent = 'Ver en el mapa';
    show.hidden = false;
    show.addEventListener('click', () => {
      const target = document.getElementById('map-' + feature.id);
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.focus({ preventScroll: true });
    });

    // Official embeds supply their own origin, including on file:// pages.
    const mapCard = document.createElement('section');
    mapCard.className = 'branch-map-card';
    mapCard.id = 'map-' + feature.id;
    mapCard.tabIndex = -1;
    const mapHeading = document.createElement('h3');
    mapHeading.textContent = (index + 1) + '. ' + heading.textContent;
    const frame = document.createElement('iframe');
    const query = new URLSearchParams({
      bbox: [lng - 0.006, lat - 0.004, lng + 0.006, lat + 0.004].join(','),
      layer: 'mapnik',
      marker: [lat, lng].join(',')
    });
    frame.src = 'https://www.openstreetmap.org/export/embed.html?' + query;
    frame.title = 'Mapa de ' + feature.properties.title;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    const fallback = document.createElement('a');
    fallback.href = 'https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lng + '#map=17/' + lat + '/' + lng;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'Abrir mapa completo';
    mapCard.append(mapHeading, frame, fallback);
    mapContainer.append(mapCard);

    card.append(heading, description, directions, show);
    list.append(card);
  });
  // Confirmed branches without coordinates: do not invent a map position.
  ['Vino Tinto — segunda sucursal', 'Achachicala'].forEach(name => {
    const card = document.createElement('article');
    card.className = 'branch-card';
    card.style.setProperty('--marker-color', '#6B2FA0');
    const heading = document.createElement('h3');
    heading.textContent = name;
    const description = document.createElement('p');
    description.textContent = 'Escríbenos para conocer la dirección exacta y cómo llegar.';
    const link = document.createElement('a');
    link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, quisiera la ubicación de la sucursal de ' + name + '.')}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Consultar ubicación';
    card.append(heading, description, link);
    list.append(card);
  });
});
