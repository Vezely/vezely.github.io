import multer from 'multer';
import path from 'path';
import sizeOf from 'image-size';

export const config = {
	api: {
		bodyParser: false,
	},
};

// Configuration de Multer
const storage = multer.diskStorage({
	// destination: 'public/images/test/',
	destination: function (req, file, cb) {
		const chemin = `public/${req.query.chemin}/` || 'public/images/';
		cb(null, chemin);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single('photo');

function checkFileType(file, cb) {
	const filetypes = /jpeg|jpg|avif|png|gif|webp/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error('Images Only!'));
	}
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		upload(req, res, async (err) => {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}

			try {
				// Si une photo a été envoyée
				if (req.file) {
					const dimensions = sizeOf(req.file.path);
					console.log(req.body);

					res.status(200).json({
						msg: 'La photo a été ajouter avec succés!',
						fileName: req.file.filename,
						width: dimensions.width,
						height: dimensions.height,
					});
				}
			} catch (error) {
				res.status(500).json({ error: 'An error occurred while processing the request.' });
			}
			res.status(200).json({});
		});
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
