# 📚 BookNook — A Small Online Library

**BookNook** is a small online library application where users can discover books, add new books, borrow books for a few days, and return them when finished.

The main idea is simple:

> Add a book. Borrow a book. Return a book.

🔗 **Live Website:** [Visit BookNook](https://book-nook-frontend-khaki.vercel.app/)

## ✨ Features

- 📖 **Browse Books:** Explore all available books in a responsive grid layout.
- 🔍 **Book Details:** View book information, including title, author, category, description, and book owner.
- ➕ **Add Books:** Logged-in users can add new books to the library.
- ✏️ **Update & Delete:** Manage books added by the current user.
- 📚 **My Books:** View and manage books added by the logged-in user.
- 🛒 **My Borrows:** View borrowed books with borrow and return dates.
- 🔄 **Borrow & Return:** Borrow books for a few days and return them when finished.
- 📦 **Available Copies:** Track total and available book copies.
- 🔐 **Authentication:** Register and log in using email and password or Google.
- 👤 **User Profile:** View user information and access profile actions.
- 📱 **Responsive Design:** Works across mobile, tablet, and desktop devices.
- 🔔 **Toast Notifications:** Show success and error messages for user actions.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js App Router | Frontend framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | Reusable UI components |
| BetterAuth | Authentication |
| MongoDB Adapter | Authentication data storage |
| JWT | Protected API requests |
| Sonner | Toast notifications |
| Express.js API | Backend communication |

## 🚀 Getting Started

Follow these steps to run the frontend locally.

### 1. Clone the repository

```bash
git clone https://github.com/pavelsolutions/Book-Nook
```

### 2. Navigate to the project directory

```bash
cd booknook-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000
```

Replace the URL with your deployed backend URL when using the production server.

Add any additional BetterAuth or authentication-related environment variables required by your project.

> Do not commit `.env.local` or expose private credentials in your repository.

### 5. Run the development server

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

## 📖 Main Pages

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| All Books | `/books` | Public |
| Book Details | `/books/:id` | Private |
| Add Book | `/add-book` | Private |
| My Books | `/my-books` | Private |
| My Borrows | `/my-borrows` | Private |
| Login | `/sign-in` | Public |
| Register | `/sign-up` | Public |

Private routes require the user to be logged in. If a user tries to access a private route without authentication, they are redirected to the login page and can return to their desired route after login.

## 🏠 Home Page

The Home page includes:

- A banner slider with at least three slides.
- A “Browse Books” button linking to the All Books page.
- A New Arrivals section showing the latest six books.
- Book cards with image, title, author, category, and a View Details button.
- A “See All Books” button.
- Additional sections such as How Borrowing Works and Top Categories.

## 🔐 Authentication

BookNook uses BetterAuth with the MongoDB Adapter.

Users can:

- Register with name, email, photo URL, and password.
- Log in using email and password.
- Authenticate using Google.
- Access private pages after login.
- Log out from their account.

Password validation requires:

- At least one uppercase letter.
- At least one lowercase letter.
- At least six characters.

## 📚 Book Management

Users can add books with the following information:

- Book title
- Author name
- Category
- Book image
- Short description
- User name and email
- Total copies
- Available copies
- Date added

Users can edit or delete only the books they have added.

## 🔄 Borrowing System

The borrowing system allows users to:

- Borrow a book from its details page.
- Confirm borrowing through a modal.
- View borrowed books in My Borrows.
- See the book image, title, borrow date, and return date.
- Return borrowed books.

The application tracks available copies. When a book is borrowed, its available copies decrease. When returned, the available copies increase.

The system also prevents users from borrowing the same book twice at the same time.

## 🎨 UI Design

BookNook focuses on a clean and modern library experience.

The design includes:

- Consistent heading styles and spacing.
- Responsive layouts for different screen sizes.
- Equal-sized book cards and images.
- Reusable buttons and UI components.
- Clear success and error feedback.
- Consistent Navbar and Footer across pages.

## 📦 Build for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 🌐 Deployment

The frontend can be deployed to a Next.js-compatible hosting platform such as Vercel.

Before deployment:

- Configure the production backend API URL.
- Add all required environment variables.
- Ensure the backend allows requests from the frontend domain.
- Test authentication and protected routes.
- Verify that refreshing a route does not cause an error.
- Test the application on mobile, tablet, and desktop.

## 👨‍💻 Project

**BookNook — A Small Online Library**

A simple online library experience for discovering books, managing a collection, borrowing books, and returning them.

---

⭐ If you like this project, consider giving it a star!
