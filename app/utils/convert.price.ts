const formatPrice = (price: number) => {
      return price.toLocaleString('vi-VI', {
            style: 'currency',
            currency: 'VND'
      });
}

export default formatPrice;
