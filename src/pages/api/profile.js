import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(); // Connect to the default database

  const email = req.query.email; 
console.log(email)
  if (req.method === 'GET') {
    try {
      const user = await db.collection('users').findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      const { password, ...userData } = user;

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user data', error });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, age, dob, contact } = req.body;
console.log(req.body)
      const result = await db.collection('users').updateOne(
        { email }, // Find user by email
        { $set: { name, age, dob, contact } }
      );

      if (result.modifiedCount === 0) return res.status(404).json({ message: 'User not found or no updates made' });

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user data', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
