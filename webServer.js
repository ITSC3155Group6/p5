const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const User = require('./schema/user');
const Photo = require('./schema/photo');
const SchemaInfo = require('./schema/schemaInfo');

const app = express();
const PORT = 3000;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/project6');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/test/info', async (req, res) => {
  const info = await SchemaInfo.findOne({}).lean();
  res.json(info || { version: '1.0' });
});

app.get('/user/list', async (req, res) => {
  const users = await User.find({}, '_id first_name last_name').lean();
  res.json(users);
});

app.get('/user/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid user id');
  }

  const user = await User.findById(req.params.id, '-__v').lean();

  if (!user) {
    return res.status(400).send('User not found');
  }

  res.json(user);
});

app.get('/photosOfUser/:id', async (req, res) => {
  // ✅ Check valid ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid user id');
  }

  // ✅ Check user exists
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).send('User not found');
  }

  // ✅ Get photos without __v
  const photos = await Photo.find({ user_id: req.params.id }, '-__v').lean();

  // ✅ Collect all comment user IDs
  const userIds = [
    ...new Set(
      photos.flatMap(p => (p.comments || []).map(c => String(c.user_id)))
    )
  ];

  // ✅ Fetch comment users
  const users = await User.find(
    { _id: { $in: userIds } },
    '_id first_name last_name'
  ).lean();

  const userMap = Object.fromEntries(users.map(u => [String(u._id), u]));

  // ✅ Format response exactly as expected
  const output = photos.map(photo => ({
    _id: photo._id,
    user_id: photo.user_id,
    file_name: photo.file_name,
    date_time: photo.date_time,
    comments: (photo.comments || []).map(comment => ({
      _id: comment._id,
      comment: comment.comment,
      date_time: comment.date_time,
      user: userMap[String(comment.user_id)]
    }))
  }));

  res.json(output);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
