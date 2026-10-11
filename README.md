# 🛒 BazarDor (বাজার দর)

### বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানার সহজ প্ল্যাটফর্ম

BazarDor is a web application designed to help users explore the prices of daily essential products in Bangladesh. It provides a simple, user-friendly interface for browsing product categories, checking market prices, and accessing personalized profile features.

## 🌐 Live Website

**Live Demo:** https://bazar-dor-bd-app-git-main-bd-d5f3.vercel.app

## 📂 GitHub Repository

**GitHub:** https://github.com/hm-fullstackdeveloper/bazar-dor-bd-app-A7

## ✨ Key Features

1. **Product Categories:** Browse products by category to find essential items easily.
2. **Market Price Information:** View product names, categories, units, and available market prices.
3. **Dynamic Product Pages:** Explore product details through dedicated pages and dynamic routing.
4. **User Authentication:** Sign up, sign in, and manage user sessions securely using Better Auth.
5. **Profile Information Update:** Access the My Profile page and update your name through a dedicated form.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Building the application and user interface |
| App Router | File-based routing and page navigation |
| TypeScript | Type-safe and maintainable code |
| Tailwind CSS | Responsive styling and layout |
| Better Auth | User authentication and profile management |
| MongoDB | Database for authentication-related user data |
| REST API / Fetch API | Retrieving product and category information |
| Vercel | Application deployment and hosting |
| Git & GitHub | Version control and source code management |

## 👤 Profile Information Update

BazarDor includes a profile information update feature that allows authenticated users to update their names.

### How it works

1. The user signs in to their account.
2. The user opens the **My Profile** page.
3. The user clicks the **Update** button.
4. The application navigates to a separate profile update route.
5. The user enters a new name in the Name input field.
6. The user clicks **Update Information**.
7. The application updates the user's name using Better Auth's `authClient.updateUser()` method.
8. The user receives appropriate success or error feedback.

### Implementation Requirements

- Create a dedicated route for updating profile information.
- Use a form with a **Name** input field.
- Provide an **Update Information** button.
- Validate the name before submitting the form.
- Handle loading, success, and error states.
- Use Better Auth's client-side `updateUser()` method.
- Ensure that only the authenticated user can update their own profile.

**Official documentation:**  
https://better-auth.com/docs/concepts/users-accounts#update-user

## 📱 Responsive Design

BazarDor is designed to provide a consistent user experience across desktop, tablet, and mobile devices.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git
- A MongoDB database
- Required environment variables for Better Auth

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/hm-fullstackdeveloper/bazar-dor-bd-app-A7.git
```

**2. Navigate to the project directory**

```bash
cd bazar-dor-bd-app-A7
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and configure the required variables:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_USER_NEXT_URL=your_mongodb_connection_string
```

Replace the placeholder values with your actual configuration. Never commit real secrets, passwords, or database connection strings to GitHub.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit http://localhost:3000 in your browser.

## 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `BETTER_AUTH_SECRET` | Secret key used by Better Auth |
| `BETTER_AUTH_URL` | Base URL of the application |
| `BETTER_AUTH_USER_NEXT_URL` | MongoDB connection string used by the current project configuration |

For production deployment, configure the appropriate environment variables in your hosting provider's settings.

## 📌 Project Goals

- Make essential product price information easier to access.
- Provide clear product category navigation.
- Deliver a responsive and beginner-friendly user experience.
- Support secure authentication and user profile management.
- Maintain readable, reusable, and maintainable code.

## 👨‍💻 Author

**Tariqul Islam Howlader**

GitHub: https://github.com/hm-fullstackdeveloper

---

*BazarDor — সহজে জানুন নিত্যপ্রয়োজনীয় পণ্যের বাজারদর।*
