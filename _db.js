let games = [
  { id: '1', name: 'PubG', platform: ['mobile', 'pc'] },
  { id: '2', name: 'CoD', platform: ['mobile', 'pc'] },
  { id: '3', name: 'CoD:Ghosts', platform: ['mobile', 'pc', 'ps5'] },
];

let authors = [
  { id: '1', name: 'Surya', verified: true },
  { id: '2', name: 'Maddy', verified: true },
  { id: '3', name: 'Rockstar', verified: false },
];

let reviews = [
  {
    id: '1',
    rating: 9,
    content: 'lorem ipsum dolor sit amet',
    author_id: "1",
    game_id: "2",
  },
  {
    id: '2',
    rating: 9,
    content: 'lorem ipsum dolor sit amet',
    author_id: "3",
    game_id: "1",
  },
  {
    id: '3',
    rating: 9,
    content: 'lorem ipsum dolor sit amet',
    author_id: "1",
    game_id: "2",
  },
  {
    id: '4',
    rating: 8,
    content: 'lorem ipsum dolor sit amet',
    author_id: "1",
    game_id: "3",
  },
  {
    id: '5',
    rating: 9,
    content: 'lorem ipsum dolor sit amet',
    author_id: "2",
    game_id: "2",
  },
];

export default { games, reviews, authors };
