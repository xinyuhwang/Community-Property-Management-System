export const mockEvents = [
  {
    id: "1",
    title: "Community BBQ",
    description: "Annual neighborhood barbecue",
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    startTime: new Date().setHours(17, 0, 0, 0),
    endTime: new Date().setHours(20, 0, 0, 0),
    location: "Common Area",
  },
  {
    id: "2",
    title: "Yoga Class",
    description: "Weekly yoga session",
    date: new Date(Date.now() + 86400000 * 5).toISOString(),
    startTime: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(10, 0, 0, 0),
    location: "Community Gym",
  },
];

export const mockAnnouncements = [
  {
    id: "1",
    title: "Pool Maintenance",
    message: "The pool will be closed for cleaning on Friday",
    date: new Date().toISOString(),
    priority: "high",
  },
  {
    id: "2",
    message: "New fitness equipment has been installed in the gym",
    date: new Date(Date.now() - 86400000).toISOString(),
    priority: "normal",
  },
];
