const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors()); // Add this line

// Middleware to parse JSON bodies
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '34.128.86.151',
    user: 'praktcc2024',
    password: 'Santosa123',
    database: 'auth_db'
});

// Secret key for JWT
const secretKey = 'your_secret_key'; // Replace with your own secret key

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date();
        const updatedAt = createdAt;

        pool.query(
            'INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, createdAt, updatedAt],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'Internal server error', error });
                }
                res.status(201).json({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        try {
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login successful',
                token,
                refreshToken: user.refresh_token
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    });
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// CRUD endpoints for 'mahasiswa' table
// Create a new mahasiswa
app.post('/mahasiswa', authenticateToken, (req, res) => {
    const { nama, jurusan, alamat } = req.body;

    if (!nama || !jurusan || !alamat) {
        return res.status(400).json({ message: 'Nama, jurusan, and alamat are required' });
    }

    pool.query(
        'INSERT INTO mahasiswa (nama, jurusan, alamat) VALUES (?, ?, ?)',
        [nama, jurusan, alamat],
        (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Internal server error', error });
            }
            res.status(201).json({ message: 'Mahasiswa created successfully', id: results.insertId });
        }
    );
});

// Read all mahasiswa
app.get('/mahasiswa', authenticateToken, (req, res) => {
    pool.query('SELECT * FROM mahasiswa', (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
        res.status(200).json(results);
    });
});

// Read a single mahasiswa by ID
app.get('/mahasiswa/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM mahasiswa WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Mahasiswa not found' });
        }

        res.status(200).json(results[0]);
    });
});

// Update a mahasiswa by ID
app.put('/mahasiswa/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { nama, jurusan, alamat } = req.body;

    if (!nama || !jurusan || !alamat) {
        return res.status(400).json({ message: 'Nama, jurusan, and alamat are required' });
    }

    pool.query(
        'UPDATE mahasiswa SET nama = ?, jurusan = ?, alamat = ? WHERE id = ?',
        [nama, jurusan, alamat, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Internal server error', error });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Mahasiswa not found' });
            }

            res.status(200).json({ message: 'Mahasiswa updated successfully' });
        }
    );
});

// Delete a mahasiswa by ID
app.delete('/mahasiswa/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM mahasiswa WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Mahasiswa not found' });
        }

        res.status(200).json({ message: 'Mahasiswa deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
