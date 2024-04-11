export const AddToCart = (item, inventory) => {
  let updateInv = inventory;
  if (item.available - (item.quantity + item.freeItems) > 0) {
    if (item?.name === "Coca-Cola") {
      updateInv = inventory?.map((inv) => {
        if (inv?.name === "Coca-Cola") {
          const totalCocaCola = item?.quantity + 1;
          const freeCans = Math.floor(totalCocaCola / 6);
          if (freeCans) {
            return {
              ...inv,
              freeItems: freeCans,
              quantity: inv.quantity + 1,
              isInCart: true,
            };
          } else {
            return {
              ...inv,
              quantity: inv.quantity + 1,
              isInCart: true,
            };
          }
        } else {
          return inv;
        }
      });
    } else {
      updateInv = inventory?.map((inv) => {
        if (inv.name === item.name) {
          return {
            ...inv,
            quantity: inv.quantity + 1,
            isInCart: true,
          };
        } else {
          return inv;
        }
      });
    }
  }

  const finalinv = updateInv?.map((d) => {
    if (item.name === "Croissants" && d.name === "Coffee") {
      const totalConst = updateInv.find((inv) => inv.name === "Croissants");
      const freeCoffee = Math.floor(totalConst.quantity / 3);
      if (freeCoffee) {
        if (d.quantity > d.available - freeCoffee) {
          return {
            ...d,
            quantity: d.available - freeCoffee,
            freeItems: freeCoffee,
            isInCart: true,
          };
        } else {
          return {
            ...d,
            freeItems: freeCoffee,
            isInCart: true,
          };
        }
      } else {
        return d;
      }
    }
    return d;
  });

  return finalinv;
};

export const removeFromCart = (item, inventory) => {
  let updateInv = inventory;
  if (item.available - item.freeItems > 0) {
    if (item?.name === "Coca-Cola") {
      updateInv = inventory?.map((inv) => {
        if (inv?.name === "Coca-Cola") {
          const totalCocaCola = inv?.quantity - 1;
          const freeCans = Math.floor(totalCocaCola / 6);
          if (totalCocaCola < 6) {
            return {
              ...inv,
              freeItems: freeCans,
              quantity: totalCocaCola,
              isInCart: totalCocaCola > 0 ? true : false,
            };
          } else {
            return {
              ...inv,
              quantity: totalCocaCola,
              isInCart: totalCocaCola > 0 ? true : false,
            };
          }
        } else {
          return inv;
        }
      });
    } else {
      updateInv = inventory?.map((inv) => {
        if (inv.name === item.name) {
          return {
            ...inv,
            quantity: inv.quantity - 1,
            isInCart: inv.quantity - 1 > 0 ? true : false,
          };
        } else {
          return inv;
        }
      });
    }
  }

  const finalinv = updateInv?.map((d) => {
    if (item.name === "Croissants" && d.name === "Coffee") {
      const totalConst = updateInv.find((inv) => inv.name === "Croissants");
      const freeCoffee = Math.floor(totalConst.quantity / 3);
      if (freeCoffee) {
        return {
          ...d,
          freeItems: freeCoffee,
          isInCart: freeCoffee > 0 ? true : false,
        };
      } else {
        return {
          ...d,
          freeItems: 0,
          isInCart: d.quantity ? true : false,
        };
      }
    }
    return d;
  });

  return finalinv;
};

export const resetCart = (inventory) => {
  const result = inventory?.map((d) => {
    return {
      ...d,
      quantity: 0,
      isInCart: false,
      freeItems: 0,
    };
  });
  return result;
};

export const removeItem = (item, inventory) => {
  const updatedInventories = inventory?.map((g) => {
    if (g.id === item?.id) {
      return {
        ...g,
        quantity: 0,
        isInCart: false,
        freeItems: 0,
      };
    } else {
      return g;
    }
  });
  const finalInv = updatedInventories?.map((d) => {
    if (item.name === "Croissants" && d.name === "Coffee") {
      return {
        ...d,
        freeItems: 0,
        isInCart: d?.quantity ? true : false,
      };
    } else {
      return d;
    }
  });

  return finalInv;
};
