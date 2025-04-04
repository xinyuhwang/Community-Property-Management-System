// export const mockAuth = {
//   currentUser: {
//     uid: "mock-user-id",
//     email: "resident@test.com",
//     displayName: "Test Resident",
//     isAdmin: false,
//   },
//   async login(email, password) {
//     if (email === "admin@test.com") {
//       this.currentUser = {
//         ...this.currentUser,
//         email,
//         isAdmin: true,
//       };
//     } else {
//       this.currentUser = {
//         ...this.currentUser,
//         email: email || "resident@test.com",
//         isAdmin: false,
//       };
//     }
//     return { user: this.currentUser };
//   },
//   async logout() {
//     this.currentUser = null;
//     return Promise.resolve();
//   },
//   onAuthStateChanged(callback) {
//     callback(this.currentUser);
//     return () => {}; // Return unsubscribe function
//   },
// };
export const mockAuth = {
  currentUser: null,

  async login(email, password) {
    this.currentUser = {
      uid: "mock-user-id",
      email,
      displayName: email.includes("admin") ? "Admin User" : "Resident User",
      isAdmin: email.includes("admin"),
    };
    return { user: this.currentUser };
  },

  async logout() {
    this.currentUser = null;
    return Promise.resolve();
  },

  onAuthStateChanged(callback) {
    callback(this.currentUser);
    return () => {}; // mock unsubscribe function
  },
};
