import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NEXT_PUBLIC_MEGA_EMAIL = 'test@example.com'
process.env.NEXT_PUBLIC_MEGA_PASSWORD = 'testpassword'
process.env.NEXT_PUBLIC_MEGA_FOLDER_ID = 'test-folder'

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
} 