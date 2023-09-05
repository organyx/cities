module.exports = {
  calculateDistance({ toAddress, fromAddress }) {
    const R = 6371;
    const dLat = (toAddress.latitude - fromAddress.latitude) * (Math.PI / 180);
    const dLon = (toAddress.longitude - fromAddress.longitude) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(fromAddress.latitude * (Math.PI / 180)) *
        Math.cos(toAddress.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    // Distance with 2 decimal places
    const distanceWith2DecimalPlaces = Math.round(distance * 100) / 100;
    return distanceWith2DecimalPlaces;
  }
};
