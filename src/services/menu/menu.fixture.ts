export const validMenu = {
  menuName: '김치찌개',
  price: 7000,
};

export const invalidMenuName = {
  menuName: '',
  price: 7000,
};

export const invalidMenuPrice = {
  menuName: '김치찌개',
  price: -7000,
};

export const nonExistingMenu = {
  menuName: '김치쮜개',
  price: 7000,
};

export const existingMenu = {
  menuName: '김치찌개',
  price: 7000,
};

// Q. 이게 맞나?
export const menuDBFixture = [
  {
    id: 1,
    storeId: 1,
    menuName: '김치찌개',
    price: 7000,
  },
  {
    id: 2,
    storeId: 1,
    menuName: '된장찌개',
    price: 7000,
  },
  {
    id: 3,
    storeId: 1,
    menuName: '부대찌개',
    price: 7000,
  },
  {
    id: 4,
    storeId: 2,
    menuName: '불고기버거',
    price: 7000,
  },
  {
    id: 5,
    storeId: 2,
    menuName: '치즈버거',
    price: 7000,
  },
  {
    id: 6,
    storeId: 2,
    menuName: '불고기버거',
    price: 7000,
  },
  {
    id: 7,
    storeId: 3,
    menuName: '짜장면',
    price: 7000,
  },
];
