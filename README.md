# CHIFFONated

CHIFFONated is an online ordering system for a cake business, allowing customers to browse cakes, add them to their cart, and place orders online. The admin can manage products and update order statuses.

## Features

- User authentication with Firebase
- Browse and search for cakes
- Add cakes to cart and checkout
- View past and current orders
- Admin dashboard for managing products and orders

## Tech Stack

- **Frontend:** React.js
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Authentication:** Firebase Authentication (email/password)
- **Hosting:** Firebase Hosting

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Firebase account and project set up

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd chiffonated
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your Firebase configuration in `src/config/firebase.js`.

5. Start the development server:
   ```
   npm start
   ```

### Deployment

To deploy the application to Firebase Hosting, run:
```
firebase deploy
```

## Folder Structure

```
chiffonated
├── src
│   ├── components
│   │   ├── common
│   │   ├── products
│   │   └── orders
│   ├── pages
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetails.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Orders.js
│   │   └── admin
│   │       └── Dashboard.js
│   ├── config
│   ├── context
│   ├── hooks
│   ├── utils
│   ├── App.js
│   ├── index.js
│   └── routes.js
├── public
│   └── index.html
├── .env
├── .gitignore
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.