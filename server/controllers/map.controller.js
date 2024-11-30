const { validationResult } = require('express-validator');
const mapService = require('../services/map.service.js');

module.exports.getAddressCoordinate = async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ message: 'Address parameter is required.' });
    }

    try {
        // Call the service to get coordinates
        const coordinates = await mapService.getAddressCoordinate(address);

        if (!coordinates) {
            return res.status(404).json({ message: 'Coordinates not found for the provided address.' });
        }

        // Return coordinates as JSON
        res.status(200).json({ coordinates });
    } catch (error) {
        console.error('Error fetching coordinates:', error); // Log the error
        res.status(500).json({ message: 'Internal server error while fetching coordinates.' });
    }
};
