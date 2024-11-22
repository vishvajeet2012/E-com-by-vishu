const cloudinary = require('cloudinary').v2;  // Import Cloudinary

// Controller to handle dog product creation
exports.dogProductController = (req, res) => {
    // Ensure the file is provided in the request
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: 'No photo file uploaded' });
    }
  
    const file = req.files.photo;
  
    // Upload to Cloudinary
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) {
        // Handle the error
        console.error('Cloudinary upload error:', err);
        return res.status(500).json({ message: 'Error uploading image', error: err.message });
      }
  
      // Successfully uploaded, log the result and send response back to client
      console.log('Cloudinary upload result:', result);
  
      // Here, you can proceed with other dog product data and store it in your database.
      // For example:
      const newProduct = {
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        price: req.body.price,
        description: req.body.description,
        gender: req.body.gender,
        size: req.body.size,
        lifeExpectancy: req.body.lifeExpectancy,
        image: result.secure_url, // The URL of the uploaded image
      };
  
      // Assuming you have a Product model and it's used to save the product data to the database
      // Example: await Product.create(newProduct);
  
      res.status(200).json({
        message: 'Product added successfully',
        product: newProduct,
        imageUrl: result.secure_url, // Return the image URL in the response
      });
    });
  };