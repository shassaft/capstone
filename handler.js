const admin = require('firebase-admin');

// Handler untuk register
exports.registerHandler = (req, res) => {
  const { email, password } = req.body;
  const usersCollection = admin.firestore().collection('users');

  // Mengecek apakah email sudah pernah digunakan
  usersCollection
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        res.status(400).json({ message: 'Email already in use' });
      } else {
        // Membuat data user baru
        const newUser = { email, password };

        usersCollection
          .add(newUser)
          .then(() => {
            res.status(200).json({ message: 'User registered successfully' });
          })
          .catch((error) => {
            res.status(500).json({ message: 'Error registering user' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error registering user' });
    });
};

// Handler untuk rute login
exports.loginHandler = (req, res) => {
  const { email, password } = req.body;

  // Mengambil referensi ke koleksi "users" dalam Firestore
  const usersCollection = admin.firestore().collection('users');

  // Mengecek apakah email dan password benar
  usersCollection
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        const user = snapshot.docs[0].data();
        if (user.password === password) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error logging in' });
    });
};

// Handler untuk menampilkan seluruh artikel
exports.getAllArticlesHandler = (req, res) => {
  const articlesCollection = admin.firestore().collection('articles');

  // Menampilkan seluruh artikel 
  articlesCollection
    .get()
    .then((snapshot) => {
      const articles = [];
      snapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving articles' });
    });
};

// Handler menampilkan satu artikel berdasarkan ID
exports.getArticleByIdHandler = (req, res) => {
    const articleId = req.params.id;
    const articlesCollection = admin.firestore().collection('articles').doc(articleId);
  
    // menampilkan artikel berdasarkan ID
    articlesCollection
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { id, judul, isi } = doc.data();
          const articleData = { id, judul, isi };
          res.status(200).json(articleData);
        } else {
          res.status(404).json({ message: 'Article not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error retrieving article' });
      });
  };
  