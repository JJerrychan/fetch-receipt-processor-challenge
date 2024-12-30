const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.json());
configRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});