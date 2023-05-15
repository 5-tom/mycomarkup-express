const express = require("express");
const { exec } = require("child_process");
const cors = require("cors"); //

const app = express();
app.use(cors()); //
app.use(express.text());
const token = "dev"; //
app.post("/mycomarkup", (req, res) => {
	const auth = req.headers.authorization;
	if(auth !== `Bearer ${token}`){
		return res.status(401).send({error: "Unauthorised"});
	};
	const stdin = req.body;

	exec(`echo "${stdin}" | mycomarkup -hypha-name dummyname`, (err, stdout) => {
		return res.status(200).send(stdout);
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
