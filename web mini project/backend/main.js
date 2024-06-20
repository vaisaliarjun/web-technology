const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const StaffDetail = require('./model.js'); 

const app = express();
const port = 3131;

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mongoURI = 'mongodb://localhost:27017/Staff_Profile';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1); 
    }
};

connectDB();
app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'search.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin', 'admin.html'));
});
app.post('/Upload/StaffDetails', async (req, res) => {
    const {
        staffName, Department, qualification, AOS, DateJoin, Experience, NoPaper,
        International, Journals, natConferenceNumber, interconference, JournalsPublished,
        InterJournalsPublished, natConference, email, office, SubjectHandled, SEReferences,
        PAffiliation, Awards
    } = req.body;

    console.log("Received data:", req.body);

    if (!staffName || !Department || !qualification || !AOS || !DateJoin || !Experience || 
        !NoPaper || !International || !Journals || !natConferenceNumber || !interconference || 
        !JournalsPublished || !InterJournalsPublished || !natConference || !email || 
        !office || !SubjectHandled || !SEReferences || !Awards) {
        return res.status(400).send('All required fields must be provided.');
    }

    const newDetail = new StaffDetail({
        staffName, Department, qualification, AOS, DateJoin, Experience, NoPaper,
        International, Journals, natConferenceNumber, interconference, JournalsPublished,
        InterJournalsPublished, natConference, email, office, SubjectHandled, SEReferences,
        PAffiliation, Awards
    });

    try {
        await newDetail.save();
        res.status(201).send('Staff detail added successfully!');
    } catch (err) {
        console.error("Error adding staff detail:", err);
        res.status(500).send('Error adding staff detail.');
    }
});
app.post('/submit', async (req, res) => {
    try {
      const { name, department } = req.body;
  

      if (!name || !department) {
        return res.status(400).send('Name and department are required');
      }
  
     
      const user = await StaffDetail.findOne({ staffName: name, Department: department });
  
      if (!user) {
        return res.status(404).send('No user found with the provided details');
      }
  
      res.render('details', { user });
  
    } catch (err) {
      console.error('Error occurred:', err);
      res.status(500).send('Error occurred: database error');
    }
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
