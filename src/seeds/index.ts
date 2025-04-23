import db from '../config/connection.js';
import { Thoughts, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomName } from './data.js';

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const username = `${first}_${last}`;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;

    users.push({
      username: username || 'defaultuser',
      email: email || 'email@123.com',
    });
  }

  // Add users to the collection and await the results
  const userData = await User.create(users);

  // Add a sample thought and associate it with a user
  await Thoughts.create({
    thoughtText: 'This is a seeded thought.',
    username: userData[0].username,
    userId: userData[0]._id
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
