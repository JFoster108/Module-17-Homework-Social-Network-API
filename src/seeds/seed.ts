import mongoose from 'mongoose';
import User from '../models/User';
import Thought from '../models/Thought';

const seedUsers = [
  {
    username: 'caspian123',
    email: 'caspian@example.com',
  },
  {
    username: 'Aurora_borialis',
    email: 'aurora@example.com',
  },
  {
    username: 'diyqueen_789',
    email: 'diyqueen@example.com',
  },
];

const seedThoughts = [
  {
    thoughtText: "This is Caspian's first thought!",
    username: 'caspian123',
  },
  {
    thoughtText: "Aurora's deep philosophical insight!",
    username: 'Aurora_borialis',
  },
  {
    thoughtText: "DIY Queen wonders if AI will take over!",
    username: 'diyqueen_789',
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('📡 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('🔥 Existing data cleared');

    // Insert users
    const users = await User.insertMany(seedUsers);
    console.log('✅ Users seeded:', users);

    // Insert thoughts and associate them with users
    for (let thoughtData of seedThoughts) {
      const user = users.find((u) => u.username === thoughtData.username);
      if (!user) continue;

      const newThought = await Thought.create({
        thoughtText: thoughtData.thoughtText,
        username: user.username,
      });

      // Add thought ID to user's thoughts array
      await User.findByIdAndUpdate(user._id, { $push: { thoughts: newThought._id } });

      console.log(`💡 Thought added for ${user.username}: "${newThought.thoughtText}"`);
    }

    console.log('🌱 Database successfully seeded');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run seed function
seedDatabase();
