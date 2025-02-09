const express = require('express');
const bodyParser = require('body-parser');
const downloadService = require('./services/downloadService');
const keywordRouter = require('./routes/keywordRoutes');
const app = express();

app.use(bodyParser.json());

app.use('/api/keywords', keywordRouter);
app.use('/api/download', downloadService.router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});