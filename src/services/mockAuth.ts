interface MockUser {
  id: string
  email: string
  name: string
}

const MOCK_USER: MockUser = {
  id: "1",
  email: "admin@habitflow.com",
  name: "Admin Silva",
}

export const mockAuth = {
  login: (email: string, password: string): Promise<MockUser> => {
    return new Promise((resolve, reject) => {
      if (email === "admin@habitflow.com" && password === "123456") {
        localStorage.setItem("mockUser", JSON.stringify(MOCK_USER))
        resolve(MOCK_USER)
      } else {
        reject(new Error("Invalid credentials"))
      }
    })
  },

  logout: () => {
    localStorage.removeItem("mockUser")
  },

  getCurrentUser: (): MockUser | null => {
    const user = localStorage.getItem("mockUser")
    return user ? JSON.parse(user) : null
  },
}
