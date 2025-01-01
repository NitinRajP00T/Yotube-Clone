const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloud'); // Ensure cloudinary is properly configured

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = file.fieldname === 'thumbnail' ? 'thumbnails' : 'videos';
        let resourceType = file.fieldname === 'thumbnail' ? 'image' : 'video';
        return {
            folder: folder,
            resource_type: resourceType,
            allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi', 'mkv'],
        };
    },
});

const upload = multer({ storage });
module.exports = upload;
