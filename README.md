```Name: Mandar Mandavgane```
```Assignment: UI for Login and Signup``` 

This project is a simple and responsive **Login and Signup UI** built using  
**React.js, JavaScript (ES6+), HTML, and CSS**.  
It demonstrates form handling, validation, component-based architecture, and reusable utility functions.

---

## Project Structure

root/
│── node_modules/
│── public/
│ └── index.html
│
│── src/
│ │── app.css # App-level styling
│ │── app.js # Main App component
│ │── index.css # Global styles
│ │── index.js # Application entry point (React DOM render)
│ │
│ ├── components/ # UI components
│ │ ├── Authform.css
│ │ ├── Login.js
│ │ ├── Signup.js
│ │ └── Toast.css
│ │ ├── Toast.js
│ │
│ ├── utils/ # Helper/utility functions
│ ├── validations.js
│ └── (add more utilities here if needed)
│
│── package.json
│── package-lock.json
└── README.md


---

## Technologies Used

- **React.js**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- Utility-based architecture (`utils/` folder)

---

## Features

### Login / Signup Forms
- Email validation
- Strong password validation (uppercase, lowercase, numbers, symbols)
- Confirm password matching
- Real-time validation messages

### User Interface
- Clean and modern design
- Fully responsive
- Centered login card layout
- Popup dialog for success/failure messages

### Utility Functions
- Centralized validation logic stored in `utils/validations.js`
- Reusable functions to keep components clean

---

## Getting Satrted 

### Install Dependencies 

```bash```
-> npm install

### Start development server

```bash```
-> npm start
Automatically opens https://localhost:3000/