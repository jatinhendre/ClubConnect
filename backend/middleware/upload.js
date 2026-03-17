import multer from "multer";

// Use memory storage — files are kept in req.file.buffer
// instead of being written to disk. The controller is
// responsible for uploading the buffer to Cloudinary.
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;