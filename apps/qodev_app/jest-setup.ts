import '@testing-library/jest-dom';

//@ts-ignore
global.userAgent = jest.spyOn(navigator, 'userAgent', 'get')