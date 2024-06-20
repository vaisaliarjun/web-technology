const mongoose = require("mongoose");

const staffDetailSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  AOS: {
    type: String,
    required: true,
  },
  DateJoin: {
    type: String,
    required: true,
  },
  Experience: {
    type: String,
    required: true,
  },
  NoPaper: {
    type: String,
    required: true,
  },
  International: {
    type: String,
    required: true,
  },
  Journals: {
    type: String,
    required: true,
  },
  natConferenceNumber: {
    type: String,
    required: true,
  },
  interconference: {
    type: String,
    required: true,
  },
  JournalsPublished: {
    type: String,
    required: true,
  },
  InterJournalsPublished: {
    type: String,
    required: true,
  },
  natConference: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  office: {
    type: String,
    required: true,
  },
  SubjectHandled: {
    type: String,
    required: true,
  },
  SEReferences: {
    type: String,
    required: true,
  },
  PAffiliation: {
    type: String,
  },
  Awards: {
    type: String,
    required: true,
  },
});

const StaffDetail = mongoose.model("StaffDetail", staffDetailSchema);

module.exports = StaffDetail;
