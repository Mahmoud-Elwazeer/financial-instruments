import 'dotenv/config';
import app from './app.js'
import dbConnection from './configurations/database.js'

// env
const PORT = process.env.PORT || 3000;

// connect with database
dbConnection();

// Start server
try {
    app.listen(PORT, () => {
        console.log("test")
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
}
