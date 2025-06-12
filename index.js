const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route handler
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to College Lookup Service API',
        endpoints: {
            getAllColleges: '/api/colleges',
            getByDistrict: '/api/colleges/district/:district',
            getByType: '/api/colleges/type/:type',
            search: '/api/colleges/search?district=DISTRICT&type=TYPE',
            getCollegeTypes: '/api/college-types',
            getDistricts: '/api/districts'
        }
    });
});

// Read and parse the Excel file
let colleges = [];
try {
    const workbook = XLSX.readFile('Admission Information.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    colleges = XLSX.utils.sheet_to_json(worksheet);
} catch (error) {
    console.error('Error reading Excel file:', error);
}

// Helper function to filter colleges
const filterColleges = (district, collegeType) => {
    return colleges.filter(college => {
        const matchesDistrict = !district || college.District?.toLowerCase() === district.toLowerCase();
        const matchesType = !collegeType || college['College Type']?.toLowerCase() === collegeType.toLowerCase();
        return matchesDistrict && matchesType;
    });
};

// Get all colleges
app.get('/api/colleges', (req, res) => {
    res.json(colleges);
});

// Get colleges by district
app.get('/api/colleges/district/:district', (req, res) => {
    const { district } = req.params;
    const filteredColleges = filterColleges(district);
    res.json(filteredColleges);
});

// Get colleges by type
app.get('/api/colleges/type/:type', (req, res) => {
    const { type } = req.params;
    const filteredColleges = filterColleges(null, type);
    res.json(filteredColleges);
});

// Get colleges by both district and type
app.get('/api/colleges/search', (req, res) => {
    const { district, type } = req.query;
    const filteredColleges = filterColleges(district, type);
    res.json(filteredColleges);
});

// Get available college types
app.get('/api/college-types', (req, res) => {
    const types = [...new Set(colleges.map(college => college['College Type']))].filter(Boolean);
    res.json(types);
});

// Get available districts
app.get('/api/districts', (req, res) => {
    const districts = [...new Set(colleges.map(college => college.District))].filter(Boolean);
    res.json(districts);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 