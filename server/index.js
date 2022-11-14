const express = require("express");
const cors = require("cors");
const SupervisorsJSON = require("./mock/supervisors.json");
const {
  filterNonNumericSupervisors,
  formatSupervisors,
  sortSupervisors,
  validatePayload,
} = require("./utility");

const app = express();

app.use(cors());
app.use(express.json());

//port
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET");
    return res.status(200).json({});
  }
  next();
});

// GET /api/supervisors
app.get("/api/supervisors", (req, res) => {
  const filterSupervisors = filterNonNumericSupervisors(SupervisorsJSON);
  const sortedSupervisors = sortSupervisors(filterSupervisors);
  const formattedSupervisors = formatSupervisors(sortedSupervisors);
  res.status(200).json({
    data: formattedSupervisors,
    count: formattedSupervisors.length,
    success: true,
  });
});

// POST /api/submit
app.post("/api/submit", (req, res) => {
  const { data = null, isValid, message } = validatePayload(req.body);
  if (!isValid) {
    res.status(409).json({ data, message, success: false });
  } else {
    console.log("SUBMITTED DATA: ", data);
    res.status(200).json({ data, message, success: true });
  }
});

app.listen(PORT, () => {
  console.log("Server is on fly at port 4000!");
});
