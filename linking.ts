export const linking = {
  prefixes: ['blinkfix://app', 'https://blink.fix.me'],
  routes: [
    {
      name: 'HomePage',
      state: {
        routes: [
          {
            name: 'Order',
            state: {
              routes: [
                {
                  name: 'Restaurants',
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'Linking',
      state: {},
    },
    {
      name: 'HugeMenu2x2',
      state: {},
    },
  ],
};
export const linkingLoggedOut = {
  prefixes: ['blinkfix://', 'https://blink.fix.me'],
  routes: [
    {
      name: 'Login',
      state: {},
    },
    {
      name: 'Register',
      state: {},
    },
  ],
};
